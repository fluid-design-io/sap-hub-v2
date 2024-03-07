'use server';

import { Tables } from '@/types/database';
import { createClient as createAdminClient } from '@/utils/supabase/admin';
import {
    MetadataService,
    generateAuthenticationOptions,
    generateRegistrationOptions,
    verifyRegistrationResponse,
} from '@simplewebauthn/server';
import { isoBase64URL, isoUint8Array } from '@simplewebauthn/server/helpers';
import { RegistrationResponseJSON } from '@simplewebauthn/types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { createClient } from '../server';
import { origin, rpID, rpName } from './constants';
import { getUserAuthenticators } from './helpers';
import { Authenticator } from './types';

export type PasskeyUser = {
    credential_id: string;
    credential_device_type: 'singleDevice' | 'multiDevice';
    transports: ('usb' | 'ble' | 'nfc' | 'internal' | 'hybrid')[] | null;
    created_at: string | null;
    friendly_name: string | null;
};

export const getUserPasskey = async (): Promise<PasskeyUser[] | null> => {
    const supabase = createClient();
    const userId = (await supabase.auth.getSession()).data.session?.user.id;
    if (!userId) {
        throw new Error('No user');
    }
    const { data, error } = await supabase
        .schema('passkey')
        .from('authenticators')
        .select(
            'credential_id, credential_device_type, transports, created_at, friendly_name',
        )
        .match({ user_id: userId });
    if (error) {
        throw error;
    }
    return data;
};

export const unenroll = async ({ id }: { id: string }) => {
    const supabase = createClient();
    await supabase
        .schema('passkey')
        .from('authenticators')
        .delete()
        .match({
            credential_id: id,
        })
        .throwOnError();
    revalidatePath('/account/authentication');
};

export const updateFriendlyName = async ({
    id,
    friendlyName,
}: {
    id: string;
    friendlyName: string;
}) => {
    const supabase = createClient();
    await supabase
        .schema('passkey')
        .from('authenticators')
        .update({ friendly_name: friendlyName })
        .match({
            credential_id: id,
        })
        .throwOnError();
    revalidatePath('/account/authentication');
};

export const requestRegisterOption = async () => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        throw new Error('No user');
    }
    const userAuthenticators: Authenticator[] = await getUserAuthenticators(
        user.id,
    );
    const options = await generateRegistrationOptions({
        rpName,
        rpID,
        userID: user.id,
        userName: user.email || Math.random().toString(36).substring(7),
        // Don't prompt users for additional information about the authenticator
        // (Recommended for smoother UX)
        attestationType: 'none',
        // Prevent users from re-registering existing authenticators
        excludeCredentials: userAuthenticators.map((authenticator) => ({
            // authenticator.credential_id to buffer
            id: isoBase64URL.toBuffer(authenticator.credential_id, 'base64url'),
            type: 'public-key',
            // Optional
            transports: authenticator?.transports || undefined,
        })),
        // See "Guiding use of authenticators via authenticatorSelection" below
        authenticatorSelection: {
            // Defaults
            residentKey: 'preferred',
            userVerification: 'preferred',
            requireResidentKey: false,
        },
    });
    cookies().set('current_challenge', options.challenge, {
        expires: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        httpOnly: true,
    });
    return options;
};

export const verifyRegistration = async (
    attRest: RegistrationResponseJSON & {
        friendly_name?: string;
    },
) => {
    const supabase = createClient();
    const supabaseAdmin = createAdminClient();
    let passkey: PasskeyUser | null = null;
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        throw new Error('No user');
    }
    // get the challenge from cookies
    const expectedChallenge = cookies().get('current_challenge')?.value;
    if (!expectedChallenge) {
        console.error(`No current challenge found`);
        throw new Error('No current challenge found');
    }
    await MetadataService.initialize({
        verificationMode: 'permissive',
    });
    let verification;
    try {
        verification = await verifyRegistrationResponse({
            response: attRest,
            expectedChallenge,
            expectedOrigin: origin,
            expectedRPID: rpID,
            requireUserVerification: true,
        });
    } catch (error) {
        console.log(`---------------------\n\n`);
        console.error(error);
        throw error;
    }

    console.log(`✨✨✨✨\n\n\n`, verification);
    const { verified } = verification;
    const { registrationInfo } = verification;
    if (!verified || !registrationInfo) {
        throw new Error('Not verified');
    }
    const { data: userDevices } = await supabaseAdmin
        .schema('passkey')
        .from('authenticators')
        .select('*')
        .match({ user_id: user.id });
    const {
        credentialPublicKey,
        credentialID,
        counter,
        credentialDeviceType,
        credentialBackedUp,
    } = registrationInfo;
    const existingDevice = userDevices?.find((device) => {
        return isoUint8Array.areEqual(
            isoBase64URL.toBuffer(device.credential_public_key, 'base64url'),
            credentialID,
        );
    });
    if (!existingDevice) {
        console.log(`---------------------\n\n`);
        console.log(`✅ New Device!`);
        // get the metadata using aaguid
        const { aaguid } = registrationInfo;
        let metadata;
        try {
            metadata = await MetadataService.getStatement(aaguid);
        } catch (error) {
            console.log(`---------------------\n\n`);
            console.error(error);
        }
        const newAuthenticator: Omit<Authenticator, 'created_at'> = {
            credential_public_key:
                Buffer.from(credentialPublicKey).toString('base64url'),
            // encode to base64url
            credential_id: Buffer.from(credentialID).toString('base64url'),
            counter,
            credential_device_type: credentialDeviceType,
            credential_backed_up: credentialBackedUp,
            transports: attRest?.response?.transports,
            user_id: user.id,
            metadata: metadata || null,
            friendly_name: attRest?.friendly_name || null,
        };
        const { data } = await supabaseAdmin
            .schema('passkey')
            .from('authenticators')
            .insert(newAuthenticator)
            .select(
                'created_at, credential_id, credential_device_type, transports, friendly_name',
            )
            .single()
            .throwOnError();
        console.log(`---------------------\n\n`);
        console.log(`✅ Passkey User Created!`, data);
        passkey = data;
    } else {
        console.log(`---------------------\n\n`);
        console.log(`🟠 Existing Device!`);
        throw new Error('Existing Device');
    }

    return { passkey };
};

export const requestAuthOptions = async () => {
    const options = await generateAuthenticationOptions({
        rpID,
        timeout: 60000, // 1 minute
        userVerification: 'preferred',
    });

    // * Set Current Challenge
    cookies().set('current_challenge', options.challenge, {
        expires: new Date(Date.now() + 5 * 60 * 1000),
        httpOnly: true,
    });
    return options;
};

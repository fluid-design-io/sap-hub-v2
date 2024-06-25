'use server'

import { Tables } from '@/types/database'
import { createClient as createAdminClient } from '@/utils/supabase/admin'
import {
  MetadataService,
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from '@simplewebauthn/server'
import { isoBase64URL, isoUint8Array } from '@simplewebauthn/server/helpers'
import { AuthenticationResponseJSON, RegistrationResponseJSON } from '@simplewebauthn/types'
import jwt from 'jsonwebtoken'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

import { createClient } from '../server'
import { origin, rpID, rpName } from './constants'
import { getUserAuthenticator, getUserAuthenticators } from './helpers'
import { Authenticator } from './types'

export type PasskeyUser = {
  credential_id: string
  credential_device_type: 'singleDevice' | 'multiDevice'
  transports: Tables<{ schema: 'passkey' }, 'authenticators'>['transports']
  last_used: string | null
  friendly_name: string | null
}

export const getUserPasskey = async (): Promise<PasskeyUser[] | null> => {
  const supabase = createClient()
  const userId = (await supabase.auth.getSession()).data.session?.user.id
  if (!userId) {
    throw new Error('No user')
  }
  const { data, error } = await supabase
    .schema('passkey')
    .from('authenticators')
    .select('credential_id, credential_device_type, transports, last_used, friendly_name')
    .match({ user_id: userId })
  if (error) {
    throw error
  }
  return data
}

export const unenroll = async ({ id }: { id: string }) => {
  const supabase = createClient()
  await supabase
    .schema('passkey')
    .from('authenticators')
    .delete()
    .match({
      credential_id: id,
    })
    .throwOnError()
  revalidatePath('/account/authentication')
}

export const updateFriendlyName = async ({
  id,
  friendlyName,
}: {
  id: string
  friendlyName: string
}) => {
  const supabase = createClient()
  await supabase
    .schema('passkey')
    .from('authenticators')
    .update({ friendly_name: friendlyName })
    .match({
      credential_id: id,
    })
    .throwOnError()
  revalidatePath('/account/authentication')
}

export const requestRegisterOption = async () => {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('No user')
  }
  const userAuthenticators: Authenticator[] = await getUserAuthenticators(user.id)
  const options = await generateRegistrationOptions({
    rpName,
    rpID,
    userID: user.id as any,
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
    })) as any[],
    // See "Guiding use of authenticators via authenticatorSelection" below
    authenticatorSelection: {
      // Defaults
      residentKey: 'preferred',
      userVerification: 'preferred',
      requireResidentKey: false,
    },
  })
  cookies().set('current_challenge', options.challenge, {
    expires: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    httpOnly: true,
  })
  return options
}

export const verifyRegistration = async (
  attRest: RegistrationResponseJSON & {
    friendly_name?: string
  }
) => {
  const supabase = createClient()
  const supabaseAdmin = createAdminClient()
  let passkey: PasskeyUser | null = null
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('No user')
  }
  // get the challenge from cookies
  const expectedChallenge = cookies().get('current_challenge')?.value
  if (!expectedChallenge) {
    console.error(`No current challenge found`)
    throw new Error('No current challenge found')
  }
  await MetadataService.initialize({
    verificationMode: 'permissive',
  })
  let verification
  try {
    verification = await verifyRegistrationResponse({
      response: attRest,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      requireUserVerification: true,
    })
  } catch (error) {
    console.log(`---------------------\n\n`)
    console.error(error)
    throw error
  }

  console.log(`✨✨✨✨\n\n\n`, verification)
  const { verified } = verification
  const { registrationInfo } = verification
  if (!verified || !registrationInfo) {
    throw new Error('Not verified')
  }
  const { data: userDevices } = await supabaseAdmin
    .schema('passkey')
    .from('authenticators')
    .select('*')
    .match({ user_id: user.id })
  const { credentialPublicKey, credentialID, counter, credentialDeviceType, credentialBackedUp } =
    registrationInfo
  const existingDevice = userDevices?.find((device: any) => {
    return isoUint8Array.areEqual(
      isoBase64URL.toBuffer(device.credential_public_key, 'base64url'),
      credentialID as any
    )
  })
  if (!existingDevice) {
    console.log(`---------------------\n\n`)
    console.log(`✅ New Device!`)
    // get the metadata using aaguid
    const { aaguid } = registrationInfo
    let metadata
    try {
      metadata = await MetadataService.getStatement(aaguid)
    } catch (error) {
      console.log(`---------------------\n\n`)
      console.error(error)
    }
    const newAuthenticator: Omit<Authenticator, 'last_used' | 'created_at'> = {
      credential_public_key: Buffer.from(credentialPublicKey).toString('base64url'),
      // encode to base64url
      credential_id: Buffer.from(credentialID).toString('base64url'),
      counter,
      credential_device_type: credentialDeviceType,
      credential_backed_up: credentialBackedUp,
      transports: attRest?.response?.transports || [],
      user_id: user.id,
      metadata: metadata || null,
      friendly_name: attRest?.friendly_name || null,
    }
    const { data } = await supabaseAdmin
      .schema('passkey')
      .from('authenticators')
      .insert(newAuthenticator)
      .select('last_used, credential_id, credential_device_type, transports, friendly_name')
      .single()
      .throwOnError()
    console.log(`---------------------\n\n`)
    console.log(`✅ Passkey User Created!`, data)
    passkey = data
  } else {
    console.log(`---------------------\n\n`)
    console.log(`🟠 Existing Device!`)
    throw new Error('Existing Device')
  }

  return { passkey }
}

/* Login Functions */

export const requestAuthOptions = async () => {
  const options = await generateAuthenticationOptions({
    rpID,
    timeout: 60000, // 1 minute
    userVerification: 'preferred',
  })

  // * Set Current Challenge
  cookies().set('current_challenge', options.challenge, {
    expires: new Date(Date.now() + 5 * 60 * 1000),
    httpOnly: true,
  })
  return options
}

export const verifyAuthentication = async (asseResp: AuthenticationResponseJSON) => {
  const current_challenge = cookies().get('current_challenge')?.value
  if (!current_challenge) {
    console.error(`No current challenge found`)
    throw new Error('No current challenge found')
  }
  const supabase = createClient()
  const supabaseAdmin = createAdminClient()

  const { data: userIdData } = await supabaseAdmin
    .schema('passkey')
    .from('authenticators')
    .select('user_id')
    .match({
      credential_id: asseResp.rawId,
    })
    .maybeSingle()
    .throwOnError()

  if (!userIdData?.user_id) {
    console.error(`No user id found`)
    throw new Error('No user id found')
  }
  // get the user profile
  const { data: userData } = await supabase
    .from('users')
    .select('id, username, email')
    .match({ id: userIdData.user_id })
    .single()
    .throwOnError()
  if (!userData?.email || !userData?.id) {
    console.error(`No email or id found`)
    throw new Error('No email or id found')
  }
  const { id, email } = userData

  const expectedChallenge = current_challenge
  const authenticator = await getUserAuthenticator(id, asseResp.id)
  if (!authenticator) {
    console.log(`🔵 Authenticator not found`)
    throw new Error('Authenticator not found')
  }
  console.log(`✨✨✨✨`, {
    expectedChallenge,
    authenticator: {
      counter: authenticator.counter,
      credentialID: isoBase64URL.toBuffer(authenticator.credential_id, 'base64url'),
      credentialPublicKey: isoBase64URL.toBuffer(authenticator.credential_public_key, 'base64url'),
      transports: authenticator.transports || undefined,
    },
  })
  let verification
  try {
    verification = await verifyAuthenticationResponse({
      response: asseResp,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      authenticator: {
        counter: authenticator.counter,
        credentialID: isoBase64URL.toBuffer(authenticator.credential_id, 'base64url') as any,
        credentialPublicKey: isoBase64URL.toBuffer(
          authenticator.credential_public_key,
          'base64url'
        ) as any,
        transports: authenticator.transports || undefined,
      },
      requireUserVerification: true,
    })
  } catch (error) {
    console.log(`---------------------\n\n`)
    console.error(error)
    throw error
  }
  const { verified } = verification
  const { authenticationInfo } = verification
  const { newCounter } = authenticationInfo

  if (!verified || !authenticationInfo) {
    console.error(`Not verified`)
    throw new Error('Not verified')
  }
  const { error: insertAuthenticatorError } = await supabaseAdmin
    .schema('passkey')
    .from('authenticators')
    .update({
      counter: newCounter,
    })
    .match({ user_id: authenticator.user_id })

  if (insertAuthenticatorError) {
    console.log(`---------------------\n\n`)
    console.error(insertAuthenticatorError)
    throw insertAuthenticatorError
  }
  // clear the current challenge
  cookies().set('current_challenge', '', {
    expires: new Date(0),
    httpOnly: true,
  })

  //* Create JWT Token and set the session
  const token = jwt.sign(
    {
      sub: id,
      email: email,
      iat: Math.floor(Date.now() / 1000),
      role: 'authenticated',
      aud: 'authenticated',
      app_metadata: {
        provider: 'passkey',
      },
    },
    process.env.SUPABASE_JWT_SECRET!,
    {
      expiresIn: '1d',
    }
  )
  await supabase.auth.setSession({
    access_token: token,
    refresh_token: token,
  })

  //* Update passkey record with last_used
  await supabaseAdmin
    .schema('passkey')
    .from('authenticators')
    .update({
      last_used: new Date().toISOString(),
    })
    .match({ credential_id: authenticator.credential_id })
    .throwOnError()

  return { verified }
}

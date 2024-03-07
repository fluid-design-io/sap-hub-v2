'use client';

import PawskeyIcon from '@/components/icon/pawskey';
import Modal from '@/components/site/modal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    PasskeyUser,
    requestRegisterOption,
    verifyRegistration,
} from '@/utils/supabase/auth/passkey';
import { startRegistration } from '@simplewebauthn/browser';
import { Fragment, useState } from 'react';
import { toast } from 'sonner';

import { UpdatePasskeyForm } from './edit-passkey';

function RegisterPasskey() {
    const [open, setOpen] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [passkey, setPasskey] = useState<PasskeyUser | null>(null);
    const handleRegistration = async () => {
        setIsRegistering(true);
        const data = await requestRegisterOption();
        try {
            // Pass the options to the authenticator and wait for a response
            const attResp = await startRegistration(data);
            const res = await verifyRegistration({
                ...attResp,
                friendly_name: 'Passkey',
            });
            setPasskey(res.passkey);
            setIsRegistered(true);
        } catch (error: any) {
            // Some basic error handling
            if (error.name === 'InvalidStateError') {
                toast.error('Authenticator might already be registered.');
            } else {
                toast.error(error?.message || 'Something went wrong.');
            }
            return;
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <div>
            <Button onClick={() => setOpen(true)}>
                <PawskeyIcon className="mr-2 size-4" />
                Add new Passkey
            </Button>
            <Modal
                title={
                    isRegistered ? 'Add a Firendly name' : 'Register Passkey'
                }
                description={
                    isRegistered
                        ? 'Give your Passkey a friendly name so you can recognize it later.'
                        : 'Passkeys are a simple and secure way to authenticate using biometrics, a hardware key, or PIN.'
                }
                open={open}
                onOpenChange={setOpen}
            >
                {isRegistered ? (
                    <Fragment>
                        {passkey && (
                            <UpdatePasskeyForm
                                passkey={passkey}
                                onOpenChange={setOpen}
                            />
                        )}
                    </Fragment>
                ) : (
                    <Fragment>
                        <div className="my-8 flex items-center justify-center">
                            <div
                                className={cn(
                                    'rounded-md border-white/10 bg-secondary p-4 shadow ring ring-white/25 ring-offset-8 ring-offset-background',
                                    isRegistering && 'animate-pulse',
                                )}
                            >
                                <PawskeyIcon className="size-12 text-foreground/80" />
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between px-6">
                            <Button
                                variant="secondary"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleRegistration}>Next</Button>
                        </div>
                    </Fragment>
                )}
            </Modal>
        </div>
    );
}

export default RegisterPasskey;

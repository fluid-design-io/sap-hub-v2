'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
    requestAuthOptions,
    verifyAuthentication,
} from '@/utils/supabase/auth/passkey';
import {
    platformAuthenticatorIsAvailable,
    startAuthentication,
} from '@simplewebauthn/browser';
import { Loader2Icon, LockIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'sonner';

function SignInWithWebAuthn() {
    const [error, setError] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const handleAuthentication = async () => {
        setLoading(true);
        setError('');
        const options = await requestAuthOptions();
        let asseResp;
        try {
            // Pass the options to the authenticator and wait for a response
            asseResp = await startAuthentication(options);
            console.log('asseResp', asseResp);
        } catch (error: any) {
            console.error(error);
            setLoading(false);
            setError(
                'Error authenticating with your device, please check if you have registered it.',
            );
            return;
        }
        console.log('asseResp', asseResp);
        try {
            try {
                await verifyAuthentication(asseResp);
            } catch (error: any) {
                toast.error('Error authenticating with your device', {
                    description: error?.message,
                });
                return;
            }
            router.refresh();
        } catch (error) {
            console.error(error);
            setLoading(false);
            setError(
                'Error authenticating with your device, please check if you have registered it.',
            );
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            return;
        }
        platformAuthenticatorIsAvailable().then((isAvailable) => {
            setIsAvailable(isAvailable);
        });
    }, [mounted]);
    return (
        <Fragment>
            {isAvailable ? (
                <Button
                    className="flex items-center gap-2"
                    onClick={handleAuthentication}
                >
                    {loading ? (
                        <Loader2Icon className="size-4 animate-spin" />
                    ) : (
                        <LockIcon className="size-4" />
                    )}
                    Login with Passkey
                </Button>
            ) : (
                <Skeleton className="h-12" />
            )}
        </Fragment>
    );
}

export default SignInWithWebAuthn;

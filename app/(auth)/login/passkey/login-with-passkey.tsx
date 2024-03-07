'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
    platformAuthenticatorIsAvailable,
    startAuthentication,
} from '@simplewebauthn/browser';
import { CheckCircle2, LoaderIcon, LockIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';

function SignInWithWebAuthn() {
    const [error, setError] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const handleAuthentication = async () => {
        setLoading(true);
        setError('');
        const data = await fetch(
            `/api/v1/passkey/generate-authentication-options`,
            {
                method: 'GET',
            },
        ).then((res) => res.json());
        if (!data) {
            console.error('no data');
            return;
        }
        console.log('Authentication Options', JSON.stringify(data, null, 2));
        let asseResp;
        try {
            // Pass the options to the authenticator and wait for a response
            asseResp = await startAuthentication(data);
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
        const verificationResp = await fetch(
            '/api/v1/passkey/verify-authentication',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(asseResp),
            },
        );
        const verificationJSON = await verificationResp.json();
        if (
            verificationJSON &&
            verificationJSON.verified &&
            verificationJSON.magicLink
        ) {
            console.log('verificationJSON', verificationJSON);
            router.push(verificationJSON.magicLink);
        } else {
            alert(`Authentication failed: ${JSON.stringify(verificationJSON)}`);
        }
        setLoading(false);
        setSuccess(true);
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
                    <LockIcon className="size-4" />
                    Login with Passkey
                </Button>
            ) : (
                <Skeleton className="h-12" />
            )}
        </Fragment>
    );
}

export default SignInWithWebAuthn;

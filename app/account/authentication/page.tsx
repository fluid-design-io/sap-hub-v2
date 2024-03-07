import { Card, CardContent } from '@/components/ui/card';
import Container from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';
import React, { Suspense } from 'react';

import PasskeyList from './passkey-list';
import RegisterPasskey from './register-passkey';

function AuthenticationPage() {
    return (
        <Container className="mx-auto max-w-4xl">
            <Card className="w-full">
                <CardContent>
                    <RegisterPasskey />
                </CardContent>
            </Card>
            <Card className="w-full">
                <CardContent>
                    <Suspense fallback={<Skeleton className="h-24" />}>
                        <PasskeyList />
                    </Suspense>
                </CardContent>
            </Card>
        </Container>
    );
}

export default AuthenticationPage;

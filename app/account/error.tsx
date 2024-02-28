'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Container from '@/components/ui/container';
import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);
    return (
        <Container>
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Oops...</AlertTitle>
                <AlertDescription>
                    Something went wrong. Please try again later.
                </AlertDescription>
            </Alert>
        </Container>
    );
}

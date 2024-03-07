import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Container from '@/components/ui/container';
import { cn } from '@/lib/utils';
import { ChevronLeft, MailIcon } from 'lucide-react';
import Link from 'next/link';

import LoginWithPasskey from './passkey/login-with-passkey';

export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    return (
        <Container>
            <Card className="relative my-12 w-full max-w-sm">
                <Link
                    href="/"
                    className={cn(
                        'group',
                        'size-8 rotate-[-4.5deg] rounded-md border-2 border-black bg-white text-black',
                        'absolute -left-3.5 -top-3.5 flex items-center justify-center',
                    )}
                >
                    <ChevronLeft className="size-5 transition-transform group-hover:-translate-x-1" />
                    <span className="sr-only">Back</span>
                </Link>
                <CardHeader className="text-card-foreground">Login</CardHeader>
                <CardContent>
                    <div className="flex w-full flex-1 flex-col justify-center gap-2 text-card-foreground animate-in">
                        <LoginWithPasskey />
                        <Button asChild>
                            <Link
                                href="/login/email"
                                className="flex items-center gap-2"
                            >
                                <MailIcon className="size-4" />
                                Continue with Email
                            </Link>
                        </Button>
                        <Button
                            variant="link"
                            className="text-card-foreground"
                            asChild
                        >
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
}

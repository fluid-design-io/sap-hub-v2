import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Container from '@/components/ui/container';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import { signIn } from '../../actions';

export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    return (
        <Container>
            <Card className="relative my-12 w-full max-w-sm">
                <Link
                    href="/login"
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
                    <form
                        className="flex w-full flex-1 flex-col justify-center gap-2 text-card-foreground animate-in"
                        action={signIn}
                    >
                        <label className="text-md" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="mb-6 rounded-md border bg-inherit px-4 py-2"
                            name="email"
                            placeholder="you@example.com"
                            type="email"
                            autoComplete="email"
                            required
                        />
                        <label className="text-md" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="mb-6 rounded-md border bg-inherit px-4 py-2"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            autoComplete="current-password"
                            required
                        />
                        <Button>Login</Button>
                        <Button
                            variant="link"
                            className="text-card-foreground"
                            asChild
                        >
                            <Link href="/login">
                                &larr; Other login options
                            </Link>
                        </Button>
                        {searchParams?.message && (
                            <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
                                {searchParams.message}
                            </p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}

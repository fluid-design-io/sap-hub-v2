import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Container from '@/components/ui/container';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import { signUp } from '../actions';

export default function SignUp({
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
                <CardHeader className="text-card-foreground">
                    Sign Up
                </CardHeader>
                <CardContent>
                    <form
                        className="flex w-full flex-1 flex-col justify-center gap-2 text-card-foreground animate-in"
                        action={signUp}
                    >
                        <label className="text-md" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="mb-6 rounded-md border bg-inherit px-4 py-2"
                            name="name"
                            placeholder="John"
                            type="text"
                            autoComplete="name"
                        />
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
                            autoComplete="new-password"
                            required
                        />

                        <Button variant="active">Sign Up</Button>
                        <Button
                            variant="link"
                            className="text-card-foreground"
                            asChild
                        >
                            <Link href="/login">Login</Link>
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

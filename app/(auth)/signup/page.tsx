import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Container from '@/components/ui/container';
import Link from 'next/link';

import { signUp } from '../actions';

export default function SignUp({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    return (
        <Container>
            <Link
                href="/"
                className="bg-btn-background hover:bg-btn-background-hover group absolute left-8 top-8 flex items-center rounded-md px-4 py-2 text-sm text-foreground no-underline"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>{' '}
                Back
            </Link>

            <Card className="my-12 w-full max-w-sm">
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
                        />
                        <label className="text-md" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="mb-6 rounded-md border bg-inherit px-4 py-2"
                            name="email"
                            placeholder="you@example.com"
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

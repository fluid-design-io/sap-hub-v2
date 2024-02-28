import { cn } from '@/lib/utils';
import { getSession } from '@/utils/supabase/server';
import Link from 'next/link';
import React from 'react';

async function AuthButton({ className }: { className?: string }) {
    const user = await getSession();

    if (user) {
        return (
            <Link
                href="/account"
                className={cn(
                    'text-sm font-semibold leading-6 text-[hsl(var(--header-foreground))]',
                    className,
                )}
            >
                Account
            </Link>
        );
    }
    return (
        <Link
            href="/login"
            className={cn(
                'text-sm font-semibold leading-6 text-[hsl(var(--header-foreground))]',
                className,
            )}
        >
            Log in <span aria-hidden="true">&rarr;</span>
        </Link>
    );
}

export default AuthButton;

import PackList from '@/components/site/pack/pack-list';
import { PageHeader } from '@/components/site/page-header';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import withUser from '@/hooks/with-user/server';
import { cn } from '@/lib/utils';
import { User } from '@/types/types';
import Link from 'next/link';

import { signOut } from '../(auth)/actions';

function AccountPage({ user }: { user: User }) {
    return (
        <Container className="max-w-full overflow-x-auto">
            <PageHeader title="Account" />
            <form action={signOut}>
                <Button
                    className={cn(
                        'text-sm font-semibold leading-6 text-[hsl(var(--header-foreground))]',
                    )}
                    type="submit"
                >
                    Sign out
                </Button>
            </form>
            <Button asChild>
                <Link href="/account/authentication">Authentications</Link>
            </Button>
            <PackList userId={user.id} />
        </Container>
    );
}

export default withUser(AccountPage);

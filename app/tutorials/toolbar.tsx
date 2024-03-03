import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import withUser from '@/hooks/with-user/server';
import { User } from '@/types/types';
import Link from 'next/link';
import React from 'react';

import CreateTutorialButton from './create-tutorial-button';

async function Toobar({ user }: { user: User }) {
    if (!user) return null;
    return (
        <Container className="mx-auto mb-8 max-w-4xl flex-row justify-between">
            <div>
                <Button asChild>
                    <Link href="/tutorials/manage">My Tutorials</Link>
                </Button>
            </div>
            <div>
                <CreateTutorialButton />
            </div>
        </Container>
    );
}

export default withUser(Toobar);

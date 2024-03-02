import { Button } from '@/components/ui/button';
import withUser from '@/hooks/with-user/server';
import { User } from '@/types/types';
import Link from 'next/link';
import React from 'react';

import CreateTutorialButton from './create-tutorial-button';

async function Toobar({ user }: { user: User }) {
    if (!user) return null;
    return (
        <div className="mx-auto mb-8 flex max-w-4xl justify-between">
            <div>
                <Button asChild>
                    <Link href="/tutorials/manage">My Tutorials</Link>
                </Button>
            </div>
            <div>
                <CreateTutorialButton />
            </div>
        </div>
    );
}

export default withUser(Toobar);

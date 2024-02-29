import { PageHeader } from '@/components/site/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

function NotFoundPage() {
    return (
        <div className="flex h-[100svh] flex-col items-center">
            <PageHeader title="404" subtitle="Toy not found" />
            <Button asChild className="mx-auto mt-12">
                <Link href="/">Go Home</Link>
            </Button>
        </div>
    );
}

export default NotFoundPage;

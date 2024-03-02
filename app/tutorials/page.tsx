import { PageHeader } from '@/components/site/page-header';
import Container from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';
import React, { Suspense } from 'react';

import Toolbar from './toolbar';
import TutorialsList from './tutorial-list';

function TutorialsPage() {
    return (
        <div>
            <PageHeader title="Tutorials" subtitle="Learn how to play" />
            <Suspense fallback={null}>
                <Toolbar />
            </Suspense>
            <Container className="min-h-screen max-w-4xl">
                <Suspense fallback={<Loading />}>
                    <TutorialsList />
                </Suspense>
            </Container>
        </div>
    );
}

export default TutorialsPage;

const Loading = () => {
    return (
        <div className="flex flex-col gap-6">
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-36 w-full" />
        </div>
    );
};

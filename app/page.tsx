// import FilterBar from '@/app/(public)/filter-bar';
// import SpotlightCarousel from '@/app/(public)/spotlight-carousel';
import PackList from '@/components/site/pack/pack-list';
import { PageHeader } from '@/components/site/page-header';
import Container from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';
import { packFilters } from '@/lib/filters';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import FilterBar from './filter-bar';
import SpotlightCarousel from './spotlight-carousel';

const CreatePack = dynamic(() => import('@/components/site/pack/pack-editor'), {
    loading: () => <Loading />,
});

export default async function Index({
    searchParams,
}: {
    searchParams?: { page?: string; filter?: string };
}) {
    return (
        <Container className="max-w-full overflow-x-hidden">
            <PageHeader title="SAP Hub" subtitle="Share. Learn. Advance." />
            <SpotlightCarousel />
            <div className="-mx-6 flex max-w-[min(50rem,calc(100%+3rem))] items-center justify-between gap-6 overflow-hidden">
                <Suspense fallback={<Loading />}>
                    <FilterBar filters={packFilters} />
                </Suspense>
                <CreatePack />
            </div>
            <Suspense fallback={<Loading />}>
                <PackList searchParams={searchParams} />
            </Suspense>
        </Container>
    );
}

const Loading = () => (
    <Skeleton className="h-[100px] w-full max-w-3xl rounded-lg bg-foreground/5" />
);

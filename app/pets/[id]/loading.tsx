import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex w-full max-w-4xl flex-col items-center gap-6 lg:-mt-4">
            {/* <Skeleton className="my-4 h-10 w-32" /> */}
            <Skeleton className="aspect-[4/2.5] w-full max-w-lg" />
            <Skeleton className="mx-auto h-12 w-32" />
            <div className="w-full max-w-2xl flex-1 px-6">
                <Skeleton className="h-64 w-full lg:h-48" />
            </div>
        </div>
    );
}

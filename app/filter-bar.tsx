'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { createQueryFilter } from '@/lib/search-params';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

function FilterBar({
    filters,
}: {
    filters: { name: string; value: string }[];
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    // serach can be a string, string with ',' or undefined
    const search = searchParams.get('filter');
    const searchArray = search ? search.split(',') : [];
    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const handleFilterClick = useCallback(
        (name: string, value: string) => {
            let href = createQueryFilter(
                searchParams,
                name,
                value,
                value === 'all',
            );
            router.push(pathname + '?' + href, {
                scroll: false,
            });
        },
        [searchParams],
    );
    return (
        <ScrollArea className="relative max-w-[calc(100%-7.5rem)] whitespace-nowrap [mask-image:linear-gradient(to_right,transparent_0,black_2rem,black_calc(100%-2rem),transparent)]">
            <div className="flex justify-center space-x-4 p-6">
                {filters.map((filter) => (
                    <Button
                        key={filter.value}
                        className="flex-shrink-0"
                        variant={
                            filter.value ===
                            searchArray.find((s) => s === filter.value)
                                ? 'active'
                                : 'default'
                        }
                        asChild
                    >
                        <Button
                            onClick={() =>
                                handleFilterClick('filter', filter.value)
                            }
                        >
                            {filter.name}
                        </Button>
                    </Button>
                ))}
            </div>
            <ScrollBar orientation="horizontal" className="opacity-0" />
        </ScrollArea>
    );
}

export default FilterBar;

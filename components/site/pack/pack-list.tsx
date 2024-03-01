import { PER_PAGE } from '@/lib/constants';
import { fetchPacks } from '@/utils/supabase/pack/fetch-packs';
import { Fragment } from 'react';

import SitePagination from '../pagination';
import { PackListItem } from './pack-list-item';

type PackListProps = {
    searchParams?: {
        page?: string;
        filter?: string;
    };
    userId?: string;
};

async function PackList({ searchParams, userId }: PackListProps) {
    const { data, total } = await fetchPacks(searchParams, userId);
    const totalPages = Math.ceil(total / PER_PAGE);
    const currentPage = Math.min(Number(searchParams?.page) || 1, totalPages);
    if (data?.length === 0 || !data) {
        return <div>No packs found</div>;
    }
    return (
        <Fragment>
            <ul className="relative z-[1] flex w-full max-w-3xl flex-col gap-8">
                {data.map((pack) => (
                    <PackListItem key={pack.id} pack={pack} />
                ))}
            </ul>
            <SitePagination
                currentPage={currentPage}
                totalPages={totalPages}
                searchParams={{
                    filter: searchParams?.filter || '',
                }}
            />
        </Fragment>
    );
}

export default PackList;

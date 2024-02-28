import { PER_PAGE } from '@/lib/constants';
import { fetchPacks } from '@/utils/supabase/pack/fetch-packs';

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
    if (data?.length === 0 || !data) {
        return <div>No packs found</div>;
    }
    return (
        <ul className="relative z-[1] flex w-full max-w-3xl flex-col gap-8">
            {data.map((pack) => (
                <PackListItem key={pack.id} pack={pack} />
            ))}
        </ul>
    );
}

export default PackList;

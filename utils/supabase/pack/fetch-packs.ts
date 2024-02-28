'use server';

import { PER_PAGE } from '@/lib/constants';

import { createClient } from '../server';

export const fetchPacks = async (searchParams: any, userId?: string | null) => {
    const currentPage = Number(searchParams?.page) || 1;
    const supabase = createClient();
    const filter = searchParams?.filter;
    const filterArr = filter
        ? filter
              //!TODO: Fix this
              // remove leading comma
              .replace(/^,/, '')
              .split(',')
        : [];
    //* Enums are capitalized
    const filterArrCap = filterArr.map(
        (f: string) => f?.[0]?.toUpperCase() + f?.slice(1),
    );
    const match: Record<string, any> = userId ? { user_id: userId } : {};
    if (filterArr.length) {
        const { data, count } = await supabase
            .from('packs')
            .select('*', {
                count: 'estimated',
            })
            .match(match)
            .contains('archetype', filterArrCap)
            .order('created_at', { ascending: false })
            .limit(PER_PAGE)
            .range((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE - 1)
            .throwOnError();
        const total = count || 0;
        return { data, total };
    } else {
        const { data, count } = await supabase
            .from('packs')
            .select('*', {
                count: 'estimated',
            })
            .match(match)
            .order('created_at', { ascending: false })
            .limit(PER_PAGE)
            .range((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE - 1)
            .throwOnError();
        const total = count || 0;
        return { data, total };
    }
};

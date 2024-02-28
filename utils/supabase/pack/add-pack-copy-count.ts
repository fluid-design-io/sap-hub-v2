'use server';

import { createClient } from '../server';

export const addPackCopyCount = async (packId: string) => {
    const supabase = createClient();
    await supabase
        .rpc('increment_pack_count', { amount: 1, row_id: packId })
        .throwOnError();
};

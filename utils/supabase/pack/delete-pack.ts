'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '../server';

export const deletePack = async (packId: string) => {
    const supabase = createClient();
    await supabase.from('packs').delete().eq('id', packId).throwOnError();
    revalidatePath('/', 'layout');
};

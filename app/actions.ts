'use server';

import { PackEditorForm } from '@/components/site/pack/editor-form';
import { Tables } from '@/types/database';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export const checkDuplicatePack = async (packCode: string) => {
    const supabase = createClient();
    const packJson = JSON.parse(packCode);
    // check if the exact pack already exists
    const { data, count, error } = await supabase
        .from('packs')
        .select('*', {
            head: false,
            count: 'exact',
        })
        .eq('code -> Minions', JSON.stringify(packJson.Minions))
        .eq('code -> Spells', JSON.stringify(packJson.Spells));
    if (count && count >= 1) {
        return true;
    }
    return false;
};

export const upsertPack = async (pack: PackEditorForm & { id?: string }) => {
    const supabase = createClient();
    const packJson = JSON.parse(pack.packCode);
    const minion = packJson.Minion;
    if (!minion) throw new Error('Invalid pack code');
    console.log(`upserting pack ${pack.id || 'new'}`);
    await supabase
        .from('packs')
        .upsert(
            {
                id: pack.id,
                title: pack.title,
                description: pack.packDescription,
                archetype: pack.archetype as Tables<'packs'>['archetype'],
                code: packJson,
                minion: minion,
            },
            {
                onConflict: 'id',
            },
        )
        .throwOnError();
    revalidatePath('/packs');
};

'use server';

import { removeFolder } from '@/utils/supabase/actions';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export const save = async (data: any) => {
    const supabase = createClient();
    const { error } = await supabase
        .from('tutorials')
        .update(data)
        .match({ id: data.id });
    if (error) throw error;
    revalidatePath('/tutorials/manage', 'page');
};

export const deleteTutorial = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from('tutorials').delete().match({ id });
    if (error) {
        console.error('Error deleting tutorial', error);
        throw error;
    }
    // delete folder in storage
    await removeFolder('tutorials', id);
    revalidatePath('/tutorials/manage');
};

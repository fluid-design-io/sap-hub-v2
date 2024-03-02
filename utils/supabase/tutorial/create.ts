'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '../server';

export type CreateTutorialProps = {
    slug: string;
    title: string;
};

export const createTutorial = async ({ slug, title }: CreateTutorialProps) => {
    const supabase = createClient();
    const { data } = await supabase
        .from('tutorials')
        .insert({ slug, title })
        .select('slug')
        .single()
        .throwOnError();
    if (!data) throw new Error('Failed to create tutorial');
    revalidatePath('/tutorials', 'layout');
};

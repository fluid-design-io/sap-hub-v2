'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    revalidatePath('/', 'layout');
    redirect('/');
};

export const signIn = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return redirect(`/login?message=${error.message}`);
    }

    revalidatePath('/', 'layout');
    redirect('/');
};

export const signUp = async (formData: FormData) => {
    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
            data: { full_name: formData.get('name') },
        },
    });

    if (error) {
        console.log(`🔴 Could not authenticate user:`, error.message); // 👈 `error.message
        return redirect('/signup?message=Could not authenticate user');
    }

    revalidatePath('/', 'layout');
    redirect('/account');
};

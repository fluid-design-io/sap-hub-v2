import { Database } from '@/types/database';
import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const createClient = () => {
    const cookieStore = cookies();
    const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value, ...options });
                    } catch (error) {
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value: '', ...options });
                    } catch (error) {
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        },
    );

    return supabase;
};
// React Cache: https://react.dev/reference/react/cache
// Caches the session retrieval operation. This helps in minimizing redundant calls
// across server components for the same session data.
export const getSession = cache(async () => {
    const supabase = createClient();
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (!session) return null;
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        return user;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
});

export const getUserDetails = cache(async () => {
    const supabase = createClient();
    const {
        data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
        return { user: null };
    }
    const userId = session.user.id;
    try {
        const { data: userDetails } = await supabase
            .from('users')
            .select('*')
            .match({ id: userId })
            .single();
        return { user: userDetails };
    } catch (error) {
        console.error('🟠 Error:', error);
        return { user: null };
    }
});

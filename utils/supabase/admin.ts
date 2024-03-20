import { Database } from '@/types/database';
import {
    CookieMethods,
    CookieOptionsWithName,
    createBrowserClient,
} from '@supabase/ssr';
import { SupabaseClientOptions } from '@supabase/supabase-js';

export const createClient = (
    options?: SupabaseClientOptions<'public'> & {
        cookies: CookieMethods;
        cookieOptions?: CookieOptionsWithName;
        isSingleton?: boolean;
    },
) =>
    createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        options,
    );

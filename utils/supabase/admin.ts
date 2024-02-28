import { Database } from '@/types/database';
import { createBrowserClient } from '@supabase/ssr';

export const createClient = () =>
    createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

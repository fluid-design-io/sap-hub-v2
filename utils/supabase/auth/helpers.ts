import { createClient as createAdminClient } from '@/utils/supabase/admin';

export const getUserAuthenticators = async (user_id: any) => {
    const supabase = createAdminClient();
    const { data, error } = await supabase
        .schema('passkey')
        .from('authenticators')
        .select('*')
        .match({ user_id });
    if (error) {
        console.error(error);
        return [];
    }
    return data;
};

export const getUserAuthenticator = async (
    user_id: string,
    credential_id: string,
) => {
    console.log(`🔵 getUserAuthenticator`, { user_id, credential_id });
    const supabase = createAdminClient();
    const { data, error } = await supabase
        .schema('passkey')
        .from('authenticators')
        .select('*')
        .match({ user_id, credential_id })
        .maybeSingle();
    if (error) {
        console.error(error);
        return null;
    }
    return data;
};

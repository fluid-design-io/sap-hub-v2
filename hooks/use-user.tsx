'use client';

import { Tables } from '@/types/database';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

const useUser = () => {
    const [user, setUser] = useState<Tables<'users'> | null | undefined>(
        undefined,
    );
    const getUserDetails = async () => {
        const supabase = createClient();
        const {
            data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
            setUser(null);
            return;
        }
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
            setUser(null);
            return;
        }
        const userId = user.id;
        try {
            const { data: userDetails } = await supabase
                .from('users')
                .select('*')
                .match({ id: userId })
                .single();
            setUser(userDetails);
        } catch (error) {
            console.error('🟠 Error:', error);
        }
    };
    useEffect(() => {
        getUserDetails();
    }, []);
    return { user };
};

export default useUser;

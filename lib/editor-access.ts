import { User } from '@supabase/supabase-js';

export const hasEditorAccess = (user: User | null) => {
    if (!user) return false;
    // either email is my email or end with @teamwoodgames.com
    const email = user.email || '';
    if (email === process.env.MY_EMAIL) return true;
    return email.endsWith('@teamwoodgames.com');
};

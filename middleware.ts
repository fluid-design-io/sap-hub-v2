import { updateSession } from '@/utils/supabase/middleware';
import { NextRequest } from 'next/server';


export async function middleware(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
    matcher: [
        {
            source: '/((?!api|_next/static|public|data|_next/image|images|og|fonts|assets|favicon.ico|sw.js).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
};

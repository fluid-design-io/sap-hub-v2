import { createClient } from '@/utils/supabase/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { hasEditorAccess } from './lib/editor-access';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const { supabase, response } = createClient(request);

    const {
        data: { user },
    } = await supabase.auth.getUser();
    // redirect to home if user doesn't have editor access
    if (pathname.startsWith('/editor')) {
        if (!hasEditorAccess(user)) {
            return NextResponse.redirect(new URL(`/`, request.url));
        }
    }
    // redirect signup or login if user exists
    if (user && ['/signup', '/login'].includes(pathname)) {
        return NextResponse.redirect(new URL(`/`, request.url));
    }
    return response;
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

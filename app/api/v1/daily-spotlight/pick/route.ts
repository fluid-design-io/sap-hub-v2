import { createClient } from '@/utils/supabase/server';

export async function GET(req: Request) {
    if (
        process.env.NODE_ENV !== 'development' &&
        req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`
    ) {
        return Response.json({
            success: false,
            message: 'Unauthorized',
        });
    }
    const supabase = createClient();
    await supabase.rpc('gen_spotlight_items').select().throwOnError();
    return Response.json({
        success: true,
    });
}

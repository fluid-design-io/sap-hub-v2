import { PageHeader } from '@/components/site/page-header';
import Container from '@/components/ui/container';
import { getUrl } from '@/lib/get-item-public-url';
import { createClient } from '@/utils/supabase/client';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import Detail from '../detail';

export default async function PetPage({
    params: { id },
}: {
    params: { id: string };
}) {
    const supabase = createClient();
    const { data } = await supabase
        .from('food')
        .select('*')
        .match({ id })
        .maybeSingle();
    if (!data) return notFound();
    return (
        <Container as={'main'}>
            <PageHeader title={data.name} subtitle="" />
            <Detail data={data} imageClassName="rounded-lg -mt-4" />
        </Container>
    );
}

export async function generateStaticParams() {
    const supabase = createClient();
    const { data: pets } = await supabase.from('food').select('id');
    if (!pets) return [];
    return pets.map(({ id }) => ({ id }));
}

type PageProps = {
    params: { id: string };
};

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const id = params.id;

    const supabase = createClient();
    const { data } = await supabase
        .from('food')
        .select('name')
        .eq('id', id)
        .maybeSingle();

    const title = data?.name ?? 'Food not found';

    const fallbackDescription = 'Share. Learn. Advance.';
    const description = fallbackDescription;
    let image = getUrl('food', data?.name ?? 'not found');
    const parentTwitterSite = (await parent).twitter?.site ?? '';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            ...(image ? { images: [{ url: image }] } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            site: parentTwitterSite,
        },
    };
}

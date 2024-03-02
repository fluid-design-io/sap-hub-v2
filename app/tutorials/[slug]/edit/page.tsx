import { Skeleton } from '@/components/ui/skeleton';
import { createClient } from '@/utils/supabase/client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import React from 'react';

const TutorialForm = dynamic(() => import('./tutorial-form'), {
    loading: () => <Skeleton className="mx-auto h-96 w-full max-w-4xl" />,
    ssr: false,
});

type TutorialPageProps = {
    params: {
        slug: string;
    };
};

async function TutorialPage({ params: { slug } }: TutorialPageProps) {
    const supabase = createClient();
    const { data: tutorial } = await supabase
        .from('tutorials')
        .select('*')
        .match({ slug })
        .single();
    if (!tutorial) notFound();
    return <TutorialForm tutorial={tutorial} />;
}

export default TutorialPage;

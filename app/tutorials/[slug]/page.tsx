import Renderer from '@/components/editor/renderer';
import { PageHeader } from '@/components/site/page-header';
import { Card, CardContent } from '@/components/ui/card';
import Container from '@/components/ui/container';
import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';
import { BoxSelect, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

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
    return (
        <Container className="max-w-4xl">
            <PageHeader title={tutorial.title} />
            <Card className="relative w-full">
                <Link
                    href="/tutorials"
                    className={cn(
                        'group',
                        'size-8 rotate-[-4.5deg] rounded-md border-2 border-black bg-white text-black',
                        'absolute -left-3.5 -top-3.5 flex items-center justify-center',
                    )}
                >
                    <ChevronLeft className="size-5 transition-transform group-hover:-translate-x-1" />
                    <span className="sr-only">Back</span>
                </Link>
                <CardContent className="min-h-[400px]">
                    {tutorial.body ? (
                        <Renderer blocks={tutorial.body as any} />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-card-foreground">
                            <BoxSelect className="mb-4 size-8" />
                            <p>No content found</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}

export default TutorialPage;

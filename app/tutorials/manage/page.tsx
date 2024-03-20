import { PageHeader } from '@/components/site/page-header';
import { Card, CardContent } from '@/components/ui/card';
import Container from '@/components/ui/container';
import { createClient } from '@/utils/supabase/server';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import CreateTutorialButton from '../create-tutorial-button';

async function MangeTutorialPage() {
    const supabase = createClient();
    const { data: tutorials } = await supabase
        .from('tutorials')
        .select('id, title, slug')
        .throwOnError();
    if (!tutorials || tutorials.length === 0)
        return (
            <>
                <PageHeader title="My Tutorials" />
                <Container className="mx-auto max-w-4xl">
                    <p>No tutorials found</p>
                </Container>
            </>
        );
    return (
        <div>
            <PageHeader title="My Tutorials" />
            <Container className="mx-auto max-w-4xl">
                <CreateTutorialButton />
                <ul className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {tutorials.map(({ slug, title, id }) => (
                        <li key={id}>
                            <Card>
                                <CardContent className="group relative isolate w-full text-card-foreground">
                                    <div className="pointer-events-none min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold leading-6">
                                                {title}
                                            </p>
                                            <ArrowRight className="size-5 transition group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                    <Link href={`/tutorials/${slug}/edit`}>
                                        <div className="absolute -inset-2 z-[-1]" />
                                    </Link>
                                </CardContent>
                            </Card>
                        </li>
                    ))}
                </ul>
            </Container>
        </div>
    );
}

export default MangeTutorialPage;

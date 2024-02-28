import { PageHeader } from '@/components/site/page-header';
import SitePagination from '@/components/site/pagination';
import Container from '@/components/ui/container';
import { getUrl } from '@/lib/get-item-public-url';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import Link from 'next/link';

const PER_PAGE = 48;

export default async function Pets({
    searchParams,
}: {
    searchParams?: {
        page?: string;
    };
}) {
    const supabase = createClient();
    const currentPage = Number(searchParams?.page) || 1;
    const { data: pets, count } = await supabase
        .from('pets')
        .select('id, name', {
            count: 'estimated',
        })
        .order('tier', { ascending: true })
        .order('name', { ascending: true })
        .limit(PER_PAGE)
        .range((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE - 1);
    const total = count || 0;
    const totalPages = Math.ceil(total / 48);
    return (
        <>
            <PageHeader title="Pets" subtitle="Adorable companions" />
            <Container className="mx-auto flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)_220px] lg:gap-10">
                <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-6rem)] w-full shrink-0 border-r border-border/40 md:sticky md:block">
                    <h3>Filters</h3>
                    <p>Coming soon...</p>
                </aside>
                <main className="flex w-full flex-col justify-center">
                    <ul className="mx-auto grid max-w-xl grid-cols-3 gap-6 lg:grid-cols-4">
                        {pets &&
                            pets.map(({ id, name }) => (
                                <li key={id}>
                                    <Link href={`/pets/${id}`} scroll={false}>
                                        <Image
                                            alt={name}
                                            src={getUrl('pets', name)}
                                            height={128}
                                            width={128}
                                            className="aspect-square w-full rounded-xl object-contain object-center"
                                        />
                                    </Link>
                                </li>
                            ))}
                    </ul>
                    <SitePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                </main>
            </Container>
        </>
    );
}

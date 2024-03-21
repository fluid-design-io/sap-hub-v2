import Loading from '@/app/pets/[id]/loading';
import Detail from '@/app/pets/detail';
import Modal from '@/components/site/intercept-modal';
import pets from '@/public/data/pets.json';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function PetModal({
    params: { id },
}: {
    params: { id: string };
}) {
    const data = pets.find((p) => p.Id === id);
    if (!data) return notFound();
    return (
        <Modal title={data.Name} description={data?.PerkNote}>
            <Suspense fallback={<Loading />}>
                <Detail id={id} />
            </Suspense>
        </Modal>
    );
}

export async function generateStaticParams() {
    if (!pets) return [];
    return pets.map(({ Id: id }) => ({ id }));
}

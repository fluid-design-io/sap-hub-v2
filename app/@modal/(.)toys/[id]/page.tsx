import Loading from '@/app/food/[id]/loading';
import Detail from '@/app/toys/detail';
import Modal from '@/components/site/intercept-modal';
import toys from '@/public/data/toys.json';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function ToysModal({
    params: { id },
}: {
    params: { id: string };
}) {
    const data = toys.find((p) => p.Id === id);
    if (!data) return notFound();

    return (
        <Modal title={data.Name} description={`Tier ${data.Tier}`}>
            <Suspense fallback={<Loading />}>
                <Detail id={id} />
            </Suspense>
        </Modal>
    );
}

import Loading from '@/app/food/[id]/loading';
import Detail from '@/app/food/detail';
import Modal from '@/components/site/intercept-modal';
import food from '@/public/data/food.json';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function FoodModal({
    params: { id },
}: {
    params: { id: string };
}) {
    //! Hack to remove `.prefetch` from the params
    const idPatch = id.replace('.prefetch', '');
    const data = food.find((p) => p.Id === idPatch);
    console.log(`===> 🟢 fetching food with id ${id}`, data);
    if (!data) return notFound();
    return (
        <Modal title={data.Name} description={`Tier ${data.Tier}`}>
            <Suspense fallback={<Loading />}>
                <Detail id={id} />
            </Suspense>
        </Modal>
    );
}

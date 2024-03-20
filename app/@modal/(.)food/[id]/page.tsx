import Loading from '@/app/food/[id]/loading';
import Detail from '@/app/food/detail';
import Modal from '@/components/site/intercept-modal';
import food from '@/public/data/food.json';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function FoodModal({
    params: { id },
}: {
    params: { id: string };
}) {
    const data = food.find((p) => p.Id === id);
    if (!data) return notFound();
    return (
        <Modal title={data.Name} description={`Tier ${data.Tier}`}>
            <Suspense fallback={<Loading />}>
                <Detail id={id} />
            </Suspense>
        </Modal>
    );
}

export async function generateStaticParams() {
    const supabase = createClient();
    const { data: pets } = await supabase.from('food').select('id');
    if (!pets) return [];
    return pets.map(({ id }) => ({ id }));
}

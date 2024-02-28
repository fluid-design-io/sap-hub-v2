import Detail from '@/app/toys/detail';
import Modal from '@/components/site/intercept-modal';
import { createClient } from '@/utils/supabase/client';
import { notFound } from 'next/navigation';

export default async function FoodModal({
    params: { id },
}: {
    params: { id: string };
}) {
    const supabase = createClient();
    const { data } = await supabase
        .from('toys')
        .select('*')
        .eq('id', id)
        .maybeSingle();
    if (!data) return notFound();

    return (
        <Modal title={data.name} description={''}>
            <Detail data={data} />
        </Modal>
    );
}

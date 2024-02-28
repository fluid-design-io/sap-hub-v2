import Detail from '@/app/pets/detail';
import Modal from '@/components/site/intercept-modal';
import { createClient } from '@/utils/supabase/client';
import { notFound } from 'next/navigation';

export default async function PetModal({
    params: { id },
}: {
    params: { id: string };
}) {
    const supabase = createClient();
    const { data } = await supabase
        .from('pets')
        .select('*')
        .eq('id', id)
        .maybeSingle();
    if (!data) return notFound();

    return (
        <Modal title={data.name} description={data.perk_note}>
            <Detail pet={data} />
        </Modal>
    );
}

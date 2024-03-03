'use client';

import { Toolbar } from '@/components/editor/layout/toolbar';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { deleteTutorial } from './actions';

function TutorialEditorToolbar() {
    const form = useFormContext();
    const router = useRouter();
    const title = form.getValues('title');

    const handleDeleteTutorial = async () => {
        const id = form.getValues('id');
        if (!id) return console.error('No id found in form values');
        try {
            await deleteTutorial(id);
            toast('Tutorial deleted');
            router.push('/tutorials/manage');
        } catch (error: any) {
            toast.error('Failed to delete tutorial', {
                description: error.message,
            });
        }
    };

    return <Toolbar title={title} onDelete={handleDeleteTutorial} />;
}

export default TutorialEditorToolbar;

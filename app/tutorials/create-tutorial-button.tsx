'use client';

import { Form, fields } from '@/components/form';
import { FormReturnType } from '@/components/form/types';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { createTutorial } from '@/utils/supabase/tutorial/create';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

import { reservedSlugs } from './reserved-slug';

function CreateTutorialButton() {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const fieldsConfig = {
        title: fields.slug({
            label: 'Title',
            placeholder: 'New Tutorial...',
            description: 'Title of the tutorial.',
            validation: z
                .string()
                .min(2, { message: 'Title must be at least 2 characters.' }),
        }),
    };

    // 2. Define a submit handler.
    async function onSubmit(
        values: FormReturnType<typeof fieldsConfig>['values'],
        form: FormReturnType<typeof fieldsConfig>['form'],
    ) {
        setLoading(true);
        // 3. Disallow reserved slugs.
        if (reservedSlugs.includes(values.slug)) {
            form.setError('slug', {
                message: 'This slug is reserved.',
            });
            setLoading(false);
            return;
        }
        try {
            await createTutorial({
                slug: values.slug,
                title: values.title,
            });
        } catch (error: any) {
            console.error(error);
            toast.error('Failed to create tutorial.', {
                description: error?.message,
            });
            setLoading(false);
            return;
        }
        form.reset(values);
        setLoading(false);
        toast.success(`Created tutorial ${values.title}!`);
        setTimeout(() => {
            router.push(`/tutorials/${values.slug}/edit`);
        }, 300);
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger disabled={loading} asChild>
                <Button disabled={open}>
                    New Tutorial <PlusIcon className="ml-2 size-3.5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="border-theme">
                <Form
                    fieldsConfig={fieldsConfig}
                    loading={loading}
                    onSubmit={(values, form) => onSubmit(values, form)}
                />
            </PopoverContent>
        </Popover>
    );
}

export default CreateTutorialButton;

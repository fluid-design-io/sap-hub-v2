'use client';

import { Form, fields } from '@/components/form';
import { FormReturnType } from '@/components/form/types';
import { Card, CardContent } from '@/components/ui/card';
import Container from '@/components/ui/container';
import { Tables } from '@/types/database';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

import Editor from './editor';

export const fieldsConfig = {
    id: fields.text({}),
    title: fields.slug({
        label: 'Title',
        placeholder: 'New Blog...',
        description: 'Title of the blog post.',
        validation: z
            .string()
            .min(2, { message: 'Title must be at least 2 characters.' }),
    }),
    cover_image: fields.image({
        storageBucket: 'blog',
        description: 'This image will be used as the cover image for the post.',
        className: 'aspect-[3/2]',
    }),
    is_published: fields.checkbox({
        description:
            'Check this box to publish the post, otherwise it will be saved as a draft.',
    }),
    body: fields.document({}),
    published_at: fields.date({}),
};

function TutorialForm({ tutorial }: { tutorial: Tables<'tutorials'> }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    async function onSubmit(
        values: FormReturnType<typeof fieldsConfig>['values'],
        form: FormReturnType<typeof fieldsConfig>['form'],
    ) {
        if (!form.formState.isDirty) return;
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 200));
        try {
            //   await save(values)
            toast.success(`Updated blog ${values.title}!`);
            form.clearErrors();
            form.reset(values);
        } catch (error: any) {
            toast.error('Failed to save blog', {
                description: error.message,
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
        // redirect to new slug if slug changed
        if (values.slug !== tutorial.slug) {
            router.replace(`/tutorials/${values.slug}/edit`);
        }
    }
    return (
        <Form
            fieldsConfig={fieldsConfig}
            loading={loading}
            onSubmit={(values, form) => onSubmit(values, form)}
            // defaultValues={tutorial}
            renderForm={false}
        >
            <Container className="w-full max-w-4xl">
                <Card className="relative w-full">
                    <CardContent className="min-h-[400px]">
                        <Editor />
                    </CardContent>
                </Card>
            </Container>
        </Form>
    );
}

export default TutorialForm;

import { PageHeader } from '@/components/site/page-header';
import React from 'react';
import { useFormContext } from 'react-hook-form';

function FormTitle() {
    const form = useFormContext();
    const title = form.watch('title') || 'New Tutorial';
    const description = form.watch('description') || 'Create a new tutorial';
    return <PageHeader title={title} subtitle={description} />;
}

export default FormTitle;

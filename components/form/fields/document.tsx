import { OutputData } from '@editorjs/editorjs';
import dynamic from 'next/dynamic';
import { useFormContext } from 'react-hook-form';
import * as z from 'zod';

import { BaseAssetConfig } from '../types';

const EditorBlock = dynamic(() => import('@/components/editor/editor'), {
    ssr: false,
});

// !TODO: Infer the type of the validation from the config
export type DocumentFieldConfig<T extends z.ZodType = z.ZodType> = {
    type: 'document';
    validation: T;
    defaultValue?: string;
} & BaseAssetConfig;

interface DocumentProps extends DocumentFieldConfig {
    name: string;
}

export const Document: React.FC<DocumentProps> = ({
    name,
    storageBucket,
    path,
}) => {
    const form = useFormContext();
    const handleUpdateBody = (val: OutputData) => {
        form.setValue(name, val, { shouldDirty: true });
    };
    return (
        <EditorBlock
            data={form.getValues(name)}
            onChange={handleUpdateBody}
            holder="editorjs-container"
            options={{
                image: {
                    additionalRequestData: {
                        bucket: storageBucket,
                        path,
                    },
                },
            }}
            className="mx-auto max-w-[calc(100vw-1rem)] flex-1 px-4 lg:max-w-3xl lg:px-16"
        />
    );
};

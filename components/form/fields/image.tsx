import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';
import { ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { Control, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@ui/form';

import { BaseAssetConfig, BaseFieldConfig } from '../types';
import { snakeToTitle } from '../utils';

export type ImageFieldConfig = {
    type: 'image';
    validation: z.ZodType<string | undefined | null>;
    defaultValue?: string;
    /**
     * When `true`, prevents the user from interacting with the field
     */
    readOnly?: boolean;
    className?: HTMLDivElement['className'];
    imageClassName?: HTMLImageElement['className'];
} & BaseFieldConfig &
    BaseAssetConfig;

interface TextInputProps extends ImageFieldConfig {
    name: string;
    control: Control<any>;
}

export const Image: React.FC<TextInputProps> = ({
    name,
    label,
    description,
    storageBucket = 'tutorials',
    path = '',
    placeholder,
    control,
    readOnly,
    className,
    imageClassName,
}) => {
    const labelTitle = label || snakeToTitle(name);
    const supabase = createClient();
    const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
        null,
    );
    const [isDragOver, setIsDragOver] = useState(false);
    const form = useFormContext();
    const processFile = async (file: File) => {
        if (!file) return;
        if (file.size > 1024 * 1024 * 10) {
            toast.error('File size must be less than 10MB');
            return;
        }
        if (!name) return toast.error('input Name is required');
        const reader = new FileReader();
        reader.readAsDataURL(file);

        process.env.NODE_ENV === 'development' &&
            console.log(
                `📦 Uploading ${file.name} to ${storageBucket}/${path}/${file.name}...`,
            );
        reader.onload = async () => {
            const { data, error } = await supabase.storage
                .from(storageBucket)
                .upload(`${path}/${file.name}`, file, { upsert: true });

            if (error) {
                console.error(error);
                toast.error(error.message);
                return;
            }

            const uploadedPath = data.path;
            const { publicUrl } = supabase.storage
                .from(storageBucket)
                .getPublicUrl(uploadedPath).data;
            form.setValue(name, publicUrl, { shouldDirty: true });
            setCoverImagePreview(reader.result as string);
            toast.success('Image uploaded');
        };
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsDragOver(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            processFile(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };
    if (!name)
        return (
            <p className="text-destructive">
                <code>name</code> is required
            </p>
        );
    return (
        <FormField
            control={control}
            name={name}
            render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                    <FormLabel
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        <div className="mb-2">{labelTitle}</div>
                        {description && (
                            <FormDescription className="mb-2 font-normal">
                                {description}
                            </FormDescription>
                        )}
                        <div
                            className={cn(
                                'block w-full rounded-md border p-1',
                                isDragOver ? 'bg-primary/50' : 'bg-muted',
                                className,
                            )}
                        >
                            {!coverImagePreview && value && (
                                <img
                                    src={value}
                                    className={cn(
                                        'h-full w-full rounded-[calc(var(--radius)-4px)] object-cover',
                                        imageClassName,
                                    )}
                                    alt="Cover Image"
                                />
                            )}
                            {coverImagePreview && (
                                <img
                                    src={coverImagePreview}
                                    className={cn(
                                        'h-full w-full rounded-[calc(var(--radius)-4px)] object-cover',
                                        imageClassName,
                                    )}
                                    alt="Cover Image"
                                />
                            )}
                            {!coverImagePreview && !value && (
                                <div className="grid h-full w-full place-items-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                        <span className="text-muted-foreground">
                                            Drop an image here
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </FormLabel>
                    <div className="flex items-center gap-2">
                        <FormControl className="hidden h-0 w-0">
                            <Input
                                {...fieldProps}
                                placeholder="Select an image"
                                type="file"
                                accept="image/*"
                                // only allow 1 file
                                multiple={false}
                                onChange={handleFileChange}
                            />
                        </FormControl>
                        {(!!value || !!coverImagePreview) && (
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => {
                                    onChange('', { shouldDirty: true });
                                    setCoverImagePreview(null);
                                }}
                            >
                                Remove
                            </Button>
                        )}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

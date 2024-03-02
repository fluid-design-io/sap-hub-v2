import { Button } from '@/components/ui/button';
import slugify from '@sindresorhus/slugify';
import { useEffect } from 'react';
import { Control, useFormContext } from 'react-hook-form';
import * as z from 'zod';

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@ui/form';
import { Input as InputField } from '@ui/input';

import { BaseFieldConfig } from '../types';
import { snakeToTitle } from '../utils';

export type SlugFieldConfig<SlugName extends string | undefined = string> = {
    type: 'slug';
    validation: z.ZodString;
    defaultValue?: string;
    slug?: {
        label?: string;
        /**
         * Overwrite the default slug generation function
         * @default
         * `slug`
         */
        name?: SlugName;
        description?: string;
        validation?: z.ZodString;
        defaultValue?: string;
    };
} & BaseFieldConfig;

interface SlugFieldProps extends SlugFieldConfig {
    name: string;
    control: Control<any>;
}

export const Slug: React.FC<SlugFieldProps> = ({
    name,
    description,
    label,
    placeholder,
    slug,
    control,
}) => {
    const form = useFormContext();
    const labelTitle = label || snakeToTitle(name);
    const slugName = slug?.name ?? 'slug';
    const handleGenerateSlug = () => {
        const sluggified = slugify(form.getValues(name));
        form.setValue(slugName, sluggified);
    };
    const onChangeWithSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
        // also change slug if slug is empty or if slug is the same as the title
        if (
            !form.getValues(slugName) ||
            form.getValues(slugName) === slugify(form.getValues(name))
        ) {
            form.setValue(slugName, slugify(e.target.value));
        }
    };
    useEffect(() => {
        const slugValue = form.getValues(slugName);
        if (!!slug?.defaultValue && slugValue !== slug?.defaultValue) {
            console.log(`[slug.tsx] setting slug to ${slug.defaultValue}`);
            form.setValue(slugName, slug.defaultValue);
        }
    }, [slugName]);
    return (
        <>
            <FormField
                name={name}
                control={control}
                render={({ field: { onChange, ...rest } }) => (
                    <FormItem>
                        <FormLabel>{labelTitle}</FormLabel>
                        <FormControl>
                            <InputField
                                placeholder={placeholder}
                                onChange={(e) => {
                                    onChangeWithSlug(e);
                                    onChange(e);
                                }}
                                {...rest}
                            />
                        </FormControl>
                        {description && (
                            <FormDescription>{description}</FormDescription>
                        )}
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name={slugName}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{slug?.label ?? 'Slug'}</FormLabel>
                        <div className="flex flex-row items-center space-x-3">
                            <FormControl>
                                <InputField
                                    placeholder={placeholder}
                                    {...field}
                                />
                            </FormControl>
                            <Button
                                variant="outline"
                                className="flex-shrink-0"
                                onClick={handleGenerateSlug}
                                type="button"
                            >
                                Regenerate
                            </Button>
                        </div>
                        {slug?.description && (
                            <FormDescription>
                                {slug?.description}
                            </FormDescription>
                        )}
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
};

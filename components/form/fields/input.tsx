import { Control } from 'react-hook-form';
import * as z from 'zod';

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@ui/form';
import { Input as InputField } from '@ui/input';
import { Textarea } from '@ui/textarea';

import { FormLabel } from '../components';
import { BaseFieldConfig } from '../types';
import { snakeToTitle } from '../utils';

// !TODO: Infer the type of the validation from the config
export type TextFieldConfig<T extends z.ZodType = z.ZodType> = {
    type: 'text';
    validation: T;
    defaultValue?: string;
    multiline?: boolean;
    /**
     * When `true`, prevents the user from interacting with the field
     */
    readOnly?: boolean;
} & BaseFieldConfig;

interface TextInputProps extends TextFieldConfig {
    name: string;
    control: Control<any>;
}

export const Input: React.FC<TextInputProps> = ({
    name,
    label,
    description,
    placeholder,
    multiline,
    control,
    readOnly,
}) => {
    const labelTitle = label || snakeToTitle(name);
    if (multiline) {
        return (
            <FormField
                name={name}
                control={control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel label={labelTitle} readOnly={readOnly} />
                        <FormControl>
                            <Textarea
                                placeholder={placeholder}
                                {...field}
                                readOnly={readOnly}
                            />
                        </FormControl>
                        {description && (
                            <FormDescription>{description}</FormDescription>
                        )}
                        <FormMessage />
                    </FormItem>
                )}
            />
        );
    }

    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem>
                    <FormLabel label={labelTitle} readOnly={readOnly} />
                    <FormControl>
                        <InputField
                            placeholder={placeholder}
                            {...field}
                            readOnly={readOnly}
                        />
                    </FormControl>
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

import { Control } from 'react-hook-form';
import * as z from 'zod';

import { Checkbox as CheckboxField } from '@ui/checkbox';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@ui/form';

import { BaseFieldConfig } from '../types';
import { snakeToTitle } from '../utils';

export type CheckboxFieldConfig = {
    type: 'checkbox';
    validation: z.ZodBoolean;
    defaultValue?: boolean;
    /**
     * When `true`, prevents the user from interacting with the field
     */
    disabled?: boolean;
} & BaseFieldConfig;
interface CheckboxProps extends CheckboxFieldConfig {
    name: string;
    control: Control<any>;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    name,
    label,
    description,
    control,
    disabled,
}) => {
    const labelTitle = label || snakeToTitle(name);
    return (
        <FormField
            control={control}
            name={name}
            render={({ field: { value, onChange, ...rest } }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                        <CheckboxField
                            checked={value}
                            onCheckedChange={onChange}
                            {...rest}
                            disabled={disabled}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>{labelTitle}</FormLabel>
                        {description && (
                            <FormDescription>{description}</FormDescription>
                        )}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

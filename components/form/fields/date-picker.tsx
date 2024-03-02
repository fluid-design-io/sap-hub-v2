import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Control } from 'react-hook-form';
import * as z from 'zod';

import { FormLabel } from '../components';
import { BaseFieldConfig } from '../types';
import { snakeToTitle } from '../utils';

export type DatePickerFieldConfig = {
    type: 'date';
    validation: z.ZodType<string>;
    defaultValue?: string;
    disabled?: boolean;
} & BaseFieldConfig;

interface DatePickerFieldProps extends DatePickerFieldConfig {
    name: string;
    control: Control<any>;
}

export const DatePicker: React.FC<DatePickerFieldProps> = ({
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
            render={({ field }) => {
                const formatedDate =
                    typeof field.value === 'string'
                        ? new Date(field.value)
                        : field.value;
                return (
                    <FormItem className="flex flex-col">
                        <FormLabel label={labelTitle} readOnly={disabled} />
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={'outline'}
                                        className={cn(
                                            'w-[240px] pl-3 text-left font-normal',
                                            !field.value &&
                                                'text-muted-foreground',
                                        )}
                                        disabled={disabled}
                                    >
                                        {field.value ? (
                                            format(formatedDate, 'PPP')
                                        ) : (
                                            <span>
                                                {disabled
                                                    ? 'No date available'
                                                    : 'Select a date'}
                                            </span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={formatedDate}
                                    onSelect={(date) =>
                                        field.onChange(
                                            date?.toISOString() || '',
                                        )
                                    }
                                    disabled={(date) =>
                                        date > new Date() ||
                                        date < new Date('1900-01-01')
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {description && (
                            <FormDescription>{description}</FormDescription>
                        )}
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};

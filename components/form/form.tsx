import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@ui/button';
import { Form as FormField } from '@ui/form';

import { createForm } from '.';
import { renderFormFields } from './render-form-fields';
import { FieldsConfig, FormReturnType } from './types';

type FormProps<T extends FieldsConfig> = {
    fieldsConfig: T;
    onSubmit: (
        values: FormReturnType<T>['values'],
        form: FormReturnType<T>['form'],
    ) => Promise<void>;
    loading: boolean;
    submitButton?: string | React.ReactNode;
    defaultValues?: FormReturnType<T>['values'];
} & (
    | {
          /**
           * You can render your own form element.
           */
          renderForm?: false;
          children?: React.ReactNode;
      }
    | {
          /**
           * Render the form element.
           * @default true
           */
          renderForm?: true;
          children?: never;
      }
);

export function Form<T extends FieldsConfig>({
    fieldsConfig,
    defaultValues: serverDefaultValues,
    onSubmit,
    loading,
    submitButton,
    renderForm = true,
    children,
}: FormProps<T>) {
    const { defaultValues, formSchema } = createForm(fieldsConfig);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema as any),
        defaultValues: {
            ...defaultValues,
            ...serverDefaultValues,
        } as any,
    });
    return (
        <FormField {...form}>
            <form
                onSubmit={form.handleSubmit(async (props: any) =>
                    onSubmit(props, form),
                )}
                className="space-y-4"
            >
                {renderForm ? (
                    <>
                        {renderFormFields(fieldsConfig, form.control)}
                        {React.isValidElement(submitButton) ? (
                            submitButton
                        ) : (
                            <Button
                                type="submit"
                                disabled={loading || !form.formState.isDirty}
                                size="sm"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    submitButton || 'Submit'
                                )}
                            </Button>
                        )}
                    </>
                ) : (
                    children
                )}
            </form>
        </FormField>
    );
}

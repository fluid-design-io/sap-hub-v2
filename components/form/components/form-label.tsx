import { Badge } from '@/components/ui/badge';
import React from 'react';

import { FormLabel as FormLabelField } from '@ui/form';

type FormLabelProps = {
    label: string;
    readOnly?: boolean;
};

export function FormLabel({ label, readOnly }: FormLabelProps) {
    return (
        <FormLabelField className="flex items-center">
            <span>{label}</span>
            {readOnly && (
                <Badge
                    variant="outline"
                    className="ml-2 font-normal text-muted-foreground"
                >
                    read-only
                </Badge>
            )}
        </FormLabelField>
    );
}

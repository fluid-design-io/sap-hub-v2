import { pick } from '@/components/form';
import { renderFormFields } from '@/components/form/render-form-fields';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { fieldsConfig } from './tutorial-form';

function Editor() {
    const form = useFormContext();
    return <>{renderFormFields(pick(fieldsConfig, ['body']), form.control)}</>;
}

export default Editor;

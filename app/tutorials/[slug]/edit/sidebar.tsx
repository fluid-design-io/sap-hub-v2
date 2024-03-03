'use client';

import { Collapsible, Sidebar } from '@/components/editor/layout';
import { pick } from '@/components/form';
import { renderFormFields } from '@/components/form/render-form-fields';
import { useFormContext } from 'react-hook-form';

import { fieldsConfig } from './tutorial-form';

function TutorialSidebar() {
    const form = useFormContext();
    return (
        <Sidebar>
            {renderFormFields(
                pick(fieldsConfig, ['title', 'is_published']),
                form.control,
            )}
            <Collapsible>
                {renderFormFields(
                    pick(fieldsConfig, ['published_at', 'cover_image']),
                    form.control,
                )}
            </Collapsible>
        </Sidebar>
    );
}

export default TutorialSidebar;

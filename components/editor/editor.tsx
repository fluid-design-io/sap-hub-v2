//./components/Editor
import { cn } from '@/lib/utils';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import React, { memo, useEffect, useRef } from 'react';

import { EDITOR_COMPONENT, EditorComponentOptions } from './editor-component';

// import { EDITOR_TOOLS } from "./EditorComponent";
//props
type Props = {
    data?: OutputData;
    onChange(val: OutputData): void;
    holder: string;
    className?: string;
    options?: EditorComponentOptions;
};

const EditorBlock = ({ data, onChange, holder, className, options }: Props) => {
    //add a reference to editor
    const ref = useRef<EditorJS>();

    //initialize editorjs
    useEffect(() => {
        //initialize editor if we don't have a reference
        if (!ref.current) {
            const editor = new EditorJS({
                holder: holder,
                tools: EDITOR_COMPONENT(options),
                data,
                placeholder: 'Start writing...',
                async onChange(api, event) {
                    const data = await api.saver.save();
                    onChange(data);
                },
            });
            ref.current = editor;
        }

        //add a return function handle cleanup
        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, []);

    return (
        <article
            id={holder}
            className={cn(
                'no-tw-preflight',
                'max-w-full',
                'selection:bg-cyan-400 selection:text-cyan-950',
                '*:border-border',
                'prose',
                className,
            )}
        />
    );
};

export default memo(EditorBlock);

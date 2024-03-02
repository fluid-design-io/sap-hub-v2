import Code from '@editorjs/code';
import { EditorConfig } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import LinkTool from '@editorjs/link';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Table from '@editorjs/table';

export type EditorComponentOptions = {
    image?: {
        additionalRequestData: Record<string, any>;
    };
};

export const EDITOR_COMPONENT = (
    options?: EditorComponentOptions,
): EditorConfig['tools'] => {
    return {
        code: Code,
        header: {
            class: Header,
            config: { levels: [2, 3, 4], defaultLevel: 3 },
        },
        paragraph: {
            class: Paragraph,
            inlineToolbar: true,
        },
        list: {
            class: List,
            inlineToolbar: true,
        },
        linkTool: {
            class: LinkTool,
            config: {
                endpoint: '/api/v1/editor/fetch-url',
            },
        },
        image: {
            class: ImageTool,
            config: {
                endpoints: {
                    byFile: `/api/v1/editor/upload`,
                    byUrl: `/api/v1/editor/upload-by-url`,
                },
                additionalRequestData:
                    options?.image?.additionalRequestData ?? {},
            },
        },
        table: {
            class: Table,
            inlineToolbar: true,
            config: {
                rows: 2,
                cols: 3,
            },
        },
    };
};

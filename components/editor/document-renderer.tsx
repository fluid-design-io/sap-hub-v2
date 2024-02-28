import {
    DocumentRendererProps,
    DocumentRenderer as KeystaticRenderer,
} from '@keystatic/core/renderer';
import Link from 'next/link';

import { Separator } from '@ui/separator';

import Heading from './heading';

export default async function DocumentRenderer({
    document,
}: DocumentRendererProps) {
    return <KeystaticRenderer document={document} renderers={getRenderers()} />;
}
const getRenderers = (): DocumentRendererProps['renderers'] => ({
    inline: {
        bold: ({ children }) => <strong>{children}</strong>,
        code: ({ children }) => (
            <code className="rounded-md border bg-muted px-1 py-0.5 font-mono text-sm text-card-foreground">
                {children}
            </code>
        ),
        link: ({ href, children }) => {
            return (
                <Link
                    className="cursor-pointer font-medium underline hover:no-underline"
                    href={href}
                >
                    {children}
                </Link>
            );
        },
    },
    block: {
        heading: ({ level, children }) => (
            <Heading level={level} anchor>
                {children}
            </Heading>
        ),
        paragraph: ({ children, textAlign }) => (
            <p
                className="text-md text-card-foreground/85"
                style={{ textAlign }}
            >
                {children}
            </p>
        ),
        list: ({ type, children }) => {
            if (type === 'ordered') {
                return (
                    <ol className="mt-2 list-inside list-decimal text-card-foreground/85">
                        {children.map((child, index) => (
                            <li key={index} className="mb-2">
                                {child}
                            </li>
                        ))}
                    </ol>
                );
            }
            return (
                <ul className="ml-4 mt-2 list-disc text-card-foreground/85">
                    {children.map((child, index) => (
                        <li key={index} className="mb-2">
                            {child}
                        </li>
                    ))}
                </ul>
            );
        },
        divider: () => {
            return <Separator />;
        },
        layout: ({ children }) => {
            return (
                <div className="my-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {children.map((element, index) => (
                        <div
                            key={index}
                            className="bg-slate-3 rounded-lg p-4 text-sm"
                        >
                            {element}
                        </div>
                    ))}
                </div>
            );
        },
    },
});

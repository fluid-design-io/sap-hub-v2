import { cn } from '@/lib/utils';
import slugify from '@sindresorhus/slugify';
import { LinkIcon } from 'lucide-react';
import { ReactNode } from 'react';

import { Heading as HeadingPrimetive } from '../ui/typography';

type HeadingProps = {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: ReactNode;
    anchor?: boolean;
};
type ValidHeading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export default function Heading({ level, children, anchor }: HeadingProps) {
    const type: ValidHeading = `h${level}`;

    if (anchor) {
        const slug = getSlug(children);
        return (
            <a
                id={slug}
                href={`#${slug}`}
                className={cn(
                    'peer-adjacent:mt-0 group relative mt-6 scroll-mt-[7rem] no-underline first:mt-0',
                )}
            >
                <LinkIcon className="absolute -ml-5 mt-2 hidden h-4 w-8 pr-4 group-hover:inline" />
                <HeadingPrimetive
                    type={`h${level}`}
                    className="text-stroke text-card-foreground"
                >
                    {children}
                </HeadingPrimetive>
            </a>
        );
    }

    return (
        <HeadingPrimetive
            type={type}
            className={cn('peer-adjacent:mt-0 mt-6 first:mt-0')}
        >
            {children}
        </HeadingPrimetive>
    );
}

const getSlug = (node: ReactNode) => slugify(getTextNode(node));

const getTextNode = (node: ReactNode): string => {
    if (!node) return '';
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    // Node object expected for Headings
    if (
        typeof node === 'object' &&
        'text' in node &&
        typeof node.text === 'string'
    ) {
        return node.text;
    }
    if (node instanceof Array) return node.map(getTextNode).join('');
    if (typeof node === 'object' && 'props' in node && 'node' in node.props) {
        return getTextNode(node.props.node);
    }
    return '';
};

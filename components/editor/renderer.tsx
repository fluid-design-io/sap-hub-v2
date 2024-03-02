import { cn } from '@/lib/utils';
import { OutputData } from '@editorjs/editorjs';
import slugify from '@sindresorhus/slugify';

import { Separator } from '@ui/separator';

const Header = ({ level, text }: { level: number; text: string }) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    return (
        <Tag
            id={slugify(text)}
            className="scroll-m-20"
            dangerouslySetInnerHTML={{ __html: text }}
        />
    );
};

const Paragraph = ({ text }: { text: string }) => {
    return <p dangerouslySetInnerHTML={{ __html: text }}></p>;
};

const List = ({
    items,
    style,
}: {
    items: string[];
    style: 'unordered' | 'ordered';
}) => {
    const ListTag = style === 'unordered' ? 'ul' : 'ol';

    return (
        <ListTag>
            {items.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
        </ListTag>
    );
};

const Image = ({
    url,
    caption,
    stretched,
    withBorder,
    withBackground,
}: {
    url: string;
    caption: string;
    stretched: boolean;
    withBorder: boolean;
    withBackground: boolean;
}) => {
    return (
        <figure className="relative">
            <img
                src={url}
                alt={caption}
                className={cn(
                    'object-contain',
                    { 'w-full': stretched },
                    { 'rounded-md': !stretched },
                    { border: withBorder },
                    { 'bg-muted': withBackground },
                )}
                sizes="(max-width: 768px) 100vw, 33vw"
            />
            {caption && (
                <figcaption dangerouslySetInnerHTML={{ __html: caption }} />
            )}
        </figure>
    );
};

type TableProps = {
    content: string[][];
    withHeadings: boolean;
};

const Table: React.FC<TableProps> = ({ content, withHeadings }) => {
    const renderRow = (rowData: string[], isHeader: boolean = false) => {
        const Tag = isHeader ? 'th' : 'td';

        return (
            <tr>
                {rowData.map((cell, index) => (
                    <Tag
                        key={index}
                        dangerouslySetInnerHTML={{ __html: cell }}
                    />
                ))}
            </tr>
        );
    };

    return (
        <table>
            <tbody>
                {withHeadings && content.length > 0 && (
                    <tr>{renderRow(content[0], true)}</tr>
                )}
                {content
                    .slice(withHeadings ? 1 : 0)
                    .map((row, index) => renderRow(row))}
            </tbody>
        </table>
    );
};

const Renderer = ({ blocks }: { blocks: OutputData['blocks'] }) => {
    return (
        <div>
            {blocks.map((block) => {
                switch (block.type) {
                    case 'header':
                        return (
                            <Header
                                key={block.id}
                                level={block.data.level}
                                text={block.data.text}
                            />
                        );
                    case 'paragraph':
                        return (
                            <Paragraph key={block.id} text={block.data.text} />
                        );
                    case 'list':
                        return (
                            <List
                                key={block.id}
                                items={block.data.items}
                                style={block.data.style}
                            />
                        );
                    case 'divider':
                        return <Separator />;
                    case 'image':
                        return (
                            <Image
                                key={block.id}
                                url={block.data.file.url}
                                caption={block.data.caption}
                                stretched={block.data.stretched}
                                withBorder={block.data.withBorder}
                                withBackground={block.data.withBackground}
                            />
                        );
                    case 'table':
                        return (
                            <Table
                                key={block.id}
                                content={block.data.content}
                                withHeadings={block.data.withHeadings}
                            />
                        );
                    default:
                        return (
                            <p className="text-destructive" key={block.id}>
                                Unsupported block type: {block.type}
                            </p>
                        );
                }
            })}
        </div>
    );
};

export default Renderer;

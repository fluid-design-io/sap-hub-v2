import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getUrl } from '@/lib/get-item-public-url';
import { Tables } from '@/types/database';
import Image from 'next/image';

import { Banner } from './pack-banner';
import { PackToolbar } from './pack-toolbar';
import PackViewer from './pack-viewer';

export const PackListItem = ({
    pack,
    as,
}: {
    pack: Tables<'packs'>;
    as?: React.ElementType;
}) => {
    const Comp = as ?? 'li';

    return (
        <Comp className="relative w-full max-w-full" key={pack.id}>
            <Banner>
                <h3 className="line-clamp-1 overflow-ellipsis pr-12 font-lapsus text-xl font-bold">
                    {pack.title}
                </h3>
            </Banner>
            <div className="px-2">
                <Card className="-mt-0.5 min-h-36 rounded-t-none">
                    <Image
                        src={getUrl('pets', pack.minion)}
                        width={100}
                        height={100}
                        className="absolute -right-6 -top-6 z-[3] size-24 rotate-12"
                        alt={pack.title}
                    />
                    <CardContent className="text-card-foreground lg:px-8">
                        <PackViewer pack={pack} />
                    </CardContent>
                    <CardFooter className="flex flex-col-reverse justify-between gap-2 md:flex-row">
                        <PackToolbar pack={pack} />
                    </CardFooter>
                </Card>
            </div>
        </Comp>
    );
};

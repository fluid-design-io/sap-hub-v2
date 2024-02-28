import { WoodBoard } from '@/components/site/wood-board';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { getUrl } from '@/lib/get-item-public-url';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import Link from 'next/link';

import { Heading } from '@ui/typography';

//!Not sure if this works
export const revalidate = 60 * 60 * 6; // 6 hours

const getSpotlightItems = async () => {
    const supabase = createClient();
    const { data } = await supabase
        .from('daily_spotlight')
        .select('*')
        .match({ id: '1' })
        .single();
    return data;
};
async function SpotlightCarousel() {
    const data = await getSpotlightItems();

    const headingStyle = {
        textShadow: '1px 0 0 rgba(0,0,0,0.4),0 1px 0 rgba(0,0,0,0.4)',
    };
    return (
        <Carousel className="relative -mx-6 w-[calc(100%+3rem)] [mask-image:linear-gradient(to_right,transparent_0,black_2rem,black_calc(100%-2rem),transparent)] sm:max-w-3xl">
            <CarouselContent>
                <CarouselItem className="basis-4/5 sm:basis-2/3">
                    <WoodBoard>
                        <Heading
                            type="h3"
                            className="text-center text-primary"
                            style={headingStyle}
                        >
                            Pet of the day
                        </Heading>
                        <div className="flex flex-col items-center justify-center gap-2 text-card-foreground">
                            {data?.pet_name && (
                                <Image
                                    src={getUrl('pets', data.pet_name)}
                                    alt={data?.pet_name || 'Pet of the day'}
                                    width={100}
                                    height={100}
                                    className="size-24 sm:size-16 md:size-24"
                                />
                            )}
                            <p>{data?.pet_name}</p>
                        </div>
                        <Link href={`/pets/${data?.pet_id}`} scroll={false}>
                            <span className="sr-only">
                                View {data?.pet_name} details
                            </span>
                            <div className="absolute -inset-2 z-[2]" />
                        </Link>
                    </WoodBoard>
                </CarouselItem>
                <CarouselItem className="basis-4/5 sm:basis-2/3">
                    <WoodBoard>
                        <Heading
                            type="h3"
                            className="text-center text-primary"
                            style={headingStyle}
                        >
                            Food of the day
                        </Heading>
                        <div className="flex flex-col items-center justify-center gap-2 text-card-foreground">
                            {data?.food_name && (
                                <Image
                                    src={getUrl('food', data.food_name)}
                                    alt={data?.food_name || 'Food of the day'}
                                    width={100}
                                    height={100}
                                    className="size-24 sm:size-16 md:size-24"
                                />
                            )}
                            <p>{data?.food_name}</p>
                        </div>
                        <Link href={`/food/${data?.food_id}`} scroll={false}>
                            <span className="sr-only">
                                View {data?.food_name} details
                            </span>
                            <div className="absolute -inset-2 z-[2]" />
                        </Link>
                    </WoodBoard>
                </CarouselItem>
                <CarouselItem className="basis-4/5 sm:basis-2/3">
                    <WoodBoard>
                        <Heading
                            type="h3"
                            className="text-center text-primary"
                            style={headingStyle}
                        >
                            Toy of the day
                        </Heading>
                        <div className="flex flex-col items-center justify-center gap-2 text-card-foreground">
                            {data?.toy_name && (
                                <Image
                                    src={getUrl('toys', data.toy_name)}
                                    alt={data?.toy_name || 'Toy of the day'}
                                    width={100}
                                    height={100}
                                    className="size-24 sm:size-16 md:size-24"
                                />
                            )}
                            <p>{data?.toy_name}</p>
                        </div>
                        <Link href={`/toys/${data?.toy_id}`} scroll={false}>
                            <span className="sr-only">
                                View {data?.toy_name} details
                            </span>
                            <div className="absolute -inset-2 z-[2]" />
                        </Link>
                    </WoodBoard>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    );
}

export default SpotlightCarousel;

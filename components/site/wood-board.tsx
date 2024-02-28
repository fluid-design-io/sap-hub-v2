import { getImageSet } from '@/lib/utils';
import bg_mobile from '@/public/assets/static/component/wood-board-mobile.webp';
import bg from '@/public/assets/static/component/wood-board.webp';
import Image from 'next/image';
import React from 'react';

import NailIcon from '../icon/nail';

export const WoodBoard = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="px-3">
            <div className="relative isolate flex aspect-[1.71/1.23] flex-col items-center justify-evenly overflow-visible px-[16%] py-5 sm:aspect-[18/7.6] sm:px-[10%] sm:py-4">
                {children}
                <NailIcon className="absolute -top-3 left-[60%] z-10 w-8" />
                <Image
                    src={bg_mobile}
                    alt=""
                    aria-hidden={true}
                    className="absolute inset-0 z-[-1] h-full w-full object-contain sm:hidden"
                />
                <Image
                    src={bg}
                    alt=""
                    aria-hidden={true}
                    className="absolute inset-0 z-[-1] hidden h-full w-full object-contain sm:block"
                />
            </div>
        </div>
    );
};

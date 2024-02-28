'use client';

import { useTheme } from 'next-themes';

import {
    BackgroundTheme,
    backgroundThemes,
    getBackgroundImage,
} from './background-data';

const SiteBackground = () => {
    const { resolvedTheme } = useTheme();
    if (!resolvedTheme) return null;
    const backgroundImage = getBackgroundImage(
        resolvedTheme as BackgroundTheme,
    );
    return (
        <div
            className="absolute left-0 top-0 z-[-1] h-full w-full animate-fade bg-cover bg-center animate-duration-[860ms] sm:bg-contain"
            style={{
                backgroundColor:
                    backgroundThemes[resolvedTheme as BackgroundTheme].color,
                height: '40vh',
                minHeight: '24rem',
                maxHeight: '40rem',
                width: '100%',
                backgroundImage,
                backgroundRepeat: 'repeat-x',
                //align to top
                backgroundPosition: 'top',
                maskImage:
                    'linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 30%)',
            }}
        />
    );
};

export default SiteBackground;

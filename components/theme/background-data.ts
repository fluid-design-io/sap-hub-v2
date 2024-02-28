import { getImageSet } from '@/lib/utils';
import desert from '@/public/assets/static/bg/desert.webp';
import field from '@/public/assets/static/bg/field.webp';
import lavaCave from '@/public/assets/static/bg/lava-cave.webp';
import lavaMountain from '@/public/assets/static/bg/lava-mountain.webp';
import scaryForest from '@/public/assets/static/bg/scary-forest.webp';
import snow from '@/public/assets/static/bg/snow.webp';
import { StaticImageData, getImageProps } from 'next/image';

export type BackgroundTheme =
    | 'desert'
    | 'field'
    | 'lava-cave'
    | 'lava-mountain'
    | 'scary-forest'
    | 'snow';

export type BackgroundThemeProps = {
    /**
     * The background color
     */
    color: string;
    src: StaticImageData;
};

export type SiteBackground = Record<BackgroundTheme, BackgroundThemeProps>;

export const backgroundThemes: SiteBackground = {
    desert: {
        color: '#F0924E',
        src: desert,
    },
    field: {
        color: '#D4BD4E',
        src: field,
    },
    'lava-cave': {
        color: '#A25858',
        src: lavaCave,
    },
    'lava-mountain': {
        color: '#8191BB',
        src: lavaMountain,
    },
    'scary-forest': {
        color: '#606F87',
        src: scaryForest,
    },
    snow: {
        color: '#ABC9CA',
        src: snow,
    },
};

export const backgroundNames = Object.keys(
    backgroundThemes,
) as BackgroundTheme[];

export function getBackgroundImage(theme: BackgroundTheme = 'field') {
    const {
        props: { srcSet },
    } = getImageProps({
        alt: '',
        ...backgroundThemes[theme as BackgroundTheme].src,
    });
    if (srcSet === undefined) {
        return '';
    }
    return getImageSet(srcSet);
}

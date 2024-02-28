import { type ClassValue, clsx } from 'clsx';
import { format, parse } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getImageSet = (srcSet: string | undefined) => {
    if (srcSet === undefined) {
        return '';
    }

    const imageSet = srcSet
        .split(', ')
        .map((str) => {
            const [url, dpi] = str.split(' ');
            return `url("${url}") ${dpi}`;
        })
        .join(', ');
    return `image-set(${imageSet})`;
};

export function parseAndFormatPublishedDate(publishedDate: string) {
    const today = new Date();
    const parsedDate = parse(publishedDate, 'yyyy-M-d', today);
    const formattedDate = format(parsedDate, 'MMMM do, yyyy');

    return { parsedDate, formattedDate };
}

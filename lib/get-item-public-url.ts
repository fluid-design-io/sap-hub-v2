import food from '@/public/data/food.json';
import pets from '@/public/data/pets.json';
import toys from '@/public/data/toys.json';

import { foodMismatches, petMismatches, toyMismatches } from './mismatch';

export type ItemType = 'pets' | 'food' | 'toys';
/**
 * Get the image url of the item
 * @param type - type of the item
 * @param name - name of the item or id of the item
 * @returns
 */
export const getUrl = (type: ItemType, name: string | number) => {
    let folder = '';
    let filename = '';
    let itemName = name;
    // * If the name is a number, it is the id of the item
    if (typeof name === 'number') {
        const file = type === 'pets' ? pets : type === 'food' ? food : toys;
        const minion = file.find((item) => item.Id === name.toString());
        if (minion) {
            itemName = minion.Name;
        } else {
            itemName = 'Not Found';
        }
    } else {
        itemName = name;
    }
    switch (type) {
        case 'pets':
            folder = 'Pets';
            // !Apply mismatch patch
            if (
                petMismatches?.[itemName as keyof typeof petMismatches] !==
                undefined
            ) {
                filename =
                    petMismatches[itemName as keyof typeof petMismatches];
                if (filename === 'Not found')
                    return '/data/images/NotFound.webp';
            } else {
                filename = itemName;
            }
            break;
        case 'food':
            folder = 'Food';
            // !Apply mismatch patch
            if (
                foodMismatches?.[itemName as keyof typeof foodMismatches] !==
                undefined
            ) {
                filename =
                    foodMismatches[itemName as keyof typeof foodMismatches];
                if (filename === 'Not found')
                    return '/data/images/NotFound.webp';
            } else {
                filename = itemName;
            }
            break;
        case 'toys':
            folder = 'Toys';
            // !Apply mismatch patch
            if (
                toyMismatches?.[itemName as keyof typeof toyMismatches] !==
                undefined
            ) {
                filename =
                    toyMismatches[itemName as keyof typeof toyMismatches];
                if (filename === 'Not found')
                    return '/data/images/NotFound.webp';
            } else {
                filename = 'Relic' + itemName;
            }

            break;
    }
    filename = filename.replace(/ /g, '').replace(/[^a-zA-Z0-9]/g, '');
    return `/data/images/${folder}/${filename}.webp`;
};

export type ItemDetail<T extends ItemType> = T extends 'pets'
    ? (typeof pets)[number]
    : T extends 'food'
      ? (typeof food)[number]
      : T extends 'toys'
        ? (typeof toys)[number]
        : never;

export const getItemDetails = <T extends ItemType>(
    type: T,
    id: string,
): ItemDetail<T> | undefined => {
    const file = type === 'pets' ? pets : type === 'food' ? food : toys;
    return file.find((item) => item.Id === id) as ItemDetail<T>;
};

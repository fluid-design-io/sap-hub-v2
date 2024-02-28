import { getUrl } from '@/lib/get-item-public-url';
import food from '@/public/data/food.json';
import pets from '@/public/data/pets.json';
import { Tables } from '@/types/database';
import { Pack } from '@/types/sap-type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PackViewer = ({ pack }: { pack: Pick<Tables<'packs'>, 'code'> }) => {
    const code = pack.code as unknown as Pack;
    const minions = code?.Minions || [];
    const spells = code?.Spells || [];

    // total 6 tiers, each tier has 10 minions and (2 spells for tier 1, 3 spells for rest)
    // create a list of 6 minions and 6 spells
    const getMinionTier = (tier: number) => {
        // filter minions by tier using pets.json
        return pets.filter(
            (pet) => pet.Tier === tier && minions.includes(Number(pet.Id)),
        );
    };
    const getSpellTier = (tier: number) => {
        // filter spells by tier using food.json
        return food.filter(
            (food) => food.Tier === tier && spells.includes(Number(food.Id)),
        );
    };
    return (
        <>
            {Array.from({ length: 6 }, (_, i) => i + 1).map((tier) => (
                <div
                    key={tier}
                    className="flex flex-wrap items-end justify-start gap-4"
                >
                    <div>
                        <h4 className="text-lg font-bold">Tier {tier}</h4>
                        <ul className="flex flex-wrap gap-2">
                            {getMinionTier(tier)?.map((minion) => (
                                <li
                                    key={minion.Id}
                                    className="flex flex-shrink-0 items-center gap-2"
                                    title={`${minion.Name}: ${minion.Attack} ATK, ${minion.Health} HP`}
                                >
                                    <Link
                                        href={`/pets/${minion.Id}`}
                                        scroll={false}
                                    >
                                        <Image
                                            src={getUrl('pets', minion.Name)}
                                            width={64}
                                            height={64}
                                            className="size-12 sm:size-8 md:size-10 lg:size-11"
                                            alt={`${minion.Name}`}
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <ul className="flex gap-2">
                        {getSpellTier(tier)?.map((spell) => (
                            <li
                                key={spell.Id}
                                className="flex items-center gap-2"
                                title={`${spell.Name}: ${spell.Ability}`}
                            >
                                <Link href={`/food/${spell.Id}`} scroll={false}>
                                    <Image
                                        src={getUrl('food', spell.Name)}
                                        width={64}
                                        height={64}
                                        className="size-12 sm:size-8 md:size-10 lg:size-11"
                                        alt={`${spell.Name}`}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
};

export default PackViewer;

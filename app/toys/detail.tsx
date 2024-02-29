import DotGrid from '@/components/icon/dot-grid';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getUrl } from '@/lib/get-item-public-url';
import { cn } from '@/lib/utils';
import { Tables } from '@/types/database';
import { createClient } from '@/utils/supabase/client';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

type DetailProps = {
    id: string;
    imageClassName?: string;
};

const dice = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

async function Detail({ id, imageClassName }: DetailProps) {
    const supabase = createClient();
    const { data } = await supabase
        .from('toys')
        .select('*')
        .match({ id })
        .maybeSingle();
    if (!data) return notFound();
    const { data: overview } = await supabase
        .from('overview')
        .select('Archetype, Trigger, Roles')
        .match({
            Name: data.name,
        })
        .maybeSingle();
    const abilities = data.abilities as any;
    const getAbility = (about: string) => {
        const [ability, ...rest] = about.split(':');
        const withAbility = rest.length ? <> &rarr;</> : '';
        return (
            <>
                <strong className="font-bold text-card-foreground">
                    {ability}
                    {withAbility}
                </strong>
                {rest.join(' ')}
            </>
        );
    };
    const getToyType = (type: number) => {
        if (type === 0) return <Badge variant="active">Friendly Toy</Badge>;
        if (type === 1) return <Badge variant="destructive">Bad Toy</Badge>;
        return null;
    };
    return (
        <div className="flex w-full flex-col items-center justify-center gap-6 px-6">
            <div
                className={cn(
                    'relative isolate -mx-6 flex aspect-[4/2.5] w-[calc(100%+3rem)] max-w-lg items-center justify-center overflow-hidden bg-zinc-50/30 px-6 py-8 backdrop-blur-lg',
                    imageClassName,
                )}
            >
                <DotGrid
                    width={20}
                    height={12.5}
                    className="absolute inset-0 z-[-1] ml-3 mt-1.5 fill-primary-foreground/10"
                    fill="inherit"
                />
                <Image
                    src={getUrl('toys', data.name)}
                    alt={data.name}
                    width={200}
                    height={200}
                    className="w-full max-w-48 animate-fade-up animate-duration-500"
                />
            </div>
            <Card className="relative w-full max-w-2xl">
                <CardContent className="pt-8">
                    {/* Overview */}
                    <div className="absolute -inset-x-3 -top-3 flex items-center justify-between gap-6">
                        {/* Tier Dice */}
                        {dice[data.tier - 1] &&
                            React.createElement(dice[data.tier - 1], {
                                className:
                                    'bg-white size-8 text-black border-2 border-black rounded-md rotate-[-4.5deg]',
                            })}
                        <div className="flex items-center gap-4">
                            {overview?.Archetype && (
                                <Badge variant="card">
                                    {overview.Archetype}
                                </Badge>
                            )}
                            {overview?.Trigger && (
                                <Badge variant="secondary">
                                    {overview.Trigger}
                                </Badge>
                            )}
                            {overview?.Roles && (
                                <Badge variant="destructive">
                                    {overview.Roles}
                                </Badge>
                            )}
                            {getToyType(data?.toy_type)}
                        </div>
                    </div>
                    <ul className="space-y-4">
                        {abilities &&
                            abilities.map((ability: any, index: number) => (
                                <li
                                    key={`${ability.name}-${index}`}
                                    className="flex items-center gap-2"
                                >
                                    <div className="text-stroke min-w-12 flex-shrink-0 font-lapsus text-2xl font-bold tracking-[-0.18rem]">
                                        <span className="text-white">L</span>{' '}
                                        <span className="text-secondary">
                                            {ability.Level}
                                        </span>
                                    </div>
                                    <div className="text-card-foreground/80">
                                        {getAbility(ability.About)}
                                    </div>
                                </li>
                            ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}

export default Detail;

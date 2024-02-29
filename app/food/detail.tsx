import AttackIcon from '@/components/icon/attack';
import DotGrid from '@/components/icon/dot-grid';
import HealthIcon from '@/components/icon/health';
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
        .from('food')
        .select('*')
        .eq('id', id)
        .maybeSingle();
    if (!data) return notFound();
    const { data: overview } = await supabase
        .from('overview')
        .select('Archetype, Trigger, Roles, Effect')
        .match({
            Name: data.name,
        })
        .maybeSingle();
    const ability = data.ability;
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
                    src={getUrl('food', data.name)}
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
                        </div>
                    </div>
                    <p>{getAbility(ability)}</p>
                    <p className="text-card-foreground/75">
                        {overview?.Effect}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export default Detail;

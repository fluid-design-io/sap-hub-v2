/* 
  Ability: string;
  Id: string;
  Name: string;
  Tier: number;
  Packs: string[];
  PacksRequired: string[];
  Rollable?: boolean;
  PerkNote?: string; */
import { Tables } from '@/types/database';
import { Toy } from '@/types/sap-type';

import { createClient } from '../admin';

export const upsertToys = async (items: Toy[]) => {
    const supabase = createClient();
    // transform keys to snake_case
    const transformed: Tables<'toys'>[] = items.map((item) => ({
        id: item.Id,
        name: item.Name,
        tier: item.Tier,
        packs: item.Packs,
        packs_required: item.PacksRequired,
        rollable: !!item.Rollable,
        abilities: item.Abilities as any,
        attack: item.Attack,
        health: item.Health,
        type: item.Type,
        tier_max: item.TierMax,
        toy_type: item.ToyType,
    }));

    const { data, error } = await supabase.from('toys').upsert(transformed, {
        onConflict: 'id',
    });
    if (error) throw error;
    return data;
};

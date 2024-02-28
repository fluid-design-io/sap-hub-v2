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
import { Food } from '@/types/sap-type';

import { createClient } from '../admin';

export const upsertFood = async (items: Food[]) => {
    const supabase = createClient();
    // transform keys to snake_case
    const transformed: Tables<'food'>[] = items.map((item) => ({
        id: item.Id,
        name: item.Name,
        tier: item.Tier,
        packs: item.Packs,
        packs_required: item.PacksRequired,
        rollable: !!item.Rollable,
        ability: item.Ability,
    }));

    const { data, error } = await supabase.from('food').upsert(transformed, {
        onConflict: 'id',
    });
    if (error) throw error;
    return data;
};

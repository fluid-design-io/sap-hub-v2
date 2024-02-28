import { Tables } from '@/types/database';
import { Pet } from '@/types/sap-type';

import { createClient } from '../admin';

export const upsertPets = async (pets: Pet[]) => {
    const supabase = createClient();
    // transform keys to snake_case
    const petsTransformed: Tables<'pets'>[] = pets.map((pet) => ({
        id: pet.Id,
        attack: pet.Attack,
        health: pet.Health,
        abilities: pet.Abilities as any,
        name: pet.Name,
        tier: pet.Tier,
        tier_max: pet.TierMax,
        packs: pet.Packs,
        packs_required: pet.PacksRequired,
        rollable: !!pet.Rollable,
        perk_note: pet.PerkNote || null,
    }));

    const { data, error } = await supabase
        .from('pets')
        .upsert(petsTransformed, {
            onConflict: 'id',
        });
    if (error) throw error;
    return data;
};

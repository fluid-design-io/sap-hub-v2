/* 
    --- Seed data for SAP for all the pets, food, and toys ---
*/
import food from '@/public/data/food.json';
import pets from '@/public/data/pets.json';
import toys from '@/public/data/toys.json';
import { upsertFood } from '@/utils/supabase/seed/food';
import { upsertPets } from '@/utils/supabase/seed/pets';
import { upsertToys } from '@/utils/supabase/seed/toys';

import { upsertOverview } from '../utils/supabase/seed/upsert-overview';

const main = async () => {
    try {
        await upsertOverview().then(() =>
            console.log('✅ ===> Overview Uploaded\n'),
        );
        await upsertPets(pets).then(() =>
            console.log('✅ ===> Pets Uploaded\n'),
        );
        await upsertFood(food).then(() =>
            console.log('✅ ===> Food Uploaded\n'),
        );
        await upsertToys(toys).then(() =>
            console.log('✅ ===> Toys Uploaded\n'),
        );
    } catch (error) {
        console.error(error);
    }
};

main().then(() => console.log('🟢 seed-sap-data completed'));

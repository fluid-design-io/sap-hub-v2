import fs from 'fs';
import path from 'path';

import { createClient } from '../admin';

export const upsertOverview = async () => {
    const supabase = createClient();
    // remove all rows from overview
    const { error: deleteError } = await supabase
        .from('overview')
        .delete()
        .neq('Name', "doesn't exist");
    if (deleteError) throw deleteError;
    // get overview.csv from public/data/overview.csv
    const overview = fs.readFileSync(
        path.join(process.cwd(), 'public/data/overview.csv'),
        'utf8',
    );
    const SEP = ';';
    const rows = overview.split('\n');
    const headers = rows[0].split(SEP);
    const data = rows
        .slice(1)
        .map((row) => {
            const obj = {} as any;
            row.split(SEP).forEach((cell, i) => {
                // convert to number if possible
                obj[headers[i]] = !!cell
                    ? isNaN(Number(cell))
                        ? cell
                        : Number(cell)
                    : null;
            });
            return obj;
        })
        // filter out empty rows where `Name` is null
        .filter((row) => row.Name);
    if (!data) throw new Error('No data found in overview.csv');
    const { error } = await supabase.from('overview').upsert(data);
    if (error) throw error;
};

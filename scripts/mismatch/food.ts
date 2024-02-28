import food from '@/public/data/food.json';
import fs from 'fs';
import path from 'path';

type Mapping = {
    [key: string]: string;
};

// Sample JSON data and filenames
const jsonData = food.map((food) => ({ name: food.Name }));

const fileNames = fs.readdirSync(
    path.join(process.cwd(), 'public/data/images/Food'),
);

// Function to normalize names for comparison
const normalizeName = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '').replace('.webp', '');
};

// Function to find mismatches between JSON data names and filenames
const findMismatches = (
    jsonData: { name: string }[],
    fileNames: string[],
): Mapping => {
    const normalizedFileNames = fileNames.map((fileName) =>
        normalizeName(fileName),
    );
    console.log('normalizedFileNames', normalizedFileNames);
    const mismatches: Mapping = {};

    jsonData.forEach((jsonItem) => {
        const jsonNameNormalized = normalizeName(jsonItem.name);
        if (!normalizedFileNames.includes(jsonNameNormalized)) {
            // Attempt to find a close match in file names to suggest a mapping
            const potentialFileName = fileNames.find((fileName) =>
                normalizeName(fileName).includes(jsonNameNormalized),
            );
            Object.assign(mismatches, {
                [jsonItem.name]:
                    potentialFileName?.replace('.webp', '') || 'Not found',
            });
        }
    });

    return mismatches;
};

// Usage
const mismatches = findMismatches(jsonData, fileNames);

// Output the mismatches to console or use as needed
console.log(`⚡️ Found ${mismatches.length} mismatches\n`);
console.log('Mismatches:', JSON.stringify(mismatches, null, 2));

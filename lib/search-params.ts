// source: https://cgarethc.medium.com/using-react-router-searchparams-to-manage-filter-state-for-a-list-e515e8e50166
import { ReadonlyURLSearchParams } from 'next/navigation';

/**
 * Search params are held as an array of two elements arrays where member 0 is the key and member 1 is value
 * This function extracts the values into a more usable object
 * The values are converted to arrays
 * Eg:
 * ?filter=1,2&a=not-changed
 *  => { filter: [1, 2], a: ['not-changed'] }
 * @param {URLSearchParams} searchParams
 */
export function extractExistingParams(searchParams: ReadonlyURLSearchParams) {
    const entries = Array.from(searchParams.entries());
    return entries.reduce((acc: { [key: string]: any }, a) => {
        const [key, value] = a;
        if (acc[key]) {
            // we need to split first, then push
            acc[key] = acc[key].split(',').concat(value);
        } else {
            acc[key] = value.split(',');
        }
        return acc;
    }, {});
}

/**
 * Append a value to an existing parameter
 * If the parameter does not exist, it is created
 * If the value already exists, it is removed
 *
 * **Note:** It also removes `page` from searchParams to avoid fetching *out of range* data
 *
 * Eg:
 * ?filter=1&a=not-changed
 * createQueryFilter('filter', '2') => ?filter=1,2&a=not-changed
 * createQueryFilter('filter', '1') => ?filter=2&a=not-changed
 */
export function createQueryFilter(
    searchParams: ReadonlyURLSearchParams,
    key: string,
    value: string,
    reset: boolean = false,
) {
    const existingParams = extractExistingParams(searchParams);
    if (reset) {
        // remove the key
        delete existingParams[key];
        return new URLSearchParams(existingParams).toString();
    }
    if (existingParams[key]) {
        // remove 'all' if it exists
        if (existingParams[key].includes('all')) {
            existingParams[key] = existingParams[key].filter((v: string) => {
                return v !== 'all';
            });
        }
        if (existingParams[key].includes(value)) {
            existingParams[key] = existingParams[key].filter((v: string) => {
                return v !== value;
            });
        } else {
            existingParams[key].push(value);
        }
    } else {
        existingParams[key] = [value];
    }
    // remove page from searchParams
    delete existingParams['page'];
    return new URLSearchParams(existingParams).toString();
}

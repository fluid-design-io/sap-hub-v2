'use server';

import { createClient } from './server';

/**
 * Helper functino to recursively remove a folder and its contents from storage
 * @param bucket
 * @param folder
 * @returns - true if successful
 */
export const removeFolder = async (bucket: string, folder: string) => {
    const supabase = createClient();
    const { data: list, error } = await supabase.storage
        .from(bucket)
        .list(folder);
    if (error) {
        console.error('Error deleting storage', error);
        throw error;
    }
    if (!list) return;
    const filesToRemove = list.map((x) => `${folder}/${x.name}`);

    const { error: deleteFilesError } = await supabase.storage
        .from(bucket)
        .remove(filesToRemove);
    if (deleteFilesError) {
        console.error('Error deleting storage', deleteFilesError);
        throw deleteFilesError;
    }
    // delete the folder
    const { error: deleteFolderError } = await supabase.storage
        .from(bucket)
        .remove([folder]);
    if (deleteFolderError) {
        console.error('Error deleting storage', deleteFolderError);
        throw deleteFolderError;
    }
    return true;
};

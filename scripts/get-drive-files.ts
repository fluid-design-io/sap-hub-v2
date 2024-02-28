export type DriveFile = {
    kind: string;
    mimeType: string;
    id: string;
    name: string;
};

export const getDriveFiles = async (folderId: string) => {
    const data = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${process.env.GOOGLE_DRIVE_API_KEY}`,
        {
            method: 'GET',
            cache: 'no-store',
        },
    ).then((response) => response.json());
    return data;
};

export const getDriveContent = async (fileId: string) => {
    return fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&keyy=${process.env.GOOGLE_DRIVE_API_KEY}`,
        {
            method: 'GET',
            cache: 'no-store',
        },
    );
};

export const getLatestSapVersion = async () => {
    const sapVersions = await getDriveFiles(
        '19UIKpkTl3zz2_qYGw1NYt8kDq1BrXK66',
    );
    // sort the versions
    const latestVersion = sapVersions.files
        .sort((a: any, b: any) => {
            const aVersion = a.name.split('.').map(Number);
            const bVersion = b.name.split('.').map(Number);
            for (let i = 0; i < aVersion.length; i++) {
                if (aVersion[i] === bVersion[i]) {
                    continue;
                }
                return aVersion[i] - bVersion[i];
            }
            return 0;
        })
        .pop();

    const latestVersionFiles = await getDriveFiles(latestVersion.id);
    return {
        version: latestVersion.name,
        files: latestVersionFiles.files,
    };
};

type DecodeAs = 'json' | 'text';
export type FileToFetch = {
    name: SapFile;
    decodeAs: DecodeAs;
};

export enum SapFile {
    Pets = 'pets.json',
    Food = 'food.json',
    Toys = 'toys.json',
    Overview = 'overview.csv',
    Rebalance = 'rebalance.txt',
}

const filesToFetch: FileToFetch[] = [
    {
        name: SapFile.Pets,
        decodeAs: 'json',
    },
    {
        name: SapFile.Food,
        decodeAs: 'json',
    },
    {
        name: SapFile.Toys,
        decodeAs: 'json',
    },
    {
        name: SapFile.Overview,
        decodeAs: 'text',
    },
    {
        name: SapFile.Rebalance,
        decodeAs: 'text',
    },
];

export const getLatestSapFiles = async ({ files }: { files: any }) => {
    try {
        console.log(`🟢 processing ${filesToFetch.length} files`);
        const data = await Promise.all(
            filesToFetch.map(async (file) => {
                console.log(`🟢 processing ${file.name}`);
                const fileData = files.find((f: any) => f.name === file.name);
                if (fileData) {
                    console.log(
                        `url: https://www.googleapis.com/drive/v3/files/${fileData.id}?alt=media&key=${process.env.GOOGLE_DRIVE_API_KEY}`,
                    );
                    const response = await getDriveContent(fileData.id);
                    const data = await response[file.decodeAs]();
                    return { name: file.name, data };
                }
                return null;
            }),
        );
        return data;
    } catch (error) {
        console.error('[getLatestSapFiles]', error);
        return null;
    }
};

import PackEditor from '@/components/site/pack/pack-editor';
import { useUserPack } from '@/provider/user-pack-provider';
import { Edit2, XIcon } from 'lucide-react';
import React from 'react';

export const EditPackButton = () => {
    const { user, pack } = useUserPack();
    if (!user) return null;
    return (
        <PackEditor
            defaultValues={{
                title: pack.title,
                packCode: JSON.stringify(pack.code),
                packDescription: pack.description,
                archetype: pack.archetype,
            }}
            id={pack.id}
        />
    );
};

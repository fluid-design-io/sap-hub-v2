import { useUserPack } from '@/provider/user-pack-provider';
import React from 'react';

export const PackDescription = () => {
    const { user, pack } = useUserPack();
    if (user && user.id !== pack.user_id) return null;
    if (!pack?.description) return null;
    return (
        <p className="line-clamp-4 text-card-foreground">{pack.description}</p>
    );
};

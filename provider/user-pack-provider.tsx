import { Tables } from '@/types/database';
import { User } from '@/types/types';
import React, { createContext, useContext } from 'react';

type UserPackContextType = {
    user: User | null | undefined;
    pack: Tables<'packs'>;
};
type UserPackProviderProps = {
    children: React.ReactNode;
} & UserPackContextType;

// This type explicitly defines what the context will provide to consumers.

const UserPackContext = createContext<UserPackContextType | null>(null);

export const useUserPack = () => {
    const context = useContext(UserPackContext);
    if (!context) {
        throw new Error('useUserPack must be used within a UserPackProvider');
    }
    return context;
};

export const UserPackProvider = ({
    user,
    pack,
    children,
}: UserPackProviderProps) => {
    // The value provided to the context consumers includes only the user and pack, not children.
    const value = { user, pack };

    return (
        <UserPackContext.Provider value={value}>
            {children}
        </UserPackContext.Provider>
    );
};

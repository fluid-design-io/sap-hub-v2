export interface Pet {
    Attack: number;
    Health: number;
    Abilities: Ability[];
    Id: string;
    Name: string;
    Tier: number;
    TierMax: number;
    Packs: string[];
    PacksRequired: string[];
    Rollable?: boolean;
    PerkNote?: string;
}

export interface Ability {
    Level: number;
    About: string;
}

export interface Food {
    Ability: string;
    Id: string;
    Name: string;
    Tier: number;
    Packs: string[];
    PacksRequired: string[];
    Rollable?: boolean;
    PerkNote?: string;
}

export interface Toy {
    Attack: number;
    Health: number;
    Abilities: Ability[];
    Type: number;
    ToyType: number;
    Id: string;
    Name: string;
    Tier: number;
    TierMax: number;
    Packs: any[];
    PacksRequired: any[];
    Rollable: boolean;
    PerkNote?: string;
}

export interface Pack {
    Title: string;
    Minion: number;
    Minions: number[];
    Spells: number[];
}

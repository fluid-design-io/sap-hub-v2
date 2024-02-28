export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      daily_spotlight: {
        Row: {
          food_id: string
          food_name: string
          food_tier: number
          id: number
          pet_id: string
          pet_name: string
          pet_tier: number
          toy_id: string
          toy_name: string
          toy_tier: number
        }
        Insert: {
          food_id: string
          food_name: string
          food_tier: number
          id: number
          pet_id: string
          pet_name: string
          pet_tier: number
          toy_id: string
          toy_name: string
          toy_tier: number
        }
        Update: {
          food_id?: string
          food_name?: string
          food_tier?: number
          id?: number
          pet_id?: string
          pet_name?: string
          pet_tier?: number
          toy_id?: string
          toy_name?: string
          toy_tier?: number
        }
        Relationships: [
          {
            foreignKeyName: "daily_spotlight_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "food"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_spotlight_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_spotlight_toy_id_fkey"
            columns: ["toy_id"]
            isOneToOne: false
            referencedRelation: "toys"
            referencedColumns: ["id"]
          }
        ]
      }
      food: {
        Row: {
          ability: string
          id: string
          name: string
          packs: string[] | null
          packs_required: string[] | null
          rollable: boolean
          tier: number
        }
        Insert: {
          ability: string
          id: string
          name: string
          packs?: string[] | null
          packs_required?: string[] | null
          rollable: boolean
          tier: number
        }
        Update: {
          ability?: string
          id?: string
          name?: string
          packs?: string[] | null
          packs_required?: string[] | null
          rollable?: boolean
          tier?: number
        }
        Relationships: []
      }
      overview: {
        Row: {
          Archetype: Database["public"]["Enums"]["overview_archetype"] | null
          created_at: string
          Effect: string | null
          id: number
          Name: string
          Ownership: string
          Packs: string
          Released: boolean
          Roles: Database["public"]["Enums"]["overview_role"] | null
          Tier: string
          Trigger: string | null
          Type: Database["public"]["Enums"]["overview_type"]
        }
        Insert: {
          Archetype?: Database["public"]["Enums"]["overview_archetype"] | null
          created_at?: string
          Effect?: string | null
          id?: number
          Name: string
          Ownership: string
          Packs: string
          Released?: boolean
          Roles?: Database["public"]["Enums"]["overview_role"] | null
          Tier: string
          Trigger?: string | null
          Type: Database["public"]["Enums"]["overview_type"]
        }
        Update: {
          Archetype?: Database["public"]["Enums"]["overview_archetype"] | null
          created_at?: string
          Effect?: string | null
          id?: number
          Name?: string
          Ownership?: string
          Packs?: string
          Released?: boolean
          Roles?: Database["public"]["Enums"]["overview_role"] | null
          Tier?: string
          Trigger?: string | null
          Type?: Database["public"]["Enums"]["overview_type"]
        }
        Relationships: []
      }
      packs: {
        Row: {
          archetype: Database["public"]["Enums"]["overview_archetype"][] | null
          code: Json
          copy_count: number
          created_at: string
          description: string | null
          id: string
          minion: number
          title: string
          user_id: string
        }
        Insert: {
          archetype?: Database["public"]["Enums"]["overview_archetype"][] | null
          code: Json
          copy_count?: number
          created_at?: string
          description?: string | null
          id?: string
          minion: number
          title: string
          user_id?: string
        }
        Update: {
          archetype?: Database["public"]["Enums"]["overview_archetype"][] | null
          code?: Json
          copy_count?: number
          created_at?: string
          description?: string | null
          id?: string
          minion?: number
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "packs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      pets: {
        Row: {
          abilities: Json
          attack: number
          health: number
          id: string
          name: string
          packs: string[]
          packs_required: string[]
          perk_note: string | null
          rollable: boolean
          tier: number
          tier_max: number
        }
        Insert: {
          abilities: Json
          attack: number
          health: number
          id: string
          name: string
          packs: string[]
          packs_required: string[]
          perk_note?: string | null
          rollable: boolean
          tier: number
          tier_max: number
        }
        Update: {
          abilities?: Json
          attack?: number
          health?: number
          id?: string
          name?: string
          packs?: string[]
          packs_required?: string[]
          perk_note?: string | null
          rollable?: boolean
          tier?: number
          tier_max?: number
        }
        Relationships: []
      }
      toys: {
        Row: {
          abilities: Json
          attack: number
          health: number
          id: string
          name: string
          packs: Json
          packs_required: Json
          rollable: boolean
          tier: number
          tier_max: number
          toy_type: number
          type: number
        }
        Insert: {
          abilities: Json
          attack: number
          health: number
          id: string
          name: string
          packs: Json
          packs_required: Json
          rollable: boolean
          tier: number
          tier_max: number
          toy_type: number
          type: number
        }
        Update: {
          abilities?: Json
          attack?: number
          health?: number
          id?: string
          name?: string
          packs?: Json
          packs_required?: Json
          rollable?: boolean
          tier?: number
          tier_max?: number
          toy_type?: number
          type?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      gen_spotlight_items: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      increment_pack_count: {
        Args: {
          amount: number
          row_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      overview_archetype:
        | "Mana"
        | "Diva"
        | "Standard"
        | "Ailer"
        | "Cycler"
        | "Perky"
        | "Roller"
        | "Summoner"
        | "Toys"
        | "Bacta"
        | "Leveler"
        | "Trumpet"
        | "Strawberry"
        | "Banker"
        | "Foodie"
        | "Pusher"
        | "Guard"
        | "Cutter"
      overview_role:
        | "Enabler"
        | "Tempo"
        | "Tech"
        | "Scaler"
        | "Pivot"
        | "Carry"
        | "Comeback"
        | "Scaler Tempo"
        | "Scaler Pivot"
      overview_type: "Pet" | "Food"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never


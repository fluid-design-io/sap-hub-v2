WITH inserted_user AS (
    INSERT INTO
        auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            phone,
            encrypted_password,
            email_confirmed_at,
            recovery_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        )
    VALUES
        (
            '00000000-0000-0000-0000-000000000000' :: uuid,
            uuid_generate_v4(),
            'authenticated',
            'authenticated',
            'user@example.com',
            '',
            crypt('password', gen_salt('bf')),
            current_timestamp,
            current_timestamp,
            current_timestamp,
            '{"provider":"email","providers":["email"]}' :: jsonb,
            '{}' :: jsonb,
            current_timestamp,
            current_timestamp,
            '',
            '',
            '',
            ''
        ) RETURNING id AS user_id
),
pack_data AS (
    SELECT
        'Pack ' || gs.series_value AS title,
        gs.series_value AS minion,
        iu.user_id
    FROM
        generate_series(1, 50) AS gs(series_value),
        inserted_user AS iu
)
INSERT INTO
    packs (
        title,
        description,
        minion,
        user_id,
        copy_count,
        code,
        archetype
    )
SELECT
    pd.title,
    '',
    -- Same description for all
    pd.minion,
    pd.user_id,
    0,
    -- Same copy_count for all
    '{"Title":"Pack 1","Minion":639,"Spells":[161,155,147,92,100,150,38,29,4,86,23,84,125,154,166,21,31],"Minions":[3,26,184,611,377,626,204,187,0,76,210,263,376,639,345,610,74,33,97,171,360,91,214,173,150,195,93,56,80,175,630,231,15,46,96,146,359,202,261,333,248,78,123,636,339,623,635,374,375,350,266,11,387,142,194,117,77,41,34,32]}' :: jsonb,
    -- Example static code, adjust as needed
    ARRAY ['Standard', 'Mana'] :: overview_archetype []
FROM
    pack_data AS pd;
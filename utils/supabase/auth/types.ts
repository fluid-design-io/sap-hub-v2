import { Database, Tables } from '@/types/database';

/**
 * It is strongly advised that authenticators get their own DB
 * table, ideally with a foreign key to a specific UserModel.
 *
 * "SQL" tags below are suggestions for column data types and
 * how best to store data received during registration for use
 * in subsequent authentications.
 */
type Authenticator_Raw = {
    // SQL: Encode to base64url then store as `TEXT`. Index this column
    credential_id: Uint8Array;
    // SQL: Store raw bytes as `BYTEA`/`BLOB`/etc...
    credential_public_key: Uint8Array;
    // SQL: Consider `BIGINT` since some authenticators return atomic timestamps as counters
    counter: number;
    // SQL: `VARCHAR(32)` or similar, longest possible value is currently 12 characters
    // Ex: 'singleDevice' | 'multiDevice'
    credential_device_type: CredentialDeviceType;
    // SQL: `BOOL` or whatever similar type is supported
    credential_backed_up: boolean;
    // SQL: `VARCHAR(255)` and store string array as a CSV string
    // Ex: ['usb' | 'ble' | 'nfc' | 'internal']
    transports?: AuthenticatorTransport[];
};

export type Authenticator = Tables<
    {
        schema: 'passkey';
    },
    'authenticators'
>;

export type CredentialDeviceType = 'singleDevice' | 'multiDevice';

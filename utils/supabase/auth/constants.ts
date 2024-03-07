// Human-readable title for your website
export const rpName = 'Saphub WebAuthn'
// A unique identifier for your website
export const rpID = process.env.NODE_ENV === 'production' ? 'saphub.vercel.app' : 'localhost'
// The URL at which registrations and authentications should occur
export const origin =
  process.env.NODE_ENV === 'production' ? 'https://saphub.vercel.app' : 'http://localhost:8080'

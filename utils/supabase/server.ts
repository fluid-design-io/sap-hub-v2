import { Database } from '@/types/database'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { cache } from 'react'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        },
      },
    }
  )
}

// React Cache: https://react.dev/reference/react/cache
// Caches the session retrieval operation. This helps in minimizing redundant calls
// across server components for the same session data.
export const getSession = cache(async () => {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) return null
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error:', error)
    return null
  }
})

export const getUserDetails = cache(async () => {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return { user: null }
  }
  const userId = session.user.id
  try {
    const { data: userDetails } = await supabase
      .from('users')
      .select('*')
      .match({ id: userId })
      .single()
    return { user: userDetails }
  } catch (error) {
    console.error('🟠 Error:', error)
    return { user: null }
  }
})

import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL?.trim()
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

export const supabaseConfigured = Boolean(url && anonKey)

/** Client só existe quando há `.env` com as variáveis VITE_* — nos hooks fazemos fallback aos mocks. */
export const supabase = supabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null

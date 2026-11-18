import { createClient, SupabaseClient } from '@supabase/supabase-js';

const envMeta = (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: Record<string, string | undefined> }).env) || {};

const supabaseUrl =
  envMeta.VITE_SUPABASE_URL ||
  envMeta.NEXT_PUBLIC_SUPABASE_URL ||
  '';

const supabaseAnonKey =
  envMeta.VITE_SUPABASE_ANON_KEY ||
  envMeta.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('YOUR_PROJECT_REF') &&
    !supabaseAnonKey.includes('YOUR_SUPABASE_ANON_KEY')
);

let clientInstance: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  });
}

export const supabase = clientInstance;

export function getSupabaseClient(): SupabaseClient | null {
  return clientInstance;
}

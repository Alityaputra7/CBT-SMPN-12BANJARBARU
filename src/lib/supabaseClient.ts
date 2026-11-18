import { createClient, SupabaseClient } from '@supabase/supabase-js';

const envMeta = (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: Record<string, string | undefined> }).env) || {};

const rawSupabaseUrl = (
  envMeta.VITE_SUPABASE_URL ||
  envMeta.NEXT_PUBLIC_SUPABASE_URL ||
  ''
).trim();

const rawSupabaseAnonKey = (
  envMeta.VITE_SUPABASE_ANON_KEY ||
  envMeta.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  ''
).trim();

function isValidHttpUrl(value: string): boolean {
  if (!value || value.includes('YOUR_PROJECT_REF')) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

const hasValidConfig =
  isValidHttpUrl(rawSupabaseUrl) &&
  Boolean(rawSupabaseAnonKey) &&
  !rawSupabaseAnonKey.includes('YOUR_SUPABASE_ANON_KEY');

let clientInstance: SupabaseClient | null = null;

if (hasValidConfig) {
  try {
    clientInstance = createClient(rawSupabaseUrl, rawSupabaseAnonKey, {
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
  } catch (err) {
    console.warn('[Supabase] Gagal menginisialisasi client Supabase, beralih ke mode fallback server lokal:', err);
    clientInstance = null;
  }
} else if (rawSupabaseUrl && !isValidHttpUrl(rawSupabaseUrl)) {
  console.warn(
    `[Supabase] VITE_SUPABASE_URL tidak valid ("${rawSupabaseUrl.slice(0, 24)}..."). Harus berupa URL https://....supabase.co.`
  );
}

export const isSupabaseConfigured = Boolean(clientInstance);

export const supabase = clientInstance;

export function getSupabaseClient(): SupabaseClient | null {
  return clientInstance;
}

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const envMeta =
  (typeof import.meta !== 'undefined' &&
    (import.meta as unknown as { env?: Record<string, string | undefined> }).env) ||
  {};

const rawUrlInput = (
  envMeta.VITE_SUPABASE_URL ||
  envMeta.NEXT_PUBLIC_SUPABASE_URL ||
  ''
).trim();

const rawSupabaseUrl =
  rawUrlInput && !/^https?:\/\//i.test(rawUrlInput) && rawUrlInput.includes('.supabase.co')
    ? `https://${rawUrlInput}`
    : rawUrlInput;

const rawSupabaseAnonKey = (
  envMeta.VITE_SUPABASE_ANON_KEY ||
  envMeta.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  envMeta.VITE_SUPABASE_PUBLISHABLE_KEY ||
  envMeta.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
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

let configError: string | null = null;

if (!rawSupabaseUrl) {
  configError =
    'Environment variable VITE_SUPABASE_URL (atau NEXT_PUBLIC_SUPABASE_URL) belum diisi di Vercel / .env.';
} else if (!isValidHttpUrl(rawSupabaseUrl)) {
  configError = `VITE_SUPABASE_URL tidak valid ("${rawSupabaseUrl.slice(0, 32)}..."). Harus berupa URL https://<project-ref>.supabase.co.`;
} else if (!rawSupabaseAnonKey || rawSupabaseAnonKey.includes('YOUR_SUPABASE_ANON_KEY')) {
  configError =
    'Environment variable VITE_SUPABASE_ANON_KEY (atau NEXT_PUBLIC_SUPABASE_ANON_KEY) belum diisi.';
} else if (rawSupabaseAnonKey.startsWith('sb_secret_')) {
  configError =
    'VITE_SUPABASE_ANON_KEY berisi Secret Key (sb_secret_...). Ganti dengan Anon / Publishable Key (eyJ... atau sb_publishable_...) di Vercel.';
}

let clientInstance: SupabaseClient | null = null;

if (!configError) {
  try {
    clientInstance = createClient(rawSupabaseUrl, rawSupabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        fetch: (input, init) =>
          fetch(input, {
            ...init,
            cache: 'no-store',
          }),
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    });
  } catch (err) {
    configError = err instanceof Error ? err.message : 'Gagal menginisialisasi client Supabase.';
    console.warn('[Supabase] Gagal menginisialisasi client Supabase:', err);
    clientInstance = null;
  }
} else {
  console.warn(`[Supabase] ${configError}`);
}

export const isSupabaseConfigured = Boolean(clientInstance);
export const supabaseConfigError: string | null = configError;
export const supabase = clientInstance;

export function getSupabaseClient(): SupabaseClient | null {
  return clientInstance;
}

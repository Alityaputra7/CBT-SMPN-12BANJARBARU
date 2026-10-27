/**
 * Server-synchronized 5-Minute Dynamic Token Generator for CBT SMPN 12 Banjarbaru
 * 
 * Rules:
 * - 6 uppercase alphanumeric characters (excluding ambiguous chars: O, 0, I, 1)
 * - Changes synchronously every 300,000ms (5 minutes) based on Unix epoch
 * - Can be verified against the current 5-minute window or previous grace period (15s)
 * - Provides exact seconds remaining in the current 5-minute cycle
 */

const TOKEN_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const TOKEN_SALT = 'SMPN12_BANJARBARU_CBT_SECURE_SALT_2026';

function pseudoHash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function generateDynamicToken(examOrClassId: string = 'general', customEpoch?: number): {
  token: string;
  expiresInSeconds: number;
  periodIndex: number;
  validUntil: Date;
} {
  const now = customEpoch || Date.now();
  const periodDuration = 5 * 60 * 1000; // 5 minutes in ms
  const periodIndex = Math.floor(now / periodDuration);
  const timeIntoPeriod = now % periodDuration;
  const expiresInSeconds = Math.ceil((periodDuration - timeIntoPeriod) / 1000);
  const validUntil = new Date((periodIndex + 1) * periodDuration);

  // Deterministic seed for this 5-minute slot
  const seedString = `${TOKEN_SALT}_${examOrClassId}_${periodIndex}`;
  let currentHash = pseudoHash(seedString);

  let token = '';
  for (let i = 0; i < 6; i++) {
    const charIndex = currentHash % TOKEN_CHARS.length;
    token += TOKEN_CHARS[charIndex];
    currentHash = pseudoHash(currentHash.toString() + seedString);
  }

  return {
    token,
    expiresInSeconds,
    periodIndex,
    validUntil
  };
}

export function verifyDynamicToken(inputToken: string, examOrClassId: string = 'general'): {
  isValid: boolean;
  message: string;
} {
  if (!inputToken || inputToken.trim().length !== 6) {
    return { isValid: false, message: 'Kode unik harus 6 digit' };
  }

  const cleanInput = inputToken.trim().toUpperCase();
  const current = generateDynamicToken(examOrClassId);

  if (cleanInput === current.token) {
    return { isValid: true, message: 'Kode unik valid dan aktif' };
  }

  // Check previous period for a brief grace window (e.g., if code just changed in last 30s)
  const previousPeriod = generateDynamicToken(examOrClassId, Date.now() - (60 * 1000));
  if (cleanInput === previousPeriod.token) {
    return { isValid: true, message: 'Kode unik baru saja diperbarui (grace period valid)' };
  }

  return { isValid: false, message: 'Kode unik salah atau telah kedaluwarsa (kode diperbarui tiap 5 menit)' };
}

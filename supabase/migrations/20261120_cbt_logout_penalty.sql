-- ============================================================================
-- SMPN 12 SANANA - CBT FORCED LOGOUT PENALTY & AUTO-SUBMIT MIGRATION
-- Idempotent migration: safely adds `logout_count` (and ensures `lock_count`
-- & `unlock_cooldown_until` exist) on `public.cbt_exam_sessions`.
-- ============================================================================

ALTER TABLE public.cbt_exam_sessions
  ADD COLUMN IF NOT EXISTS logout_count INTEGER NOT NULL DEFAULT 0;

ALTER TABLE public.cbt_exam_sessions
  ADD COLUMN IF NOT EXISTS lock_count INTEGER NOT NULL DEFAULT 0;

ALTER TABLE public.cbt_exam_sessions
  ADD COLUMN IF NOT EXISTS unlock_cooldown_until BIGINT;

COMMENT ON COLUMN public.cbt_exam_sessions.logout_count IS
  'Number of times the student logged out during an active in_progress exam (1st = 5m cooldown, 2nd = 7m cooldown, 3rd = immediate auto-submit).';

COMMENT ON COLUMN public.cbt_exam_sessions.unlock_cooldown_until IS
  'Unix timestamp in milliseconds until which the student must wait (unlock cooldown or forced-logout cooldown) before resuming the exam.';

-- Ensure no NULL values exist in logout_count or lock_count for existing rows
UPDATE public.cbt_exam_sessions
SET logout_count = 0
WHERE logout_count IS NULL;

UPDATE public.cbt_exam_sessions
SET lock_count = 0
WHERE lock_count IS NULL;

-- Indexes for real-time Operator monitoring
CREATE INDEX IF NOT EXISTS idx_cbt_exam_sessions_logout_count
  ON public.cbt_exam_sessions (logout_count)
  WHERE logout_count > 0;

CREATE INDEX IF NOT EXISTS idx_cbt_exam_sessions_unlock_cooldown_until
  ON public.cbt_exam_sessions (unlock_cooldown_until)
  WHERE unlock_cooldown_until IS NOT NULL;

-- Preserve full access for client anon/authenticated roles used by CBT app
GRANT ALL ON TABLE public.cbt_exam_sessions TO anon, authenticated;

-- Prompt PostgREST schema cache reload so new columns are available immediately
NOTIFY pgrst, 'reload schema';

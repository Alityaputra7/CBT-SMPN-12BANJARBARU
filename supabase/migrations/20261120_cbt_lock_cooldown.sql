-- ============================================================================
-- SMPN 12 SANANA - CBT PROGRESSIVE LOCK COOLDOWN PENALTY MIGRATION
-- Idempotent migration: safely adds `lock_count` & `unlock_cooldown_until`
-- to `public.cbt_exam_sessions` without dropping or altering existing data.
-- ============================================================================

ALTER TABLE public.cbt_exam_sessions
  ADD COLUMN IF NOT EXISTS lock_count INTEGER NOT NULL DEFAULT 0;

ALTER TABLE public.cbt_exam_sessions
  ADD COLUMN IF NOT EXISTS unlock_cooldown_until BIGINT;

COMMENT ON COLUMN public.cbt_exam_sessions.lock_count IS
  'Total number of times the student has been locked during this exam session (used for progressive unlock cooldown penalty: 1m, 3m, 5m, 7m...).';

COMMENT ON COLUMN public.cbt_exam_sessions.unlock_cooldown_until IS
  'Unix timestamp in milliseconds until which the student must wait after an Operator unlock before resuming the exam.';

-- Ensure no NULL values exist in lock_count for existing rows
UPDATE public.cbt_exam_sessions
SET lock_count = 0
WHERE lock_count IS NULL;

-- Partial index for active cooldown lookups on monitoring dashboard
CREATE INDEX IF NOT EXISTS idx_cbt_exam_sessions_unlock_cooldown_until
  ON public.cbt_exam_sessions (unlock_cooldown_until)
  WHERE unlock_cooldown_until IS NOT NULL;

-- Preserve full access for client anon/authenticated roles used by CBT app
GRANT ALL ON TABLE public.cbt_exam_sessions TO anon, authenticated;

-- Prompt PostgREST schema cache reload so new columns are available immediately
NOTIFY pgrst, 'reload schema';

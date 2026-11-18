-- ============================================================================
-- MIGRATION: CBT SMP Negeri 12 Banjarbaru — Supabase Realtime, RLS & Schema
-- ============================================================================
-- Jalankan skrip ini di Supabase Dashboard -> SQL Editor -> New Query -> Run.
-- Bersifat idempoten (aman dijalankan berulang kali tanpa menghapus data lama).
-- ============================================================================

-- 1. Pastikan tabel cbt_exam_sessions tersedia beserta seluruh kolom tracking & nilai
CREATE TABLE IF NOT EXISTS public.cbt_exam_sessions (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL DEFAULT '',
  nis TEXT NOT NULL DEFAULT '',
  class_id TEXT NOT NULL DEFAULT '',
  class_name TEXT NOT NULL DEFAULT '',
  exam_id TEXT NOT NULL DEFAULT '',
  exam_title TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'not_started',
  score NUMERIC(6,2) NOT NULL DEFAULT 0,
  score_pg NUMERIC(6,2) NOT NULL DEFAULT 0,
  score_essay NUMERIC(6,2) NOT NULL DEFAULT 0,
  final_score NUMERIC(6,2) NOT NULL DEFAULT 0,
  is_passed BOOLEAN NOT NULL DEFAULT FALSE,
  violation_count INTEGER NOT NULL DEFAULT 0,
  is_locked BOOLEAN NOT NULL DEFAULT FALSE,
  lock_reason TEXT,
  answers_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  time_remaining_seconds INTEGER NOT NULL DEFAULT 5400,
  extra_time_minutes INTEGER NOT NULL DEFAULT 0,
  current_question_index INTEGER NOT NULL DEFAULT 0,
  device_info TEXT DEFAULT 'CBT Browser',
  device_session_id TEXT,
  is_online BOOLEAN NOT NULL DEFAULT FALSE,
  last_heartbeat BIGINT NOT NULL DEFAULT 0,
  admin_action_at BIGINT,
  started_at TEXT,
  submitted_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tambahkan kolom apabila tabel sudah pernah dibuat sebelumnya dengan versi lama
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS student_name TEXT NOT NULL DEFAULT '';
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS nis TEXT NOT NULL DEFAULT '';
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS class_id TEXT NOT NULL DEFAULT '';
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS class_name TEXT NOT NULL DEFAULT '';
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS exam_title TEXT NOT NULL DEFAULT '';
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'not_started';
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS score NUMERIC(6,2) NOT NULL DEFAULT 0;
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS score_pg NUMERIC(6,2) NOT NULL DEFAULT 0;
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS score_essay NUMERIC(6,2) NOT NULL DEFAULT 0;
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS final_score NUMERIC(6,2) NOT NULL DEFAULT 0;
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS is_passed BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS violation_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS is_locked BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS lock_reason TEXT;
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS answers_json JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS time_remaining_seconds INTEGER NOT NULL DEFAULT 5400;
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS extra_time_minutes INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS current_question_index INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS device_info TEXT DEFAULT 'CBT Browser';
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS device_session_id TEXT;
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS is_online BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS last_heartbeat BIGINT NOT NULL DEFAULT 0;
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS admin_action_at BIGINT;
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS started_at TEXT;
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMPTZ;
ALTER TABLE public.cbt_exam_sessions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_cbt_sessions_student ON public.cbt_exam_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_cbt_sessions_exam ON public.cbt_exam_sessions(exam_id);
CREATE INDEX IF NOT EXISTS idx_cbt_sessions_status ON public.cbt_exam_sessions(status);
CREATE INDEX IF NOT EXISTS idx_cbt_sessions_locked ON public.cbt_exam_sessions(is_locked);
CREATE INDEX IF NOT EXISTS idx_cbt_sessions_updated ON public.cbt_exam_sessions(updated_at DESC);

-- 2. Tabel Log Pelanggaran Real-Time (Audit Anti-Curang & Unlock)
CREATE TABLE IF NOT EXISTS public.cbt_violation_logs (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL DEFAULT '',
  nis TEXT NOT NULL DEFAULT '',
  class_name TEXT NOT NULL DEFAULT '',
  exam_id TEXT NOT NULL DEFAULT '',
  exam_title TEXT NOT NULL DEFAULT '',
  violation_type TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  violation_number INTEGER NOT NULL DEFAULT 1,
  action_taken TEXT NOT NULL DEFAULT 'WARNING_MODAL',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cbt_violations_session ON public.cbt_violation_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_cbt_violations_created ON public.cbt_violation_logs(created_at DESC);

-- 3. Trigger otomatis untuk memperbarui kolom updated_at setiap INSERT / UPDATE
CREATE OR REPLACE FUNCTION public.set_cbt_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_cbt_exam_sessions_updated_at ON public.cbt_exam_sessions;
CREATE TRIGGER trg_cbt_exam_sessions_updated_at
  BEFORE INSERT OR UPDATE ON public.cbt_exam_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.set_cbt_updated_at();

-- 4. Aktifkan REPLICA IDENTITY FULL agar event UPDATE Supabase Realtime membawa semua kolom
ALTER TABLE public.cbt_exam_sessions REPLICA IDENTITY FULL;
ALTER TABLE public.cbt_violation_logs REPLICA IDENTITY FULL;

-- 5. Row Level Security (RLS) Policies untuk akses baca/tulis Siswa, Guru & Operator
ALTER TABLE public.cbt_exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbt_violation_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow CBT select sessions" ON public.cbt_exam_sessions;
CREATE POLICY "Allow CBT select sessions"
  ON public.cbt_exam_sessions
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow CBT insert sessions" ON public.cbt_exam_sessions;
CREATE POLICY "Allow CBT insert sessions"
  ON public.cbt_exam_sessions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow CBT update sessions" ON public.cbt_exam_sessions;
CREATE POLICY "Allow CBT update sessions"
  ON public.cbt_exam_sessions
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow CBT select violation logs" ON public.cbt_violation_logs;
CREATE POLICY "Allow CBT select violation logs"
  ON public.cbt_violation_logs
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow CBT insert violation logs" ON public.cbt_violation_logs;
CREATE POLICY "Allow CBT insert violation logs"
  ON public.cbt_violation_logs
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 6. Publikasi Supabase Realtime (PostgreSQL CDC)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'cbt_exam_sessions'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.cbt_exam_sessions;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'cbt_violation_logs'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.cbt_violation_logs;
  END IF;
END $$;

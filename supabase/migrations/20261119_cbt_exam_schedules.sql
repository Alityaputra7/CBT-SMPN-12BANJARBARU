-- ============================================================================
-- MIGRATION: CBT SMP Negeri 12 Banjarbaru — Jadwal Ujian Real-Time (Supabase)
-- ============================================================================
-- Jalankan seluruh skrip ini di Supabase Dashboard -> SQL Editor -> New Query -> Run.
-- Bersifat idempoten (aman dijalankan berulang kali tanpa menghapus jadwal yang ada).
-- ============================================================================

-- 1. Buat tabel public.cbt_exam_schedules
CREATE TABLE IF NOT EXISTS public.cbt_exam_schedules (
  id TEXT PRIMARY KEY,
  exam_title TEXT NOT NULL DEFAULT '',
  subject_id TEXT NOT NULL DEFAULT '',
  subject_name TEXT NOT NULL DEFAULT '',
  class_ids TEXT[] NOT NULL DEFAULT ARRAY['cls-1', 'cls-8a', 'cls-8b', 'cls-9'],
  class_names TEXT[] NOT NULL DEFAULT ARRAY['VII', 'VIII-A', 'VIII-B', 'IX'],
  scheduled_date TEXT NOT NULL DEFAULT '',
  start_time TEXT NOT NULL DEFAULT '07:30',
  end_time TEXT NOT NULL DEFAULT '09:30',
  duration_minutes INTEGER NOT NULL DEFAULT 90,
  kkm INTEGER NOT NULL DEFAULT 75,
  token TEXT DEFAULT '',
  token_required BOOLEAN NOT NULL DEFAULT TRUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  status TEXT NOT NULL DEFAULT 'ongoing',
  randomize_questions BOOLEAN NOT NULL DEFAULT TRUE,
  randomize_options BOOLEAN NOT NULL DEFAULT TRUE,
  question_bank_id TEXT NOT NULL DEFAULT '',
  total_questions INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pastikan seluruh kolom tersedia apabila tabel dibuat dari skema sebelumnya
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS exam_title TEXT NOT NULL DEFAULT '';
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS subject_id TEXT NOT NULL DEFAULT '';
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS subject_name TEXT NOT NULL DEFAULT '';
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS class_ids TEXT[] NOT NULL DEFAULT ARRAY['cls-1', 'cls-8a', 'cls-8b', 'cls-9'];
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS class_names TEXT[] NOT NULL DEFAULT ARRAY['VII', 'VIII-A', 'VIII-B', 'IX'];
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS scheduled_date TEXT NOT NULL DEFAULT '';
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS start_time TEXT NOT NULL DEFAULT '07:30';
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS end_time TEXT NOT NULL DEFAULT '09:30';
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS duration_minutes INTEGER NOT NULL DEFAULT 90;
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS kkm INTEGER NOT NULL DEFAULT 75;
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS token TEXT DEFAULT '';
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS token_required BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'ongoing';
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS randomize_questions BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS randomize_options BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS question_bank_id TEXT NOT NULL DEFAULT '';
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS total_questions INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.cbt_exam_schedules ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_cbt_schedules_date ON public.cbt_exam_schedules(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_cbt_schedules_subject ON public.cbt_exam_schedules(subject_id);
CREATE INDEX IF NOT EXISTS idx_cbt_schedules_active ON public.cbt_exam_schedules(is_active);
CREATE INDEX IF NOT EXISTS idx_cbt_schedules_updated ON public.cbt_exam_schedules(updated_at DESC);

-- 2. Trigger otomatis updated_at setiap INSERT / UPDATE
CREATE OR REPLACE FUNCTION public.set_cbt_schedule_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_cbt_exam_schedules_updated_at ON public.cbt_exam_schedules;
CREATE TRIGGER trg_cbt_exam_schedules_updated_at
  BEFORE INSERT OR UPDATE ON public.cbt_exam_schedules
  FOR EACH ROW
  EXECUTE FUNCTION public.set_cbt_schedule_updated_at();

-- 3. Aktifkan REPLICA IDENTITY FULL agar event Realtime membawa seluruh kolom
ALTER TABLE public.cbt_exam_schedules REPLICA IDENTITY FULL;

-- 4. Nonaktifkan RLS sementara & berikan izin penuh GRANT ALL ke anon dan authenticated
ALTER TABLE public.cbt_exam_schedules DISABLE ROW LEVEL SECURITY;
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE public.cbt_exam_schedules TO anon, authenticated;

-- 5. Publikasi Supabase Realtime (PostgreSQL CDC)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'cbt_exam_schedules'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.cbt_exam_schedules;
  END IF;
END $$;

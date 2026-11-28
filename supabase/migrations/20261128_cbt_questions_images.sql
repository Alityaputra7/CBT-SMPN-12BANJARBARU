-- ============================================================================
-- MIGRATION: CBT SMP Negeri 12 Banjarbaru — Bank Soal & Gambar Soal/Opsi
-- ============================================================================
-- Jalankan seluruh skrip ini di Supabase Dashboard -> SQL Editor -> New Query -> Run.
-- Bersifat idempoten (aman dijalankan berulang kali tanpa menghapus soal yang ada).
-- Mendukung penyimpanan gambar soal (`image_url`) dan gambar opsi jawaban (`option_images`).
-- ============================================================================

-- 1. Buat tabel public.cbt_questions apabila belum tersedia
CREATE TABLE IF NOT EXISTS public.cbt_questions (
  id TEXT PRIMARY KEY,
  bank_id TEXT NOT NULL DEFAULT 'bank-default',
  subject_id TEXT NOT NULL DEFAULT '',
  class_id TEXT NOT NULL DEFAULT 'cls-1',
  grade TEXT NOT NULL DEFAULT 'VII',
  question_number INTEGER NOT NULL DEFAULT 1,
  question_type TEXT NOT NULL DEFAULT 'pg',
  prompt TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  option_images JSONB NOT NULL DEFAULT '{}'::jsonb,
  options_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  matching_pairs_json JSONB,
  matching_right_options_json JSONB,
  statements_json JSONB,
  correct_answers_json JSONB,
  correct_answer_text TEXT,
  essay_rubric TEXT,
  points INTEGER NOT NULL DEFAULT 5,
  difficulty TEXT NOT NULL DEFAULT 'sedang',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Pastikan seluruh kolom (termasuk image_url & option_images) tersedia apabila tabel dibuat sebelumnya
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS bank_id TEXT NOT NULL DEFAULT 'bank-default';
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS subject_id TEXT NOT NULL DEFAULT '';
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS class_id TEXT NOT NULL DEFAULT 'cls-1';
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS grade TEXT NOT NULL DEFAULT 'VII';
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS question_number INTEGER NOT NULL DEFAULT 1;
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS question_type TEXT NOT NULL DEFAULT 'pg';
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS prompt TEXT NOT NULL DEFAULT '';
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS option_images JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS options_json JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS matching_pairs_json JSONB;
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS matching_right_options_json JSONB;
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS statements_json JSONB;
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS correct_answers_json JSONB;
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS correct_answer_text TEXT;
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS essay_rubric TEXT;
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS points INTEGER NOT NULL DEFAULT 5;
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS difficulty TEXT NOT NULL DEFAULT 'sedang';
ALTER TABLE public.cbt_questions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_cbt_questions_subject ON public.cbt_questions(subject_id);
CREATE INDEX IF NOT EXISTS idx_cbt_questions_class ON public.cbt_questions(class_id);
CREATE INDEX IF NOT EXISTS idx_cbt_questions_updated ON public.cbt_questions(updated_at DESC);

-- 3. Trigger otomatis updated_at setiap INSERT / UPDATE
CREATE OR REPLACE FUNCTION public.set_cbt_question_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_cbt_questions_updated_at ON public.cbt_questions;
CREATE TRIGGER trg_cbt_questions_updated_at
  BEFORE INSERT OR UPDATE ON public.cbt_questions
  FOR EACH ROW
  EXECUTE FUNCTION public.set_cbt_question_updated_at();

-- 4. Aktifkan REPLICA IDENTITY FULL agar event Realtime membawa seluruh kolom
ALTER TABLE public.cbt_questions REPLICA IDENTITY FULL;

-- 5. Nonaktifkan RLS sementara & berikan izin penuh GRANT ALL ke anon dan authenticated
ALTER TABLE public.cbt_questions DISABLE ROW LEVEL SECURITY;
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE public.cbt_questions TO anon, authenticated;

-- 6. Publikasi Supabase Realtime (PostgreSQL CDC)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'cbt_questions'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.cbt_questions;
  END IF;
END $$;

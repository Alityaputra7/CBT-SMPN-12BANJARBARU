import { 
  saveStudentSessionToKV, 
  executePostgresSql 
} from '../../../../lib/vercel-cbt-adapter';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/cbt/session
 * Menyimpan lembar jawaban, sisa waktu, dan deteksi kecurangan siswa
 * Menggunakan Vercel KV untuk latensi ultra-cepat (<10ms) per klik jawaban
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { session } = body;

    if (!session || !session.id) {
      return Response.json(
        { success: false, error: 'Sesi siswa tidak valid atau id sesi kosong' },
        { status: 400 }
      );
    }

    // 1. Simpan ke Vercel KV (Sangat cepat untuk 100+ siswa ujian bersamaan)
    await saveStudentSessionToKV(session.id, session);

    // 2. Jika ujian sudah diselesaikan (status: submitted), simpan nilai permanen ke Vercel Postgres
    if (process.env.POSTGRES_URL && (session.status === 'submitted' || session.status === 'force_submitted')) {
      try {
        await executePostgresSql(`
          INSERT INTO cbt_exam_sessions (
            id, student_id, exam_id, status, time_remaining_seconds, 
            violations_count, is_locked, answers_json, score_pg, 
            score_essay, final_score, is_passed, device_info, submitted_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())
          ON CONFLICT (id) DO UPDATE SET
            status = EXCLUDED.status,
            answers_json = EXCLUDED.answers_json,
            score_pg = EXCLUDED.score_pg,
            score_essay = EXCLUDED.score_essay,
            final_score = EXCLUDED.final_score,
            is_passed = EXCLUDED.is_passed,
            violations_count = EXCLUDED.violations_count,
            submitted_at = NOW()
        `, [
          session.id,
          session.studentId,
          session.examId,
          session.status,
          session.timeRemainingSeconds || 0,
          session.violationsCount || 0,
          session.isLocked || false,
          JSON.stringify(session.answers || {}),
          session.scorePg || 0,
          session.scoreEssay || 0,
          session.finalScore || 0,
          session.isPassed || false,
          session.deviceInfo || 'Browser CBT Siswa'
        ]);
      } catch (pgError) {
        console.warn('[Next.js API] Postgres session archiving error:', pgError);
      }
    }

    return Response.json({
      success: true,
      sessionId: session.id,
      timestamp: Date.now(),
      message: 'Sesi siswa berhasil disinkronkan ke Vercel KV / Postgres.',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return Response.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}

import { 
  executePostgresSql, 
  VERCEL_POSTGRES_SCHEMA_SQL 
} from '../../../../lib/vercel-cbt-adapter';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/cbt/init-db
 * Migrasi otomatis skema tabel database CBT ke Vercel Postgres
 */
export async function POST() {
  if (!process.env.POSTGRES_URL) {
    return Response.json({
      success: false,
      error: 'Environment variable POSTGRES_URL tidak ditemukan pada deployment Vercel.',
      hint: 'Tambahkan database Vercel Postgres melalui tab Storage di Dashboard Vercel Anda.'
    }, { status: 400 });
  }

  try {
    // Jalankan skema pembuatan tabel
    await executePostgresSql(VERCEL_POSTGRES_SCHEMA_SQL);

    return Response.json({
      success: true,
      message: 'Seluruh tabel CBT SMP Negeri 12 Banjarbaru berhasil dibuat di Vercel Postgres.',
      tablesCreated: [
        'cbt_school_settings',
        'cbt_students',
        'cbt_users',
        'cbt_exam_schedules',
        'cbt_questions',
        'cbt_exam_sessions'
      ],
      timestamp: new Date().toISOString()
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return Response.json({
      success: false,
      error: errorMsg
    }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({
    status: 'ready',
    service: 'Vercel Postgres CBT Migration Runner',
    instructions: 'Kirim HTTP POST ke endpoint ini untuk membuat tabel database otomatis.'
  });
}

import { 
  getCbtStateFromKV, 
  saveCbtStateToKV, 
  executePostgresSql 
} from '../../../../lib/vercel-cbt-adapter';

// Configure Edge or Node.js runtime for Next.js App Router
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/cbt/data
 * Mengambil data master CBT dari Vercel KV / Postgres
 */
export async function GET() {
  try {
    // 1. Ambil data dari Vercel KV (latensi rendah <15ms)
    const kvState = await getCbtStateFromKV();
    if (kvState && kvState.data) {
      return Response.json({
        success: true,
        source: 'vercel_kv',
        version: kvState.version,
        data: kvState.data,
      });
    }

    // 2. Jika KV belum diisi, coba query dari Vercel Postgres
    if (process.env.POSTGRES_URL) {
      try {
        const settingsRes = await executePostgresSql('SELECT * FROM cbt_school_settings LIMIT 1') as { rows?: unknown[] };
        const studentsRes = await executePostgresSql('SELECT * FROM cbt_students ORDER BY class_name, name') as { rows?: unknown[] };
        const questionsRes = await executePostgresSql('SELECT * FROM cbt_questions ORDER BY number') as { rows?: unknown[] };
        const examsRes = await executePostgresSql('SELECT * FROM cbt_exam_schedules ORDER BY exam_date') as { rows?: unknown[] };

        return Response.json({
          success: true,
          source: 'vercel_postgres',
          data: {
            schoolSetting: settingsRes?.rows?.[0] || null,
            students: studentsRes?.rows || [],
            questions: questionsRes?.rows || [],
            exams: examsRes?.rows || [],
          },
        });
      } catch (sqlErr) {
        console.warn('[Next.js API] Postgres query failed, falling back:', sqlErr);
      }
    }

    // 3. Fallback jika environment variable belum dikonfigurasi di Vercel
    return Response.json({
      success: true,
      source: 'uninitialized',
      message: 'Vercel KV / Postgres belum dikonfigurasi. Hubungkan database melalui Dashboard Vercel.',
      data: null,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return Response.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cbt/data
 * Menyimpan data perubahan CBT ke Vercel KV & Vercel Postgres
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { updates } = body;

    if (!updates || typeof updates !== 'object') {
      return Response.json(
        { success: false, error: 'Request body harus menyertakan objek "updates"' },
        { status: 400 }
      );
    }

    // 1. Simpan snapshot data lengkap ke Vercel KV
    const kvResult = await saveCbtStateToKV(updates);

    // 2. Jika Vercel Postgres aktif, lakukan sinkronisasi data relasional
    if (process.env.POSTGRES_URL) {
      try {
        // Contoh: update setting sekolah di Postgres jika disertakan
        if (updates.schoolSetting) {
          const s = updates.schoolSetting;
          await executePostgresSql(`
            INSERT INTO cbt_school_settings (id, name, npsn, address, principal_name, principal_nip, cbt_coordinator_name, cbt_coordinator_nip)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (id) DO UPDATE SET
              name = EXCLUDED.name,
              principal_name = EXCLUDED.principal_name,
              principal_nip = EXCLUDED.principal_nip,
              cbt_coordinator_name = EXCLUDED.cbt_coordinator_name,
              cbt_coordinator_nip = EXCLUDED.cbt_coordinator_nip
          `, [
            s.id || 'setting-1',
            s.name || 'SMP Negeri 12 Banjarbaru',
            s.npsn || '30304606',
            s.address || 'Jl. H. Mistar Cokrokusumo',
            s.principalName || 'Legiyo, S.Pd',
            s.principalNip || '196907022000031010',
            s.cbtCoordinatorName || 'Dwi Setyarini, S.Pd.',
            s.cbtCoordinatorNip || '198502082009032008'
          ]);
        }
      } catch (pgErr) {
        console.warn('[Next.js API] Postgres relational sync error:', pgErr);
      }
    }

    return Response.json({
      success: true,
      version: kvResult.version,
      lastUpdated: Date.now(),
      message: 'Data CBT berhasil disimpan ke Vercel KV / Postgres.',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return Response.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Smartphone, 
  Server, 
  HardDriveDownload, 
  Lock, 
  FileCode, 
  Check, 
  Copy,
  Terminal,
  ExternalLink,
  Database,
  Cloud,
  Sparkles
} from 'lucide-react';

export const SecurityAndDeployGuide: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'vercel' | 'seb' | 'android' | 'vps' | 'backup'>('vercel');
  const [vercelActiveCode, setVercelActiveCode] = useState<'data' | 'session' | 'init' | 'adapter' | 'env'>('data');
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(key);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  const sebConfigSample = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>originatorVersion</key>
    <string>SEB_Win_3.5.0</string>
    <key>startURL</key>
    <string>https://cbt.smpn12bjb.sch.id/</string>
    <key>sebServerURL</key>
    <string></string>
    <key>hashedAdminPassword</key>
    <string>9f83c21a4f1d4cb8a73b5c46b9a8976b</string>
    <key>allowQuit</key>
    <true/>
    <key>quitURL</key>
    <string>https://cbt.smpn12bjb.sch.id/logout</string>
    <key>browserWindowAllowReload</key>
    <false/>
    <key>showTaskBar</key>
    <false/>
    <key>allowPreferencesWindow</key>
    <false/>
    <key>sendBrowserExamKey</key>
    <true/>
    <key>examKeySalt</key>
    <data>U01QTjEyX0JBTkpBUkJBUlVfU0FMVA==</data>
</dict>
</plist>`;

  const androidKioskGuide = `// Android Kiosk WebView Implementation (MainActivity.kt)
package id.sch.smpn12bjb.cbtkiosk

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.View
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 1. Kiosk Screen Pinning (Lock Task Mode)
        startLockTask()

        // 2. Immersive Sticky Fullscreen
        window.decorView.systemUiVisibility = (
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            or View.SYSTEM_UI_FLAG_FULLSCREEN
            or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
            or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        )

        webView = findViewById(R.id.cbtWebView)
        val settings: WebSettings = webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.allowFileAccess = false
        
        // 3. Custom Header / User-Agent untuk verifikasi Server
        settings.userAgentString = settings.userAgentString + " SMPN12BJB-CBT-Kiosk/1.0"

        webView.webViewClient = object : WebViewClient() {
            // Cegah membuka tautan di luar domain sekolah
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                if (url != null && url.startsWith("https://cbt.smpn12bjb.sch.id")) {
                    return false
                }
                return true
            }
        }

        webView.loadUrl("https://cbt.smpn12bjb.sch.id")
    }

    override fun onBackPressed() {
        // Nonaktifkan tombol Back perangkat Android selama ujian
    }
}`;

  const vpsDeployScript = `# ========================================================
# PANDUAN DEPLOY KE UBUNTU 24.04 LTS / DEBIAN 12 VPS
# Untuk Server Ujian CBT SMP Negeri 12 Banjarbaru
# ========================================================

# 1. Update & Install Nginx, MySQL, Node.js / PHP
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx mysql-server certbot python3-certbot-nginx

# 2. Setup Database & User MySQL
sudo mysql -u root <<EOF
CREATE DATABASE cbt_smpn12_bjb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'cbt_user'@'localhost' IDENTIFIED BY 'PasswordKuatSMPN12!';
GRANT ALL PRIVILEGES ON cbt_smpn12_bjb.* TO 'cbt_user'@'localhost';
FLUSH PRIVILEGES;
EOF

# 3. Clone / Upload Aplikasi & Install Dependencies
cd /var/www/cbt-smpn12
npm install --production
npm run build

# 4. Jalankan Service dengan PM2 (Auto-Restart & Clustering)
sudo npm install -g pm2
pm2 start server.ts --name "cbt-smpn12" -i max
pm2 startup
pm2 save

# 5. Konfigurasi HTTPS dengan Let's Encrypt
sudo certbot --nginx -d cbt.smpn12bjb.sch.id`;

  const vercelDataRouteSample = `// app/api/cbt/data/route.ts
// Next.js App Router API Route untuk Sinkronisasi Data CBT (Vercel KV & Postgres)

import { getCbtStateFromKV, saveCbtStateToKV, executePostgresSql } from '@/lib/vercel-cbt-adapter';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Ambil data dari Vercel KV (latensi rendah <15ms)
    const kvState = await getCbtStateFromKV();
    if (kvState && kvState.data) {
      return Response.json({ success: true, source: 'vercel_kv', version: kvState.version, data: kvState.data });
    }

    // 2. Query dari Vercel Postgres jika KV kosong
    if (process.env.POSTGRES_URL) {
      const studentsRes = await executePostgresSql('SELECT * FROM cbt_students ORDER BY class_name, name') as { rows?: unknown[] };
      const questionsRes = await executePostgresSql('SELECT * FROM cbt_questions ORDER BY number') as { rows?: unknown[] };
      const examsRes = await executePostgresSql('SELECT * FROM cbt_exam_schedules ORDER BY exam_date') as { rows?: unknown[] };
      return Response.json({
        success: true,
        source: 'vercel_postgres',
        data: { students: studentsRes?.rows || [], questions: questionsRes?.rows || [], exams: examsRes?.rows || [] }
      });
    }

    return Response.json({ success: true, source: 'uninitialized', data: null });
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { updates } = await request.json();
    if (!updates) {
      return Response.json({ success: false, error: 'Missing updates object' }, { status: 400 });
    }
    const kvResult = await saveCbtStateToKV(updates);
    return Response.json({ success: true, version: kvResult.version, lastUpdated: Date.now() });
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}`;

  const vercelSessionRouteSample = `// app/api/cbt/session/route.ts
// Next.js App Router API Route untuk Sinkronisasi Jawaban & Sesi Siswa Real-time (Vercel KV)

import { saveStudentSessionToKV, executePostgresSql } from '@/lib/vercel-cbt-adapter';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { session } = await request.json();
    if (!session?.id) {
      return Response.json({ success: false, error: 'Sesi siswa tidak valid' }, { status: 400 });
    }

    // 1. Simpan ke Vercel KV (latensi <10ms, concurrency tinggi 100+ siswa)
    await saveStudentSessionToKV(session.id, session);

    // 2. Jika ujian telah selesai dikumpulkan, arsipkan ke Vercel Postgres
    if (process.env.POSTGRES_URL && (session.status === 'submitted' || session.status === 'force_submitted')) {
      await executePostgresSql(
        'INSERT INTO cbt_exam_sessions (id, student_id, exam_id, status, score_pg, score_essay, final_score, is_passed, answers_json, submitted_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status, final_score = EXCLUDED.final_score, answers_json = EXCLUDED.answers_json, submitted_at = NOW()',
        [
          session.id, session.studentId, session.examId, session.status,
          session.scorePg || 0, session.scoreEssay || 0, session.finalScore || 0,
          session.isPassed || false, JSON.stringify(session.answers || {})
        ]
      );
    }

    return Response.json({ success: true, sessionId: session.id, timestamp: Date.now() });
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}`;

  const vercelInitDbSample = `// app/api/cbt/init-db/route.ts
// Jalankan HTTP POST ke endpoint ini untuk migrasi skema tabel Vercel Postgres

import { executePostgresSql, VERCEL_POSTGRES_SCHEMA_SQL } from '@/lib/vercel-cbt-adapter';

export const runtime = 'nodejs';

export async function POST() {
  if (!process.env.POSTGRES_URL) {
    return Response.json({ success: false, error: 'POSTGRES_URL belum dikonfigurasi di Vercel' }, { status: 400 });
  }

  try {
    await executePostgresSql(VERCEL_POSTGRES_SCHEMA_SQL);
    return Response.json({
      success: true,
      message: 'Seluruh tabel CBT SMPN 12 Banjarbaru berhasil dibuat di Vercel Postgres!',
      tables: ['cbt_school_settings', 'cbt_students', 'cbt_users', 'cbt_exam_schedules', 'cbt_questions', 'cbt_exam_sessions']
    });
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}`;

  const vercelEnvSample = `# .env.local untuk Next.js dengan Vercel Postgres & Vercel KV

# 1. Vercel Postgres (Otomatis dibuat saat attach Postgres di Dashboard Vercel)
POSTGRES_URL="postgres://default:password@ep-sample-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require"
POSTGRES_PRISMA_URL="postgres://default:password@ep-sample-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://default:password@ep-sample.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require"
POSTGRES_USER="default"
POSTGRES_HOST="ep-sample.us-east-1.postgres.vercel-storage.com"
POSTGRES_PASSWORD="password"
POSTGRES_DATABASE="verceldb"

# 2. Vercel KV / Upstash Redis (Otomatis dibuat saat attach KV di Dashboard Vercel)
KV_URL="redis://default:token@sample-kv.upstash.io:6379"
KV_REST_API_URL="https://sample-kv.upstash.io"
KV_REST_API_TOKEN="AXXXAAIncDEwNzIz..."
KV_REST_API_READ_ONLY_TOKEN="AXXXAAIncDEwNzIz..."`;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
      <div className="pb-4 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900">
          Panduan Teknis, Safe Exam Browser (SEB) & Deployment
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Petunjuk API Route Next.js Vercel Postgres/KV, integrasi ujian aman, wrapping Android Kiosk, dan deploy VPS.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
        <button
          onClick={() => setActiveSubTab('vercel')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
            activeSubTab === 'vercel' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-blue-600" />
          <span>Vercel Postgres & KV (Next.js)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('seb')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            activeSubTab === 'seb' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          Safe Exam Browser (SEB)
        </button>
        <button
          onClick={() => setActiveSubTab('android')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeSubTab === 'android' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          Android Kiosk
        </button>
        <button
          onClick={() => setActiveSubTab('vps')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeSubTab === 'vps' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Server className="w-3.5 h-3.5" />
          Deploy Hosting / VPS
        </button>
        <button
          onClick={() => setActiveSubTab('backup')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeSubTab === 'backup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HardDriveDownload className="w-3.5 h-3.5" />
          Backup & Restore
        </button>
      </div>

      {/* SUB-TAB 0: VERCEL POSTGRES & KV (NEXT.JS) */}
      {activeSubTab === 'vercel' && (
        <div className="space-y-5">
          {/* Architecture Banner */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl text-xs space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-600 text-white rounded-lg">
                <Database className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                Arsitektur Hybrid: Vercel Postgres + Vercel KV untuk CBT Skala Sekolah
              </h4>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Untuk meng-hosting aplikasi CBT pada platform serverless <strong>Vercel (Next.js)</strong>, direkomendasikan menggunakan pola hybrid:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-white/90 border border-blue-100 rounded-lg space-y-1">
                <div className="font-bold text-blue-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>1. Vercel KV (Upstash Redis)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Digunakan untuk <strong>sinkronisasi lembar jawaban & sisa waktu siswa real-time</strong>. Menangani ratusan klik jawaban secara bersamaan tanpa bottleneck koneksi SQL dengan latensi super cepat (&lt;10ms).
                </p>
              </div>
              <div className="p-3 bg-white/90 border border-indigo-100 rounded-lg space-y-1">
                <div className="font-bold text-indigo-900 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-indigo-600" />
                  <span>2. Vercel Postgres (Neon Serverless)</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Digunakan untuk <strong>data relasional terstruktur</strong>: 92 siswa resmi, 9 guru mapel, jadwal ujian, bank soal lengkap, dan arsip nilai hasil ulangan siswa untuk pencetakan leger & kartu.
                </p>
              </div>
            </div>
          </div>

          {/* Code Viewer Container */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-900 shadow-sm">
            {/* Code Tab Switcher */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-950 border-b border-slate-800 flex-wrap gap-2">
              <div className="flex items-center gap-1 overflow-x-auto">
                <button
                  onClick={() => setVercelActiveCode('data')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                    vercelActiveCode === 'data' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  app/api/cbt/data/route.ts
                </button>
                <button
                  onClick={() => setVercelActiveCode('session')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                    vercelActiveCode === 'session' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  app/api/cbt/session/route.ts
                </button>
                <button
                  onClick={() => setVercelActiveCode('init')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                    vercelActiveCode === 'init' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  app/api/cbt/init-db/route.ts
                </button>
                <button
                  onClick={() => setVercelActiveCode('env')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                    vercelActiveCode === 'env' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  .env.local
                </button>
              </div>

              {/* Copy Current Code Button */}
              <button
                onClick={() => {
                  const map = {
                    data: vercelDataRouteSample,
                    session: vercelSessionRouteSample,
                    init: vercelInitDbSample,
                    env: vercelEnvSample,
                    adapter: vercelDataRouteSample
                  };
                  handleCopy(`vercel-${vercelActiveCode}`, map[vercelActiveCode] || '');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium cursor-pointer transition-colors"
              >
                {copiedScript === `vercel-${vercelActiveCode}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin File Kode Ini</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Block */}
            <div className="p-4 overflow-x-auto max-h-96">
              <pre className="text-slate-200 font-mono text-xs leading-relaxed">
                {vercelActiveCode === 'data' && vercelDataRouteSample}
                {vercelActiveCode === 'session' && vercelSessionRouteSample}
                {vercelActiveCode === 'init' && vercelInitDbSample}
                {vercelActiveCode === 'env' && vercelEnvSample}
              </pre>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs text-slate-800">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-600" />
              <span>Langkah Menghubungkan ke Vercel Storage:</span>
            </h4>
            <ol className="list-decimal pl-5 space-y-2 text-slate-700 leading-relaxed">
              <li>
                <strong>Buat Database Postgres di Vercel:</strong> Buka tab <strong>Storage</strong> di project Vercel Anda, klik <strong>Create Database</strong>, lalu pilih <strong>Postgres</strong>. Vercel akan otomatis menyuntikkan <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">POSTGRES_URL</code> ke environment variables.
              </li>
              <li>
                <strong>Buat Database KV di Vercel:</strong> Di tab <strong>Storage</strong> yang sama, klik <strong>Create Database</strong> dan pilih <strong>KV</strong>. Vercel akan otomatis menyuntikkan <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">KV_REST_API_URL</code> dan token ke environment variables.
              </li>
              <li>
                <strong>Salin File Kode:</strong> Buat folder <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">app/api/cbt/data/route.ts</code> dan <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">app/api/cbt/session/route.ts</code> pada project Next.js Anda sesuai kode di atas (sudah tersedia langsung di dalam repository ini).
              </li>
              <li>
                <strong>Inisialisasi Tabel:</strong> Kirim HTTP POST ke <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">https://domain-anda.vercel.app/api/cbt/init-db</code> atau jalankan via Postman/cURL untuk membuat seluruh tabel secara otomatis.
              </li>
            </ol>
          </div>
        </div>
      )}

      {/* SUB-TAB 1: SEB */}
      {activeSubTab === 'seb' && (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-2">
            <h4 className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              Verifikasi Browser Exam Key (BEK) di Sisi Server
            </h4>
            <p className="leading-relaxed">
              Safe Exam Browser mengirimkan header khusus <code className="font-mono bg-white px-1 py-0.5 rounded text-blue-900">X-SafeExamBrowser-RequestHash</code> dan <code className="font-mono bg-white px-1 py-0.5 rounded text-blue-900">X-SafeExamBrowser-ConfigKeyHash</code>. Backend memverifikasi hash SHA256 dari URL + Exam Key Salt. Jika tidak cocok, siswa ditolak masuk sebelum login.
            </p>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-semibold text-slate-700">Contoh Konfigurasi SEB (.seb config file):</span>
              <button
                onClick={() => handleCopy('seb', sebConfigSample)}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                {copiedScript === 'seb' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedScript === 'seb' ? 'Tersalin' : 'Salin File .seb'}
              </button>
            </div>
            <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-80">
              {sebConfigSample}
            </pre>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: ANDROID KIOSK */}
      {activeSubTab === 'android' && (
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-2">
            <h4 className="font-bold flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-emerald-700" />
              Membungkus CBT Menjadi Aplikasi Android Kiosk (Screen Pinning)
            </h4>
            <p className="leading-relaxed">
              Siswa menggunakan tablet atau smartphone Android di ruang kelas. Aplikasi menggunakan fitur <code className="font-mono bg-white px-1 py-0.5 rounded text-emerald-900">startLockTask()</code> (Screen Pinning) dan mode <code className="font-mono bg-white px-1 py-0.5 rounded text-emerald-900">IMMERSIVE_STICKY</code> sehingga tombol Home, Back, dan Recent Apps dinonaktifkan secara perangkat keras.
            </p>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-semibold text-slate-700">Kode Android Studio (Kotlin + WebView Kiosk):</span>
              <button
                onClick={() => handleCopy('android', androidKioskGuide)}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                {copiedScript === 'android' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedScript === 'android' ? 'Tersalin' : 'Salin Kode Kotlin'}
              </button>
            </div>
            <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-80">
              {androidKioskGuide}
            </pre>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: DEPLOY VPS */}
      {activeSubTab === 'vps' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 space-y-2">
            <h4 className="font-bold flex items-center gap-1.5">
              <Server className="w-4 h-4 text-slate-700" />
              Langkah Deployment di VPS Linux (Ubuntu / Debian)
            </h4>
            <p className="leading-relaxed">
              Panduan terminal setup produksi dengan Nginx Reverse Proxy, PM2 Process Manager, dan SSL HTTPS gratis Let's Encrypt.
            </p>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-semibold text-slate-700">Skrip Perintah Terminal (Bash):</span>
              <button
                onClick={() => handleCopy('vps', vpsDeployScript)}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                {copiedScript === 'vps' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedScript === 'vps' ? 'Tersalin' : 'Salin Skrip Bash'}
              </button>
            </div>
            <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-80">
              {vpsDeployScript}
            </pre>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: BACKUP & RESTORE */}
      {activeSubTab === 'backup' && (
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Prosedur Pencadangan (Backup) Otomatis MySQL</h4>
            <p className="text-slate-600 leading-relaxed">
              Untuk mencegah kehilangan data saat ujian berlangsung, pasang cron job backup berkala setiap 30 menit ke direktori aman atau penyimpanan cloud sekolah:
            </p>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs">
              0,30 * * * * mysqldump -u cbt_user -pPasswordKuatSMPN12! cbt_smpn12_bjb | gzip &gt; /backup/cbt_$(date +\%Y\%m\%d_\%H\%M).sql.gz
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Prosedur Pemulihan (Restore)</h4>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs">
              gunzip &lt; /backup/cbt_20261025_0900.sql.gz | mysql -u cbt_user -pPasswordKuatSMPN12! cbt_smpn12_bjb
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
  ExternalLink
} from 'lucide-react';

export const SecurityAndDeployGuide: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'seb' | 'android' | 'vps' | 'backup'>('seb');
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

# 5. Konfigurasi HTTPS dengan Let's Encrypt (Wajib untuk Fullscreen API & SEB)
sudo certbot --nginx -d cbt.smpn12bjb.sch.id`;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
      <div className="pb-4 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900">
          Panduan Teknis, Safe Exam Browser (SEB) & Deployment
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Petunjuk integrasi ujian aman, wrapping Android Kiosk, deploy VPS, dan prosedur pencadangan basis data.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg max-w-xl">
        <button
          onClick={() => setActiveSubTab('seb')}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeSubTab === 'seb' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
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

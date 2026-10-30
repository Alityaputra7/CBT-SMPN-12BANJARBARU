import { Student, SchoolSetting } from '../types/cbt';

/**
 * Generates an official standalone printable HTML document for student exam cards.
 * Designed for crisp A4 paper output (Save as PDF / Direct Print).
 */
export function generateExamCardsHtml(
  students: Student[],
  schoolSetting: SchoolSetting,
  titleSuffix = 'Semua Siswa'
): string {
  const logoUrl = schoolSetting.logoUrl || '/assets/aistudio/IMG-20261025-WA0001_14b3123f.jpg';
  const principalName = schoolSetting.principalName || 'Legiyo, S.Pd';
  const principalNip = schoolSetting.principalNip || '196907022000031010';
  const principalTitle = schoolSetting.principalTitle || 'Plt. Kepala Sekolah';
  const coordinatorName = schoolSetting.cbtCoordinatorName || 'Dwi Setyarini, S.Pd';
  const coordinatorNip = schoolSetting.cbtCoordinatorNip || '198502082009032008';

  const cardsHtml = students.map(std => `
    <div class="card-container">
      <div class="card-header">
        <div class="logo-box">
          <img src="${logoUrl}" alt="Logo Sekolah" onerror="this.style.display='none'" />
        </div>
        <div class="header-titles">
          <h3>KARTU PESERTA UJIAN CBT</h3>
          <p class="school-name">${schoolSetting.name}</p>
          <p class="school-sub">Tahun Ajaran ${schoolSetting.academicYear} &bull; Semester ${schoolSetting.semester}</p>
        </div>
      </div>

      <div class="card-body">
        <table class="student-info-table">
          <tr>
            <td class="label">Nomor Induk Siswa (NIS)</td>
            <td class="sep">:</td>
            <td class="val highlight font-mono">${std.nis}</td>
          </tr>
          <tr>
            <td class="label">Nama Lengkap Peserta</td>
            <td class="sep">:</td>
            <td class="val font-bold">${std.name}</td>
          </tr>
          <tr>
            <td class="label">Kelas / Rombongan Belajar</td>
            <td class="sep">:</td>
            <td class="val">${std.className}</td>
          </tr>
          <tr>
            <td class="label">Ruang Ujian & Sesi</td>
            <td class="sep">:</td>
            <td class="val">${std.roomNumber || 'Ruang CBT 01'}</td>
          </tr>
          <tr>
            <td class="label">Nomor Meja / Bangku</td>
            <td class="sep">:</td>
            <td class="val font-bold text-blue">${std.seatNumber || '01'}</td>
          </tr>
          <tr>
            <td class="label">Username Login CBT</td>
            <td class="sep">:</td>
            <td class="val font-mono">${std.nis}</td>
          </tr>
          <tr>
            <td class="label">Password / Kode Akses</td>
            <td class="sep">:</td>
            <td class="val font-mono">Kode Unik Dinamis CBT</td>
          </tr>
        </table>
      </div>

      <div class="card-footer">
        <div class="qr-col">
          <div class="qr-box">
            <span>VALID</span>
            <small>CBT-SMPN12</small>
          </div>
          <span class="location-txt">Banjarbaru, Kalsel</span>
        </div>
        <div class="sig-col">
          <p class="sig-title">${principalTitle},</p>
          <div class="sig-space"></div>
          <p class="sig-name">${principalName}</p>
          <p class="sig-nip">NIP. ${principalNip}</p>
        </div>
      </div>
    </div>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kartu Peserta Ujian CBT - ${schoolSetting.name} (${titleSuffix})</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: #f1f5f9;
      color: #0f172a;
      line-height: 1.3;
    }
    .toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #1e293b;
      color: #fff;
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      z-index: 1000;
    }
    .toolbar h1 {
      font-size: 15px;
      font-weight: 700;
    }
    .toolbar-actions {
      display: flex;
      gap: 10px;
    }
    .btn {
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .btn-primary {
      background: #2563eb;
      color: #fff;
    }
    .btn-primary:hover {
      background: #1d4ed8;
    }
    .btn-secondary {
      background: #475569;
      color: #fff;
    }
    .btn-secondary:hover {
      background: #334155;
    }

    .page-wrap {
      max-width: 960px;
      margin: 70px auto 40px auto;
      padding: 20px;
    }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .card-container {
      background: #fff;
      border: 2px solid #0f172a;
      border-radius: 8px;
      padding: 14px;
      position: relative;
      page-break-inside: avoid;
      break-inside: avoid;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 2px solid #cbd5e1;
      padding-bottom: 8px;
      margin-bottom: 10px;
    }
    .logo-box {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid #cbd5e1;
      overflow: hidden;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
    }
    .logo-box img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .header-titles {
      text-align: center;
      flex: 1;
    }
    .header-titles h3 {
      font-size: 12px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .header-titles .school-name {
      font-size: 11px;
      font-weight: 700;
      color: #1e3a8a;
      text-transform: uppercase;
    }
    .header-titles .school-sub {
      font-size: 9px;
      color: #64748b;
    }

    .student-info-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      margin-bottom: 10px;
    }
    .student-info-table td {
      padding: 3px 2px;
      vertical-align: top;
    }
    .student-info-table .label {
      width: 42%;
      color: #475569;
      font-size: 10px;
    }
    .student-info-table .sep {
      width: 4%;
      text-align: center;
      color: #94a3b8;
    }
    .student-info-table .val {
      width: 54%;
      color: #0f172a;
    }
    .font-mono {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .font-bold {
      font-weight: 700;
    }
    .highlight {
      font-weight: 800;
      color: #0f172a;
    }
    .text-blue {
      color: #1d4ed8;
    }

    .card-footer {
      border-top: 1px dashed #cbd5e1;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .qr-col {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .qr-box {
      border: 1px solid #94a3b8;
      border-radius: 4px;
      padding: 3px 6px;
      font-size: 9px;
      font-weight: 700;
      background: #f8fafc;
      text-align: center;
      color: #334155;
    }
    .qr-box small {
      display: block;
      font-size: 7px;
      color: #64748b;
    }
    .location-txt {
      font-size: 9px;
      color: #64748b;
    }
    .sig-col {
      text-align: right;
    }
    .sig-title {
      font-size: 9px;
      color: #64748b;
    }
    .sig-space {
      height: 28px;
    }
    .sig-name {
      font-size: 10.5px;
      font-weight: 700;
      text-decoration: underline;
      color: #0f172a;
    }
    .sig-nip {
      font-size: 8.5px;
      color: #64748b;
      font-family: ui-monospace, monospace;
    }

    @media print {
      body {
        background: #fff;
      }
      .toolbar {
        display: none !important;
      }
      .page-wrap {
        margin: 0;
        padding: 0;
        max-width: 100%;
      }
      .cards-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }
      .card-container {
        box-shadow: none;
        border-color: #000;
      }
      @page {
        size: A4 portrait;
        margin: 8mm 8mm 8mm 8mm;
      }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <h1>Kartu Peserta Ujian CBT &bull; ${schoolSetting.name} (${students.length} Siswa)</h1>
    <div class="toolbar-actions">
      <button class="btn btn-primary" onclick="window.print()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 6 2 18 2 18 9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
        Cetak / Simpan PDF
      </button>
      <button class="btn btn-secondary" onclick="window.close()">Tutup</button>
    </div>
  </div>

  <div class="page-wrap">
    <div class="cards-grid">
      ${cardsHtml}
    </div>
  </div>
</body>
</html>`;
}

/**
 * Initiates direct download of exam card(s) as a complete standalone HTML document file.
 */
export function downloadExamCardsAsHtml(
  students: Student[],
  schoolSetting: SchoolSetting,
  filename: string,
  titleSuffix?: string
): void {
  const htmlContent = generateExamCardsHtml(students, schoolSetting, titleSuffix || filename);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.html') ? filename : `${filename}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

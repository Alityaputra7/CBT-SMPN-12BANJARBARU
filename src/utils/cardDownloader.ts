import { Student, SchoolSetting } from '../types/cbt';

function chunkIntoPages<T>(items: T[], pageSize: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += pageSize) {
    pages.push(items.slice(i, i + pageSize));
  }
  return pages;
}

/**
 * Generates an official standalone printable HTML document for student exam cards.
 * Layout: Exact 6 cards per A4 portrait page (CSS Grid 2 columns x 3 rows) with anti-cut rules.
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

  const renderSingleCard = (std: Student) => `
    <div class="card-container">
      <div>
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

        <table class="student-info-table">
          <tr>
            <td class="label">Nomor Induk Siswa (NIS)</td>
            <td class="sep">:</td>
            <td class="val highlight font-mono">${std.nis}</td>
          </tr>
          <tr>
            <td class="label">Nama Lengkap Peserta</td>
            <td class="sep">:</td>
            <td class="val font-bold student-name">${std.name}</td>
          </tr>
          <tr>
            <td class="label">Kelas / Rombel</td>
            <td class="sep">:</td>
            <td class="val">${std.className}</td>
          </tr>
          <tr>
            <td class="label">Ruang Ujian</td>
            <td class="sep">:</td>
            <td class="val">${std.roomNumber || 'Ruang 01'}</td>
          </tr>
          <tr>
            <td class="label">Nomor Bangku</td>
            <td class="sep">:</td>
            <td class="val font-bold text-blue">${std.seatNumber || '01'}</td>
          </tr>
          <tr>
            <td class="label">Username / Login</td>
            <td class="sep">:</td>
            <td class="val font-mono">${std.nis} (Token Pengawas)</td>
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
  `;

  const pages = chunkIntoPages(students, 6);
  const pagesHtml = pages
    .map(
      (pageStudents) => `
    <div class="print-page">
      ${pageStudents.map(renderSingleCard).join('\n')}
    </div>`
    )
    .join('\n');

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
      background-color: #e2e8f0;
      color: #0f172a;
      line-height: 1.25;
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
      font-size: 14px;
      font-weight: 700;
    }
    .toolbar-sub {
      font-size: 11px;
      color: #94a3b8;
      margin-top: 2px;
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
      margin: 76px auto 40px auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    /* A4 Sheet Preview & Print Page: Exact 2 columns x 3 rows = 6 cards */
    .print-page {
      width: 210mm;
      min-height: 297mm;
      padding: 10mm;
      background: #ffffff;
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.12);
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-template-rows: repeat(3, 86mm);
      gap: 5.5mm;
      align-content: start;
      page-break-after: always;
      break-after: page;
    }
    .print-page:last-child {
      page-break-after: auto;
      break-after: auto;
    }

    .card-container {
      height: 86mm;
      background: #fff;
      border: 1.75px solid #0f172a;
      border-radius: 6px;
      padding: 3.5mm 4mm;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 5px;
      margin-bottom: 6px;
    }
    .logo-box {
      width: 34px;
      height: 34px;
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
      font-size: 11px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: 0.4px;
      text-transform: uppercase;
    }
    .header-titles .school-name {
      font-size: 10px;
      font-weight: 700;
      color: #1e3a8a;
      text-transform: uppercase;
    }
    .header-titles .school-sub {
      font-size: 8px;
      color: #64748b;
    }

    .student-info-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10px;
    }
    .student-info-table td {
      padding: 2px 1px;
      vertical-align: top;
    }
    .student-info-table .label {
      width: 40%;
      color: #475569;
      font-size: 9px;
    }
    .student-info-table .sep {
      width: 4%;
      text-align: center;
      color: #94a3b8;
    }
    .student-info-table .val {
      width: 56%;
      color: #0f172a;
    }
    .student-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 46mm;
      display: inline-block;
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
      padding-top: 5px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .qr-col {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .qr-box {
      border: 1px solid #94a3b8;
      border-radius: 3px;
      padding: 2px 5px;
      font-size: 8px;
      font-weight: 700;
      background: #f8fafc;
      text-align: center;
      color: #334155;
    }
    .qr-box small {
      display: block;
      font-size: 6.5px;
      color: #64748b;
    }
    .location-txt {
      font-size: 8px;
      color: #64748b;
    }
    .sig-col {
      text-align: right;
    }
    .sig-title {
      font-size: 8px;
      color: #64748b;
    }
    .sig-space {
      height: 18px;
    }
    .sig-name {
      font-size: 9.5px;
      font-weight: 700;
      text-decoration: underline;
      color: #0f172a;
    }
    .sig-nip {
      font-size: 8px;
      color: #64748b;
      font-family: ui-monospace, monospace;
    }

    @page {
      size: A4 portrait;
      margin: 10mm;
    }

    @media print {
      body {
        background: #fff;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .toolbar {
        display: none !important;
      }
      .page-wrap {
        margin: 0;
        padding: 0;
        gap: 0;
        display: block;
      }
      .print-page {
        width: 100%;
        min-height: auto;
        padding: 0;
        box-shadow: none;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: repeat(3, 86mm);
        gap: 5.5mm;
        page-break-after: always;
        break-after: page;
      }
      .print-page:last-child {
        page-break-after: auto;
        break-after: auto;
      }
      .card-container {
        box-shadow: none;
        border-color: #000;
        height: 86mm;
        break-inside: avoid;
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <div>
      <h1>Kartu Peserta Ujian CBT &bull; ${schoolSetting.name} (${students.length} Siswa &bull; ${pages.length} Halaman A4)</h1>
      <div class="toolbar-sub">Tata letak presisi: 6 Kartu per Halaman A4 Portrait (2 Kolom &times; 3 Baris, Anti-Terpotong)</div>
    </div>
    <div class="toolbar-actions">
      <button class="btn btn-primary" onclick="window.print()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 6 2 18 2 18 9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
        Cetak / Simpan PDF (6 Kartu/Hal)
      </button>
      <button class="btn btn-secondary" onclick="window.close()">Tutup</button>
    </div>
  </div>

  <div class="page-wrap">
    ${pagesHtml}
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

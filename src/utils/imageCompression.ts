/**
 * Client-side HTML5 Canvas image compression utility for CBT Question & Option images.
 * - Accepts JPG, PNG, WEBP, SVG (rasterizes SVG safely onto canvas to strip scripts & ensure consistency)
 * - Resizes proportionally to maxWidth (default 800px)
 * - Compresses to WebP (quality 0.75) with automatic JPEG fallback if browser lacks WebP encoding
 * - Iteratively ensures output payload stays lightweight (< 100 KB) for low-bandwidth student devices
 */

export interface CompressedImageResult {
  dataUrl: string;
  width: number;
  height: number;
  originalSizeBytes: number;
  compressedSizeBytes: number;
  format: 'webp' | 'jpeg';
}

export interface CompressImageOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  maxBytes?: number;
}

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'image/gif',
  'image/bmp'
]);

const ALLOWED_EXTENSIONS = /\.(jpe?g|png|webp|svg|gif|bmp)$/i;

export function isSupportedImageFile(file: File | Blob): boolean {
  if (file.type && ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
    return true;
  }
  if ('name' in file && typeof file.name === 'string' && ALLOWED_EXTENSIONS.test(file.name)) {
    return true;
  }
  return false;
}

export function estimateDataUrlBytes(dataUrl: string): number {
  const commaIdx = dataUrl.indexOf(',');
  if (commaIdx < 0) return dataUrl.length;
  const base64 = dataUrl.slice(commaIdx + 1);
  const padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;
  return Math.max(0, Math.floor((base64.length * 3) / 4) - padding);
}

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1).replace('.', ',')} KB`;
  return `${(kb / 1024).toFixed(2).replace('.', ',')} MB`;
}

function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Gagal membaca file gambar. Pastikan file tidak rusak.'));
    img.src = src;
  });
}

function readBlobAsDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Gagal mengonversi file gambar.'));
      }
    };
    reader.onerror = () => reject(new Error('Gagal membaca file gambar.'));
    reader.readAsDataURL(blob);
  });
}

function encodeCanvas(
  canvas: HTMLCanvasElement,
  quality: number
): { dataUrl: string; format: 'webp' | 'jpeg' } {
  const webpUrl = canvas.toDataURL('image/webp', quality);
  if (webpUrl.startsWith('data:image/webp')) {
    return { dataUrl: webpUrl, format: 'webp' };
  }
  const jpegUrl = canvas.toDataURL('image/jpeg', quality);
  return { dataUrl: jpegUrl, format: 'jpeg' };
}

export async function compressImageFile(
  file: File | Blob,
  options: CompressImageOptions = {}
): Promise<CompressedImageResult> {
  if (!isSupportedImageFile(file)) {
    throw new Error('Format gambar tidak didukung. Gunakan file JPG, PNG, WEBP, atau SVG.');
  }

  // Guard against excessively large raw files (> 15 MB) before decoding in browser memory
  const MAX_RAW_BYTES = 15 * 1024 * 1024;
  if (file.size > MAX_RAW_BYTES) {
    throw new Error('Ukuran file asli terlalu besar (maksimal 15 MB).');
  }

  const maxWidth = options.maxWidth ?? 800;
  const maxHeight = options.maxHeight ?? 1000;
  const initialQuality = options.quality ?? 0.75;
  const maxBytes = options.maxBytes ?? 98 * 1024; // Target strictly < 100 KB

  const rawDataUrl = await readBlobAsDataUrl(file);
  const img = await loadImageElement(rawDataUrl);

  const naturalWidth = img.naturalWidth || img.width || 800;
  const naturalHeight = img.naturalHeight || img.height || 600;

  const renderAtScale = (
    targetMaxW: number,
    targetMaxH: number,
    quality: number
  ): { dataUrl: string; width: number; height: number; bytes: number; format: 'webp' | 'jpeg' } => {
    const scale = Math.min(1, targetMaxW / naturalWidth, targetMaxH / naturalHeight);
    const width = Math.max(1, Math.round(naturalWidth * scale));
    const height = Math.max(1, Math.round(naturalHeight * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas browser tidak tersedia untuk kompresi gambar.');
    }

    // Fill crisp white background so transparent PNG/SVG diagrams stay clearly legible
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, width, height);

    const encoded = encodeCanvas(canvas, quality);
    const bytes = estimateDataUrlBytes(encoded.dataUrl);
    return {
      dataUrl: encoded.dataUrl,
      width,
      height,
      bytes,
      format: encoded.format
    };
  };

  // Pass 1: exact requested maxWidth (800px) & quality (0.75)
  let best = renderAtScale(maxWidth, maxHeight, initialQuality);

  // Pass 2: if still > maxBytes (~98 KB), gently step down quality
  const qualitySteps = [0.65, 0.55, 0.45, 0.38];
  for (const q of qualitySteps) {
    if (best.bytes <= maxBytes) break;
    best = renderAtScale(maxWidth, maxHeight, q);
  }

  // Pass 3: if very dense screenshot still > maxBytes, gently scale down width while keeping text sharp
  const widthSteps = [
    Math.min(maxWidth, 680),
    Math.min(maxWidth, 560),
    Math.min(maxWidth, 460)
  ];
  for (const w of widthSteps) {
    if (best.bytes <= maxBytes) break;
    best = renderAtScale(w, maxHeight, 0.62);
    if (best.bytes > maxBytes) {
      best = renderAtScale(w, maxHeight, 0.48);
    }
  }

  return {
    dataUrl: best.dataUrl,
    width: best.width,
    height: best.height,
    originalSizeBytes: file.size || estimateDataUrlBytes(rawDataUrl),
    compressedSizeBytes: best.bytes,
    format: best.format
  };
}

/**
 * Extracts the first image File from a React/DOM ClipboardEvent (Ctrl+V / Cmd+V).
 */
export function extractImageFileFromClipboardEvent(
  e: ClipboardEvent | React.ClipboardEvent
): File | null {
  const clipboardData = e.clipboardData;
  if (!clipboardData) return null;

  if (clipboardData.items && clipboardData.items.length > 0) {
    for (let i = 0; i < clipboardData.items.length; i++) {
      const item = clipboardData.items[i];
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) return file;
      }
    }
  }

  if (clipboardData.files && clipboardData.files.length > 0) {
    for (let i = 0; i < clipboardData.files.length; i++) {
      const file = clipboardData.files[i];
      if (isSupportedImageFile(file)) return file;
    }
  }

  return null;
}

/**
 * Attempts to read an image directly from the system clipboard via the async Clipboard API.
 */
export async function readImageFileFromNavigatorClipboard(): Promise<File | null> {
  if (typeof navigator === 'undefined' || !navigator.clipboard || !navigator.clipboard.read) {
    return null;
  }
  const items = await navigator.clipboard.read();
  for (const item of items) {
    const imgType = item.types.find(t => t.startsWith('image/'));
    if (imgType) {
      const blob = await item.getType(imgType);
      const ext = imgType.split('/')[1]?.replace('+xml', '') || 'png';
      return new File([blob], `clipboard-image.${ext}`, { type: imgType });
    }
  }
  return null;
}

import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ImageZoomModalProps {
  src: string | null;
  alt?: string;
  caption?: string;
  onClose: () => void;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  src,
  alt = 'Pratinjau Gambar',
  caption,
  onClose
}) => {
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    setScale(1);
  }, [src]);

  useEffect(() => {
    if (!src) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        setScale(prev => Math.min(3, +(prev + 0.25).toFixed(2)));
      } else if (e.key === '-') {
        setScale(prev => Math.max(0.75, +(prev - 0.25).toFixed(2)));
      } else if (e.key === '0') {
        setScale(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [src, onClose]);

  if (!src) return null;

  const zoomIn = () => setScale(prev => Math.min(3, +(prev + 0.25).toFixed(2)));
  const zoomOut = () => setScale(prev => Math.max(0.75, +(prev - 0.25).toFixed(2)));
  const resetZoom = () => setScale(1);

  return (
    <div
      className="fixed inset-0 z-[120] bg-slate-950/90 backdrop-blur-xs flex flex-col select-none"
      onClick={onClose}
      onContextMenu={e => e.preventDefault()}
      role="dialog"
      aria-modal="true"
      aria-label={caption || alt}
    >
      {/* Top Controls Bar */}
      <div
        className="flex items-center justify-between gap-3 px-4 py-3 bg-slate-900/90 border-b border-slate-800 text-white shrink-0"
        onClick={e => e.stopPropagation()}
      >
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-semibold truncate">{caption || alt}</p>
          <p className="text-[11px] text-slate-400">
            Gunakan tombol +/- untuk memperbesar detail angka atau teks gambar
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={zoomOut}
            disabled={scale <= 0.75}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-colors cursor-pointer"
            title="Perkecil (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={resetZoom}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono font-semibold text-white transition-colors cursor-pointer inline-flex items-center gap-1"
            title="Reset ukuran (100%)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{Math.round(scale * 100)}%</span>
          </button>
          <button
            type="button"
            onClick={zoomIn}
            disabled={scale >= 3}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-colors cursor-pointer"
            title="Perbesar (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-1.5 p-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer"
            title="Tutup (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable / Zoomable Image Canvas */}
      <div
        className="flex-1 overflow-auto flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        <div
          className="inline-flex items-center justify-center transition-transform duration-150 ease-out"
          onClick={e => e.stopPropagation()}
        >
          <img
            src={src}
            alt={alt}
            draggable={false}
            style={{
              width: scale === 1 ? 'auto' : `${Math.round(scale * 100)}%`,
              maxWidth: scale === 1 ? '92vw' : 'none',
              maxHeight: scale === 1 ? '78vh' : 'none'
            }}
            className="object-contain rounded-xl bg-white shadow-2xl border border-slate-700 select-none"
          />
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="px-4 py-2 text-center text-[11px] text-slate-400 bg-slate-900/70 border-t border-slate-800 shrink-0">
        Ketuk area gelap di luar gambar atau tombol <strong className="text-white">Tutup</strong> untuk kembali ke soal
      </div>
    </div>
  );
};

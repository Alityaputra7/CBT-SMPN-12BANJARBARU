import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export interface MathFormulaPreset {
  label: string;
  latex: string;
  title: string;
}

interface MathFormulaCategory {
  id: string;
  label: string;
  items: MathFormulaPreset[];
}

const MATH_FORMULA_CATEGORIES: MathFormulaCategory[] = [
  {
    id: 'all',
    label: 'Semua Populer',
    items: [
      { label: 'a/b', latex: '$\\frac{a}{b}$', title: 'Pecahan sebaris: $\\frac{a}{b}$' },
      { label: 'x²', latex: '$x^{2}$', title: 'Pangkat kuadrat: $x^{2}$' },
      { label: 'x₁', latex: '$x_{1}$', title: 'Indeks bawah (subscript): $x_{1}$' },
      { label: '√x', latex: '$\\sqrt{x}$', title: 'Akar kuadrat: $\\sqrt{x}$' },
      { label: 'ⁿ√x', latex: '$\\sqrt[n]{x}$', title: 'Akar pangkat n: $\\sqrt[n]{x}$' },
      { label: 'sin θ', latex: '$\\sin \\theta$', title: 'Sinus: $\\sin \\theta$' },
      { label: 'cos θ', latex: '$\\cos \\theta$', title: 'Cosinus: $\\cos \\theta$' },
      { label: 'tan θ', latex: '$\\tan \\theta$', title: 'Tangen: $\\tan \\theta$' },
      { label: 'logₐ b', latex: '$\\log_{a} b$', title: 'Logaritma: $\\log_{a} b$' },
      { label: 'lim', latex: '$\\lim_{x \\to a}$', title: 'Limit: $\\lim_{x \\to a}$' },
      { label: '∑', latex: '$\\sum_{i=1}^{n}$', title: 'Sigma (Penjumlahan): $\\sum_{i=1}^{n}$' },
      { label: '∫', latex: '$\\int_{a}^{b}$', title: 'Integral tentu: $\\int_{a}^{b}$' },
      { label: 'π', latex: '$\\pi$', title: 'Pi: $\\pi$' },
      { label: 'α', latex: '$\\alpha$', title: 'Alfa: $\\alpha$' },
      { label: 'β', latex: '$\\beta$', title: 'Beta: $\\beta$' },
      { label: 'θ', latex: '$\\theta$', title: 'Teta: $\\theta$' },
      { label: '±', latex: '$\\pm$', title: 'Plus-minus: $\\pm$' },
      { label: '×', latex: '$\\times$', title: 'Kali: $\\times$' },
      { label: '÷', latex: '$\\div$', title: 'Bagi: $\\div$' },
      { label: '≤', latex: '$\\leq$', title: 'Kurang dari atau sama dengan: $\\leq$' },
      { label: '≥', latex: '$\\geq$', title: 'Lebih dari atau sama dengan: $\\geq$' },
      { label: '≠', latex: '$\\neq$', title: 'Tidak sama dengan: $\\neq$' },
      { label: '≈', latex: '$\\approx$', title: 'Hampir sama dengan: $\\approx$' },
      { label: '∞', latex: '$\\infty$', title: 'Tak hingga: $\\infty$' },
      { label: '°', latex: '$^{\\circ}$', title: 'Derajat: $^{\\circ}$' },
    ],
  },
  {
    id: 'pecahan_akar',
    label: 'Pecahan & Akar',
    items: [
      { label: 'a/b (sebaris)', latex: '$\\frac{a}{b}$', title: 'Pecahan sebaris' },
      { label: 'a/b (blok)', latex: '$$\\frac{a}{b}$$', title: 'Pecahan besar (blok tengah)' },
      { label: 'x²', latex: '$x^{2}$', title: 'Pangkat dua' },
      { label: 'xⁿ', latex: '$x^{n}$', title: 'Pangkat n' },
      { label: 'x₁', latex: '$x_{1}$', title: 'Indeks bawah' },
      { label: 'xᵢⁿ', latex: '$x_{i}^{n}$', title: 'Indeks dan pangkat' },
      { label: '√x', latex: '$\\sqrt{x}$', title: 'Akar kuadrat' },
      { label: 'ⁿ√x', latex: '$\\sqrt[n]{x}$', title: 'Akar pangkat n' },
    ],
  },
  {
    id: 'trig_log',
    label: 'Trigonometri & Log',
    items: [
      { label: 'sin θ', latex: '$\\sin \\theta$', title: 'Sinus' },
      { label: 'cos θ', latex: '$\\cos \\theta$', title: 'Cosinus' },
      { label: 'tan θ', latex: '$\\tan \\theta$', title: 'Tangen' },
      { label: 'sin² θ', latex: '$\\sin^{2} \\theta$', title: 'Sinus kuadrat' },
      { label: 'logₐ b', latex: '$\\log_{a} b$', title: 'Logaritma basis a' },
      { label: 'ln x', latex: '$\\ln x$', title: 'Logaritma natural' },
      { label: '90°', latex: '$90^{\\circ}$', title: 'Sudut derajat' },
      { label: 'π rad', latex: '$\\pi\\text{ rad}$', title: 'Radian' },
    ],
  },
  {
    id: 'kalkulus',
    label: 'Kalkulus & Matriks',
    items: [
      { label: 'lim x→a', latex: '$\\lim_{x \\to a}$', title: 'Limit fungsi' },
      { label: '∑ i=1..n', latex: '$\\sum_{i=1}^{n}$', title: 'Notasi Sigma' },
      { label: '∫ a..b', latex: '$\\int_{a}^{b}$', title: 'Integral tentu' },
      { label: 'dy/dx', latex: '$\\frac{dy}{dx}$', title: 'Turunan pertama' },
      {
        label: 'Matriks 2×2',
        latex: '$$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$$',
        title: 'Matriks 2x2',
      },
      {
        label: 'Matriks 3×3',
        latex: '$$\\begin{pmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{pmatrix}$$',
        title: 'Matriks 3x3',
      },
      {
        label: 'Sistem Persamaan',
        latex: '$$\\begin{cases} ax + by = c \\\\ dx + ey = f \\end{cases}$$',
        title: 'Sistem persamaan linear',
      },
    ],
  },
  {
    id: 'simbol',
    label: 'Simbol Matematika',
    items: [
      { label: 'π', latex: '$\\pi$', title: 'Pi' },
      { label: 'α', latex: '$\\alpha$', title: 'Alfa' },
      { label: 'β', latex: '$\\beta$', title: 'Beta' },
      { label: 'θ', latex: '$\\theta$', title: 'Teta' },
      { label: '±', latex: '$\\pm$', title: 'Plus minus' },
      { label: '×', latex: '$\\times$', title: 'Perkalian' },
      { label: '÷', latex: '$\\div$', title: 'Pembagian' },
      { label: '·', latex: '$\\cdot$', title: 'Titik kali' },
      { label: '≤', latex: '$\\leq$', title: 'Kurang dari atau sama dengan' },
      { label: '≥', latex: '$\\geq$', title: 'Lebih dari atau sama dengan' },
      { label: '≠', latex: '$\\neq$', title: 'Tidak sama dengan' },
      { label: '≈', latex: '$\\approx$', title: 'Hampir sama dengan' },
      { label: '∞', latex: '$\\infty$', title: 'Tak hingga' },
      { label: '°', latex: '$^{\\circ}$', title: 'Derajat' },
      { label: '→', latex: '$\\to$', title: 'Panah menuju' },
      { label: '∈', latex: '$\\in$', title: 'Elemen himpunan' },
      { label: '∪', latex: '$\\cup$', title: 'Gabungan himpunan' },
      { label: '∩', latex: '$\\cap$', title: 'Irisan himpunan' },
    ],
  },
];

interface MathFormulaToolbarProps {
  onInsert: (latex: string) => void;
  activeTargetLabel: string;
}

export const MathFormulaToolbar: React.FC<MathFormulaToolbarProps> = ({
  onInsert,
  activeTargetLabel,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const currentCat =
    MATH_FORMULA_CATEGORIES.find(c => c.id === activeCategory) || MATH_FORMULA_CATEGORIES[0];

  return (
    <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 font-semibold text-slate-800 text-xs">
          <Calculator className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Toolbar Sisipkan Rumus Matematika (KaTeX)</span>
        </div>
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
          Target sisip: <strong>{activeTargetLabel}</strong>
        </span>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-1">
        {MATH_FORMULA_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Formula Shortcut Buttons */}
      <div className="flex flex-wrap gap-1.5 pt-0.5">
        {currentCat.items.map((sym, idx) => (
          <button
            key={`${currentCat.id}-${idx}`}
            type="button"
            onMouseDown={e => {
              // Prevent button click from stealing focus away from active input/textarea
              e.preventDefault();
            }}
            onClick={() => onInsert(sym.latex)}
            title={`${sym.title} — Klik untuk menyisipkan ${sym.latex}`}
            className="px-2.5 py-1 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-800 active:scale-[0.98] text-slate-800 rounded-lg border border-slate-200 text-xs font-mono font-semibold transition-all cursor-pointer shadow-2xs"
          >
            {sym.label}
          </button>
        ))}
      </div>

      <p className="text-[10px] text-slate-500 leading-snug">
        Klik kolom <strong>Teks Pertanyaan</strong>, <strong>Opsi Jawaban (A–E)</strong>, <strong>Pasangan</strong>, atau <strong>Rubrik/Kunci</strong> terlebih dahulu, lalu klik tombol rumus di atas untuk menyisipkan tepat di posisi kursor. Gunakan <code className="bg-slate-200/70 px-1 rounded">$...$</code> untuk rumus sebaris atau <code className="bg-slate-200/70 px-1 rounded">$$...$$</code> untuk rumus blok.
      </p>
    </div>
  );
};

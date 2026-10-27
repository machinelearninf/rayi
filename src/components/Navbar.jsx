import React from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid, BookOpen, Sparkles } from 'lucide-react';

export default function Navbar({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  isGridView,
  onToggleGrid,
  onGoToPage
}) {
  return (
    <header className="navbar-fixed-top">
      <div className="navbar-inner max-w-4xl mx-auto flex items-center justify-between px-3 sm:px-6 py-2.5">
        
        {/* Brand / Title */}
        <div
          className="flex items-center gap-1.5 cursor-pointer"
          onClick={() => onGoToPage(1)}
          title="Ke halaman pertama"
        >
          <span className="text-base sm:text-lg">🎂</span>
          <div className="flex flex-col text-left">
            <span className="font-serif font-bold text-xs sm:text-sm text-[#7A1C1C] leading-none">
              Rayi & Keisya
            </span>
            <span className="text-[9px] text-stone-500 font-mono leading-tight">
              22nd Birthday Album
            </span>
          </div>
        </div>

        {/* Center: Flip Controls (When in Book Mode) */}
        {!isGridView ? (
          <div className="flex items-center gap-2 sm:gap-3 bg-stone-100/90 py-1 px-2 sm:px-3 rounded-full border border-stone-200 shadow-sm">
            <button
              type="button"
              onClick={onPrev}
              disabled={currentPage <= 1}
              className="p-1 rounded-full text-stone-700 hover:text-[#7A1C1C] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Halaman sebelumnya"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="text-xs font-mono font-semibold text-stone-800 min-w-[50px] text-center">
              {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              onClick={onNext}
              disabled={currentPage >= totalPages}
              className="p-1 rounded-full text-stone-700 hover:text-[#7A1C1C] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Halaman selanjutnya"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          <span className="text-xs font-mono text-stone-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Mode Grid Poster
          </span>
        )}

        {/* Right: Grid View Toggle */}
        <button
          type="button"
          onClick={onToggleGrid}
          className="flex items-center gap-1 py-1 px-2.5 rounded-full bg-[#7A1C1C] text-white text-[11px] font-sans font-medium hover:bg-[#631414] transition-colors shadow-sm"
          title={isGridView ? "Kembali ke mode buku" : "Lihat semua halaman dalam bentuk grid"}
        >
          {isGridView ? (
            <>
              <BookOpen size={13} />
              <span className="hidden sm:inline">Mode Buku</span>
            </>
          ) : (
            <>
              <LayoutGrid size={13} />
              <span className="hidden sm:inline">Lihat Semua</span>
            </>
          )}
        </button>

      </div>
    </header>
  );
}

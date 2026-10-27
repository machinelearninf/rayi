import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Page01Cover({ data }) {
  return (
    <div className="scrap-card card-bg-red flex flex-col items-center justify-between p-6 relative overflow-hidden select-none">
      {/* Background ambient stars */}
      <div className="absolute top-4 left-4 text-amber-200/40 text-xs">✦</div>
      <div className="absolute top-8 right-6 text-amber-200/40 text-sm">★</div>
      <div className="absolute bottom-6 left-6 text-amber-200/40 text-sm">✧</div>
      <div className="absolute bottom-12 right-6 text-amber-200/40 text-xs">✦</div>

      {/* Top Header */}
      <div className="text-center mt-3 z-10">
        <span className="text-amber-100/70 tracking-widest text-[10px] uppercase font-sans">
          Special Edition · 28.10
        </span>
        <h1 className="font-script text-white text-4xl sm:text-5xl mt-1 drop-shadow-md">
          Happy Birthday
        </h1>
      </div>

      {/* Eye-Slit Cutout Horizontal Window (Matches Reference Card 1) */}
      <div className="eye-slit-container my-4 z-10 w-full max-w-[240px]">
        <div className="eye-slit-border">
          <div className="eye-slit-inner">
            <img
              src={data.coverHero}
              alt="Rayi Eyes / Us"
              className="eye-slit-img"
            />
          </div>
        </div>
      </div>

      {/* Bottom Subtitle & Name */}
      <div className="text-center mb-4 z-10">
        <h2 className="font-serif text-amber-50 text-2xl sm:text-3xl font-semibold tracking-wide">
          Rayi Rizkia
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="h-[1px] w-6 bg-amber-200/40"></span>
          <p className="font-sans text-xs text-amber-200/80 font-light tracking-wider">
            my favorite guy <Heart size={11} className="inline text-rose-300 fill-rose-300 ml-0.5" />
          </p>
          <span className="h-[1px] w-6 bg-amber-200/40"></span>
        </div>
        <span className="inline-block mt-3 px-3 py-0.5 rounded-full bg-black/25 text-amber-100/80 text-[10px] font-mono border border-amber-200/20">
          from: Keisya ♡
        </span>
      </div>
    </div>
  );
}

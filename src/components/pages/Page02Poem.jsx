import React from 'react';

export default function Page02Poem() {
  return (
    <div className="scrap-card card-bg-cream flex flex-col justify-center items-center p-8 text-center relative select-none">
      {/* Subtle vintage ruled paper texture */}
      <div className="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none"></div>

      <div className="relative z-10 max-w-[280px]">
        <h3 className="font-typewriter text-[#3C1F1F] text-sm tracking-wide font-bold mb-6">
          Happy birthday Rayi &lt;3
        </h3>

        <div className="font-typewriter text-[#4A2828] text-xs sm:text-sm leading-relaxed space-y-4">
          <p>
            I will love you as long as the sun burns in the sky, as long as the moon shines its light into the dark night, until the raging blue oceans become calm and run dry.
          </p>
          <p>
            I will love you until the end of time.
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-[#3C1F1F]/20 flex items-center justify-between text-[10px] font-typewriter text-[#768153]">
          <span>28 · 10 · 2004</span>
          <span>forever & always</span>
        </div>
      </div>
    </div>
  );
}

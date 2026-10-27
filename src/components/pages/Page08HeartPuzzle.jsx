import React from 'react';

export default function Page08HeartPuzzle({ data }) {
  return (
    <div className="scrap-card card-bg-red flex flex-col justify-between items-center p-6 text-center select-none">
      {/* Top Text */}
      <div className="mt-2">
        <p className="font-mono text-amber-100/90 text-xs tracking-wide">
          You're the missing piece of my heart
        </p>
      </div>

      {/* Heart Puzzle Mosaic (Matches Reference Card 8) */}
      <div className="heart-puzzle-grid my-auto">
        {/* Row 1 */}
        <div className="flex justify-center gap-1.5">
          <div className="puzzle-piece w-10 h-10 bg-[#FFF8EE] rounded-sm"></div>
          <div className="puzzle-piece w-10 h-10 bg-[#FFF8EE] rounded-sm"></div>
          <div className="puzzle-piece w-10 h-10 bg-[#FFF8EE] rounded-sm"></div>
        </div>

        {/* Row 2 (Widest row of the heart) */}
        <div className="flex justify-center gap-1.5 my-1.5">
          <div className="puzzle-piece w-10 h-10 bg-[#FFF8EE] rounded-sm"></div>
          <div className="puzzle-piece w-10 h-10 bg-[#FFF8EE] rounded-sm overflow-hidden border border-amber-200">
            <img src={data.coupleUs} alt="us" className="w-full h-full object-cover opacity-90" />
          </div>
          <div className="puzzle-piece w-10 h-10 bg-[#FFF8EE] rounded-sm overflow-hidden border border-amber-200">
            <img src={data.littleRayi} alt="rayi" className="w-full h-full object-cover opacity-90" />
          </div>
          <div className="puzzle-piece w-10 h-10 bg-[#FFF8EE] rounded-sm"></div>
        </div>

        {/* Row 3 */}
        <div className="flex justify-center gap-1.5 mb-1.5">
          <div className="puzzle-piece w-10 h-10 bg-[#FFF8EE] rounded-sm"></div>
          <div className="puzzle-piece w-10 h-10 bg-[#FFF8EE] rounded-sm"></div>
        </div>

        {/* Row 4 (Bottom tip of the heart) */}
        <div className="flex justify-center">
          <div className="puzzle-piece w-9 h-9 bg-[#FFF8EE] rounded-sm"></div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mb-2">
        <p className="font-mono text-amber-100/80 text-[11px] tracking-wide">
          and now I finally feel complete ♡
        </p>
      </div>
    </div>
  );
}

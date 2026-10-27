import React from 'react';

export default function Page09CheersLife({ data }) {
  const s = data.roundStickers;

  return (
    <div className="scrap-card card-bg-cream flex flex-col justify-around p-6 text-center select-none">
      {/* Line 1: [1] Cheers [2] to more */}
      <div className="flex items-center justify-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#3C1F1F]/40 shadow-sm shrink-0">
          <img src={s[0]} alt="sticker 1" className="w-full h-full object-cover" />
        </div>
        <span className="font-sans font-bold text-[#3C1F1F] text-xs sm:text-sm">Cheers</span>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#3C1F1F]/40 shadow-sm shrink-0">
          <img src={s[1]} alt="sticker 2" className="w-full h-full object-cover" />
        </div>
        <span className="font-sans font-medium text-[#3C1F1F] text-xs sm:text-sm">to more</span>
      </div>

      {/* Line 2: [3] overpriced [4] foods & drinks */}
      <div className="flex items-center justify-center gap-2">
        <span className="font-sans font-bold text-[#7A1C1C] text-xs sm:text-sm">overpriced</span>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#3C1F1F]/40 shadow-sm shrink-0">
          <img src={s[2]} alt="sticker 3" className="w-full h-full object-cover" />
        </div>
        <span className="font-sans font-medium text-[#3C1F1F] text-xs sm:text-sm">foods & drinks</span>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#3C1F1F]/40 shadow-sm shrink-0">
          <img src={s[3]} alt="sticker 4" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Line 3: [5] for the [6] rest of our */}
      <div className="flex items-center justify-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#3C1F1F]/40 shadow-sm shrink-0">
          <img src={s[4]} alt="sticker 5" className="w-full h-full object-cover" />
        </div>
        <span className="font-sans font-medium text-[#3C1F1F] text-xs sm:text-sm">for the</span>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#3C1F1F]/40 shadow-sm shrink-0">
          <img src={s[5]} alt="sticker 6" className="w-full h-full object-cover" />
        </div>
        <span className="font-sans font-medium text-[#3C1F1F] text-xs sm:text-sm">rest of our</span>
      </div>

      {/* Line 4: [7] Silly little lives [8] */}
      <div className="flex items-center justify-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#3C1F1F]/40 shadow-sm shrink-0">
          <img src={s[6]} alt="sticker 7" className="w-full h-full object-cover" />
        </div>
        <span className="font-script text-[#7A1C1C] text-xl sm:text-2xl font-bold">
          Silly little lives
        </span>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#3C1F1F]/40 shadow-sm shrink-0">
          <img src={s[7]} alt="sticker 8" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

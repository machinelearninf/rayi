import React from 'react';
import { Star } from 'lucide-react';

export default function Page03Stars({ data }) {
  const p = data.relationshipStory;

  return (
    <div className="scrap-card card-bg-white flex flex-col justify-between p-6 relative overflow-hidden select-none">
      {/* Scattered Gold Star Stickers */}
      <Star size={14} className="absolute top-4 left-6 text-amber-400 fill-amber-400" />
      <Star size={14} className="absolute top-4 right-6 text-amber-400 fill-amber-400" />
      <Star size={12} className="absolute top-1/3 left-3 text-amber-400 fill-amber-400" />
      <Star size={12} className="absolute top-2/3 right-3 text-amber-400 fill-amber-400" />
      <Star size={14} className="absolute bottom-5 left-5 text-amber-400 fill-amber-400" />
      <Star size={14} className="absolute bottom-5 right-5 text-amber-400 fill-amber-400" />

      {/* Grid of Words and Photos */}
      <div className="my-auto flex flex-col items-center justify-center gap-3 w-full">
        
        {/* Row 1: I [photo] HOPE */}
        <div className="flex items-center justify-center gap-3 w-full">
          <span className="font-sans font-bold text-[#7A1C1C] text-sm tracking-widest">I</span>
          <div className="mini-polaroid-frame w-14 h-14 bg-white p-1 shadow-sm border border-stone-200 rotate-[-2deg]">
            <img src={p[0]?.src} alt="us" className="w-full h-full object-cover" />
          </div>
          <span className="font-sans font-bold text-[#7A1C1C] text-sm tracking-widest">HOPE</span>
        </div>

        {/* Row 2: [photo] OUR [photo] */}
        <div className="flex items-center justify-center gap-3 w-full">
          <div className="mini-polaroid-frame w-12 h-12 bg-white p-1 shadow-sm border border-stone-200 rotate-[3deg]">
            <img src={p[1]?.src} alt="us" className="w-full h-full object-cover" />
          </div>
          <span className="font-sans font-extrabold text-[#7A1C1C] text-base tracking-widest">OUR</span>
          <div className="mini-polaroid-frame w-12 h-12 bg-white p-1 shadow-sm border border-stone-200 rotate-[-3deg]">
            <img src={p[2]?.src} alt="us" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Row 3: RELATIONSHIP */}
        <div className="text-center">
          <span className="font-sans font-black text-[#7A1C1C] text-lg sm:text-xl tracking-wider">
            RELATIONSHIP
          </span>
        </div>

        {/* Row 4: WILL [photo] LAST */}
        <div className="flex items-center justify-center gap-3 w-full">
          <span className="font-sans font-bold text-[#7A1C1C] text-sm tracking-widest">WILL</span>
          <div className="mini-polaroid-frame w-14 h-14 bg-white p-1 shadow-sm border border-stone-200 rotate-[2deg]">
            <img src={p[3]?.src} alt="us" className="w-full h-full object-cover" />
          </div>
          <span className="font-sans font-bold text-[#7A1C1C] text-sm tracking-widest">LAST</span>
        </div>

        {/* Row 5: FOREVER */}
        <div className="text-center mt-1">
          <span className="font-sans font-black text-[#7A1C1C] text-lg sm:text-xl tracking-widest">
            FOREVER
          </span>
        </div>

      </div>
    </div>
  );
}

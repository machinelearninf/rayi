import React from 'react';
import { Star } from 'lucide-react';

export default function Page10RetroScrapbook({ data }) {
  return (
    <div className="scrap-card card-bg-white flex flex-col justify-between p-5 relative select-none overflow-hidden">
      {/* Top Badge */}
      <div className="flex justify-center">
        <span className="px-2 py-0.5 bg-[#7A1C1C] text-white text-[9px] font-mono tracking-widest uppercase rounded-sm">
          HONEYBEE
        </span>
      </div>

      {/* Photo 1 with Star Badge */}
      <div className="relative my-auto flex justify-center">
        {/* Red star badge on top left */}
        <div className="absolute -top-3 left-4 w-7 h-7 bg-[#7A1C1C] text-amber-200 flex items-center justify-center rounded-sm rotate-12 shadow-sm text-xs font-bold z-10">
          ★
        </div>

        <div className="w-[85%] aspect-[16/10] rounded-full overflow-hidden border-2 border-[#7A1C1C] p-1 bg-white shadow-md">
          <img
            src={data.coverHero}
            alt="Rayi and Keisya"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Middle Tag */}
      <div className="flex justify-center -my-1 z-10">
        <span className="px-3 py-0.5 bg-[#7A1C1C] text-white text-[9px] font-mono tracking-widest rounded-sm shadow-sm">
          LOVE U &lt;3
        </span>
      </div>

      {/* Photo 2 with Yellow Star Sticker */}
      <div className="relative my-auto flex justify-center">
        <div className="w-[85%] aspect-[16/10] rounded-full overflow-hidden border-2 border-[#7A1C1C] p-1 bg-white shadow-md">
          <img
            src={data.littleRayi}
            alt="Little Rayi"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Yellow star badge on bottom right */}
        <Star size={20} className="absolute -bottom-2 right-4 text-amber-400 fill-amber-400 z-10 drop-shadow-sm" />
      </div>

      {/* Bottom Badge */}
      <div className="flex justify-center">
        <span className="px-2 py-0.5 bg-[#7A1C1C] text-white text-[9px] font-mono tracking-widest uppercase rounded-sm">
          PRETTIEST
        </span>
      </div>
    </div>
  );
}

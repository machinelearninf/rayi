import React from 'react';

export default function Page12OvalPortrait({ data }) {
  return (
    <div className="scrap-card card-bg-red bg-polkadot-white flex flex-col justify-center items-center p-6 relative select-none">
      {/* Vintage Ornate Lacy Scalloped Frame (Matches Reference Card 12) */}
      <div className="vintage-lace-outer p-3.5 bg-white shadow-xl max-w-[210px] w-full aspect-[4/5] flex items-center justify-center">
        {/* Scalloped dot edge inside */}
        <div className="vintage-lace-inner w-full h-full p-2 border-2 border-dashed border-[#7A1C1C]/40 flex items-center justify-center">
          {/* Oval Cutout Photo */}
          <div className="w-full h-full rounded-full overflow-hidden border border-stone-300 shadow-inner">
            <img
              src={data.coverHero}
              alt="Rayi Portrait"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <span className="font-serif text-amber-100 text-xs tracking-wider italic">
          — my favorite person in the entire world ♡
        </span>
      </div>
    </div>
  );
}

import React from 'react';

export default function Page07Letter4Photos({ data }) {
  const m = data.fourMemories;

  return (
    <div className="scrap-card card-bg-white flex flex-col justify-between p-5 relative select-none">
      {/* Top 2 Photos */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center">
          <div className="w-full aspect-[4/3] bg-stone-100 p-1 border border-stone-300 shadow-sm">
            <img src={m[0]?.src} alt="Memory 1" className="w-full h-full object-cover" />
          </div>
          <span className="text-[9px] font-mono text-stone-500 mt-0.5">[1]</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full aspect-[4/3] bg-stone-100 p-1 border border-stone-300 shadow-sm">
            <img src={m[1]?.src} alt="Memory 2" className="w-full h-full object-cover" />
          </div>
          <span className="text-[9px] font-mono text-stone-500 mt-0.5">[2]</span>
        </div>
      </div>

      {/* Middle Typewriter Paragraph */}
      <div className="my-3 px-2 text-center">
        <p className="font-typewriter text-[#3C1F1F] text-[10.5px] sm:text-xs leading-relaxed">
          I love you. Today. Tonight. Tomorrow. Forever. If I were to live a thousand years, I would belong to you for all of them. If I were to live a thousand lives, I would want to make you mine in each one.
        </p>
      </div>

      {/* Bottom 2 Photos */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center">
          <div className="w-full aspect-[4/3] bg-stone-100 p-1 border border-stone-300 shadow-sm">
            <img src={m[2]?.src} alt="Memory 3" className="w-full h-full object-cover" />
          </div>
          <span className="text-[9px] font-mono text-stone-500 mt-0.5">[3]</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full aspect-[4/3] bg-stone-100 p-1 border border-stone-300 shadow-sm">
            <img src={m[3]?.src} alt="Memory 4" className="w-full h-full object-cover" />
          </div>
          <span className="text-[9px] font-mono text-stone-500 mt-0.5">[4]</span>
        </div>
      </div>
    </div>
  );
}

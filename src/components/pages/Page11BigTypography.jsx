import React from 'react';

export default function Page11BigTypography({ data }) {
  return (
    <div className="scrap-card card-bg-cream flex flex-col justify-center items-center p-6 text-center select-none">
      <div className="font-sans font-black text-[#7A1C1C] text-sm sm:text-base tracking-widest leading-loose max-w-[240px]">
        <p>TELL ME IF YOU</p>
        <p>NEED ME AND</p>
        <p>CALL ME IF YOU</p>
        <p>FEELING ALONE</p>

        <div className="flex items-center justify-center gap-2 my-2">
          <span>CAUSE</span>
          <div className="w-12 h-12 rounded-sm overflow-hidden border border-[#7A1C1C] shadow-sm shrink-0">
            <img src={data.coupleUs} alt="I'm here" className="w-full h-full object-cover" />
          </div>
          <span>I'M</span>
        </div>

        <p>HERE. I'M</p>
        <p>ALWAYS RIGHT</p>
        <p>HERE.</p>
      </div>
    </div>
  );
}

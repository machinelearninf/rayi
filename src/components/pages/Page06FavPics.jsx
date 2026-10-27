import React from 'react';

export default function Page06FavPics({ data }) {
  const pics = data.favPictures;

  return (
    <div className="scrap-card card-bg-red flex flex-col justify-between p-5 relative select-none">
      {/* Title */}
      <div className="text-center mb-2">
        <h3 className="font-mono text-amber-100/90 text-xs tracking-widest font-semibold uppercase">
          MY FAVORITE PICTURES
        </h3>
      </div>

      {/* 3x3 Grid (9 Photos with [1] to [9] labels) */}
      <div className="grid grid-cols-3 gap-2 my-auto w-full">
        {pics.map((item, idx) => (
          <div key={item.id} className="flex flex-col items-center">
            <div className="w-full aspect-square bg-black/30 rounded-sm overflow-hidden border border-amber-200/30 shadow-sm">
              <img
                src={item.src}
                alt={item.caption || `Pic ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <span className="text-[9px] font-mono text-amber-200/80 mt-1">
              [{idx + 1}]
            </span>
          </div>
        ))}
      </div>

      {/* Footer Tag */}
      <div className="text-right mt-2">
        <span className="text-[9px] font-mono text-amber-200/70 tracking-widest">
          PRETTY BF ♡
        </span>
      </div>
    </div>
  );
}

import React from 'react';

export default function Page04Home({ data }) {
  return (
    <div className="scrap-card card-bg-red flex flex-col items-center justify-between p-8 relative overflow-hidden select-none">
      {/* Top Header */}
      <div className="text-center mt-2 z-10">
        <h2 className="font-serif text-amber-50 text-2xl font-bold tracking-wide">
          You are
        </h2>
      </div>

      {/* House Silhouette Graphic with Photo Cutout (Matches Reference Card 4) */}
      <div className="house-graphic-wrapper my-auto z-10">
        <div className="house-roof"></div>
        <div className="house-body">
          <div className="house-window-cutout">
            <img
              src={data.coupleUs}
              alt="Rayi and Keisya Home"
              className="house-photo"
            />
          </div>
        </div>
      </div>

      {/* Bottom Subtitle */}
      <div className="text-center mb-2 z-10">
        <p className="text-amber-100 text-lg font-sans">
          my <span className="font-script text-amber-300 text-3xl font-bold ml-1">Home</span>
        </p>
      </div>
    </div>
  );
}

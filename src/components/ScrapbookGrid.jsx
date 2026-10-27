import React from 'react';
import { Eye, Sparkles } from 'lucide-react';
import Page01Cover from './pages/Page01Cover';
import Page02Poem from './pages/Page02Poem';
import Page03Stars from './pages/Page03Stars';
import Page04Home from './pages/Page04Home';
import Page05Constellation from './pages/Page05Constellation';
import Page06FavPics from './pages/Page06FavPics';
import Page07Letter4Photos from './pages/Page07Letter4Photos';
import Page08HeartPuzzle from './pages/Page08HeartPuzzle';
import Page09CheersLife from './pages/Page09CheersLife';
import Page10RetroScrapbook from './pages/Page10RetroScrapbook';
import Page11BigTypography from './pages/Page11BigTypography';
import Page12OvalPortrait from './pages/Page12OvalPortrait';
import Page13BirthdayCandle from './pages/Page13BirthdayCandle';
import Page14LoveLetterWA from './pages/Page14LoveLetterWA';
import { PHOTOS } from '../data/scrapbookData';

export default function ScrapbookGrid({ onSelectPage }) {
  const cards = [
    { id: 1, title: "Cover · Happy Birthday", comp: <Page01Cover data={PHOTOS} /> },
    { id: 2, title: "Love Poem · End of Time", comp: <Page02Poem data={PHOTOS} /> },
    { id: 3, title: "Stars · Hope Our Relationship", comp: <Page03Stars data={PHOTOS} /> },
    { id: 4, title: "You Are My Home", comp: <Page04Home data={PHOTOS} /> },
    { id: 5, title: "Constellation · To The Moon", comp: <Page05Constellation data={PHOTOS} /> },
    { id: 6, title: "My Favorite Pictures", comp: <Page06FavPics data={PHOTOS} /> },
    { id: 7, title: "Today, Tomorrow, Forever", comp: <Page07Letter4Photos data={PHOTOS} /> },
    { id: 8, title: "Heart Puzzle · Complete", comp: <Page08HeartPuzzle data={PHOTOS} /> },
    { id: 9, title: "Cheers To Silly Lives", comp: <Page09CheersLife data={PHOTOS} /> },
    { id: 10, title: "Honeybee & Prettiest", comp: <Page10RetroScrapbook data={PHOTOS} /> },
    { id: 11, title: "Tell Me If You Need Me", comp: <Page11BigTypography data={PHOTOS} /> },
    { id: 12, title: "My Favorite Person", comp: <Page12OvalPortrait data={PHOTOS} /> },
    { id: 13, title: "🎂 Blow The Candle 22!", comp: <Page13BirthdayCandle data={PHOTOS} /> },
    { id: 14, title: "💌 Surat Cinta & Balas WA", comp: <Page14LoveLetterWA data={PHOTOS} /> },
  ];

  return (
    <div className="grid-overview-container p-4 sm:p-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest font-mono text-[#7A1C1C] font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
          Digital Scrapbook · Rayi & Keisya
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#7A1C1C] font-bold mt-2">
          Our Story in Pages ♡
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
          Klik salah satu kartu untuk memperbesar dan membuka halaman interaktifnya ✨
        </p>
      </div>

      {/* Responsive Grid Matching Reference Image Poster Style */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => onSelectPage(card.id)}
            className="grid-card-item cursor-pointer group flex flex-col"
          >
            {/* Card Preview Container with 3:4 Aspect Ratio */}
            <div className="card-aspect-wrap relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-md group-hover:shadow-xl group-hover:-translate-y-1.5 transition-all duration-300 border border-stone-200">
              
              {/* Scaled Miniature View */}
              <div className="miniature-scaler absolute inset-0 w-full h-full pointer-events-none">
                {card.comp}
              </div>

              {/* Hover Overlay with Eye Icon */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-medium backdrop-blur-[1px]">
                <Eye size={16} /> Buka Halaman {card.id}
              </div>

              {/* Page Number Pill */}
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 text-white rounded-full text-[10px] font-mono backdrop-blur-sm z-20">
                #{card.id}
              </span>
            </div>

            {/* Title Underneath */}
            <p className="text-[11px] font-sans font-medium text-stone-700 text-center mt-2 group-hover:text-[#7A1C1C] transition-colors truncate">
              {card.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

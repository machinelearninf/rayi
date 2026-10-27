import React, { useState, useRef, useEffect } from 'react';
import PasscodeGate from './components/PasscodeGate';
import VinylPlayer from './components/VinylPlayer';
import Navbar from './components/Navbar';
import ScrapbookGrid from './components/ScrapbookGrid';

import Page01Cover from './components/pages/Page01Cover';
import Page02Poem from './components/pages/Page02Poem';
import Page03Stars from './components/pages/Page03Stars';
import Page04Home from './components/pages/Page04Home';
import Page05Constellation from './components/pages/Page05Constellation';
import Page06FavPics from './components/pages/Page06FavPics';
import Page07Letter4Photos from './components/pages/Page07Letter4Photos';
import Page08HeartPuzzle from './components/pages/Page08HeartPuzzle';
import Page09CheersLife from './components/pages/Page09CheersLife';
import Page10RetroScrapbook from './components/pages/Page10RetroScrapbook';
import Page11BigTypography from './components/pages/Page11BigTypography';
import Page12OvalPortrait from './components/pages/Page12OvalPortrait';
import Page13BirthdayCandle from './components/pages/Page13BirthdayCandle';
import Page14LoveLetterWA from './components/pages/Page14LoveLetterWA';

import { CONFIG, PHOTOS } from './data/scrapbookData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridView, setIsGridView] = useState(false);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);

  const totalPages = 14;

  const pages = [
    <Page01Cover data={PHOTOS} />,
    <Page02Poem data={PHOTOS} />,
    <Page03Stars data={PHOTOS} />,
    <Page04Home data={PHOTOS} />,
    <Page05Constellation data={PHOTOS} />,
    <Page06FavPics data={PHOTOS} />,
    <Page07Letter4Photos data={PHOTOS} />,
    <Page08HeartPuzzle data={PHOTOS} />,
    <Page09CheersLife data={PHOTOS} />,
    <Page10RetroScrapbook data={PHOTOS} />,
    <Page11BigTypography data={PHOTOS} />,
    <Page12OvalPortrait data={PHOTOS} />,
    <Page13BirthdayCandle data={PHOTOS} />,
    <Page14LoveLetterWA data={PHOTOS} />
  ];

  // Passcode unlock callback
  const handleUnlocked = (wasAlreadyUnlocked) => {
    if (!wasAlreadyUnlocked) {
      // User entered PIN manually -> start playing background music
      setAutoPlayMusic(true);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    setIsGridView(false);
  };

  // Keyboard navigation (Left / Right Arrow)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isGridView) return;
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isGridView]);

  // Touch Swipe Gesture Support for Mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isGridView) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextPage(); // swipe left -> next page
      } else {
        prevPage(); // swipe right -> prev page
      }
    }
  };

  return (
    <div className="app-main-viewport">
      {/* 1. Passcode Gate Overlay */}
      <PasscodeGate onUnlocked={handleUnlocked} correctPin={CONFIG.pin} />

      {/* 2. Top Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={prevPage}
        onNext={nextPage}
        isGridView={isGridView}
        onToggleGrid={() => setIsGridView(!isGridView)}
        onGoToPage={goToPage}
      />

      {/* 3. Main Stage Content */}
      <main className="stage-content-area">
        {isGridView ? (
          <ScrapbookGrid onSelectPage={goToPage} />
        ) : (
          <div
            className="single-page-book-stage"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Desktop Left Nav Arrow */}
            <button
              type="button"
              className="page-nav-arrow arrow-left hidden sm:flex"
              onClick={prevPage}
              disabled={currentPage <= 1}
              aria-label="Previous Page"
            >
              <ChevronLeft size={28} />
            </button>

            {/* The Active Scrapbook Page (3:4 Aspect Ratio Card) */}
            <div className="active-card-container animate-fade-in" key={currentPage}>
              {pages[currentPage - 1]}
            </div>

            {/* Desktop Right Nav Arrow */}
            <button
              type="button"
              className="page-nav-arrow arrow-right hidden sm:flex"
              onClick={nextPage}
              disabled={currentPage >= totalPages}
              aria-label="Next Page"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        )}
      </main>

      {/* 4. Bottom Mobile Quick-Nav Buttons */}
      {!isGridView && (
        <div className="sm:hidden fixed bottom-4 left-0 right-0 z-40 flex items-center justify-center gap-3 px-4 pointer-events-none">
          <button
            type="button"
            onClick={prevPage}
            disabled={currentPage <= 1}
            className="pointer-events-auto bg-stone-900/80 text-white p-2.5 rounded-full shadow-lg backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Prev"
          >
            <ChevronLeft size={18} />
          </button>
          
          <span className="pointer-events-auto bg-white/90 text-stone-800 font-mono text-xs font-semibold px-3 py-1.5 rounded-full shadow-md border border-stone-200">
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            onClick={nextPage}
            disabled={currentPage >= totalPages}
            className="pointer-events-auto bg-stone-900/80 text-white p-2.5 rounded-full shadow-lg backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* 5. Floating Vinyl Music Player (Sal Priadi — Serta Mulia) */}
      <VinylPlayer
        audioSrc={CONFIG.bgmSrc}
        autoPlayTrigger={autoPlayMusic}
      />
    </div>
  );
}

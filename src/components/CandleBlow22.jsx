import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, RefreshCw, Heart } from 'lucide-react';

export default function CandleBlow22() {
  const [isBlown, setIsBlown] = useState(false);
  const [showWishMessage, setShowWishMessage] = useState(false);

  // Play synthesized gentle celebration chime using Web Audio API
  const playChime = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.7);
      });
    } catch (e) {
      console.log("Audio synth error:", e);
    }
  };

  const handleBlow = () => {
    if (isBlown) return;
    setIsBlown(true);
    playChime();

    // Trigger fireworks / confetti celebration
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#7A1C1C', '#DCA037', '#FFF8EE', '#768153', '#E84A5F']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    setTimeout(() => {
      setShowWishMessage(true);
    }, 600);
  };

  const handleRelight = () => {
    setIsBlown(false);
    setShowWishMessage(false);
  };

  return (
    <div className="candle-stage-container">
      <div className="candle-header-tag">
        <span className="bday-badge">HAPPY 22ND BIRTHDAY</span>
      </div>

      <h2 className="candle-title">Make a Wish & Blow The Candle</h2>
      <p className="candle-subtitle">
        {isBlown
          ? "Yay! Lilinnya sudah ditiup! Harapanmu sedang terbang ke langit ♡"
          : "Pikirkan 1 doa terbaikmu, lalu ketuk lilin angka 22 untuk meniupnya 🎂"}
      </p>

      {/* Birthday Cake and Number 22 Candles */}
      <div className="cake-and-candles-wrapper">
        <div className="cake-display" onClick={!isBlown ? handleBlow : undefined}>
          
          {/* Numbers 2 and 2 Candles */}
          <div className="number-candles-row">
            
            {/* Digit 2 (Left) */}
            <div className="candle-num-unit">
              {/* Flame or Smoke */}
              {!isBlown ? (
                <div className="flame-element flame-left">
                  <div className="flame-core"></div>
                  <div className="flame-glow"></div>
                </div>
              ) : (
                <div className="smoke-element">
                  <span className="smoke-puff s1"></span>
                  <span className="smoke-puff s2"></span>
                </div>
              )}
              <div className="candle-wick"></div>
              <div className="candle-digit digit-gold">2</div>
            </div>

            {/* Digit 2 (Right) */}
            <div className="candle-num-unit">
              {/* Flame or Smoke */}
              {!isBlown ? (
                <div className="flame-element flame-right">
                  <div className="flame-core"></div>
                  <div className="flame-glow"></div>
                </div>
              ) : (
                <div className="smoke-element">
                  <span className="smoke-puff s1"></span>
                  <span className="smoke-puff s2"></span>
                </div>
              )}
              <div className="candle-wick"></div>
              <div className="candle-digit digit-gold">2</div>
            </div>

          </div>

          {/* Cake Top Tier */}
          <div className="cake-tier cake-tier-top">
            <div className="cake-frosting-drips">
              <span className="drip"></span>
              <span className="drip"></span>
              <span className="drip"></span>
              <span className="drip"></span>
              <span className="drip"></span>
            </div>
            <div className="cake-strawberry-decor">🍓 🤍 🍓</div>
          </div>

          {/* Cake Bottom Tier */}
          <div className="cake-tier cake-tier-base">
            <div className="cake-ribbon"></div>
          </div>

          {/* Plate Stand */}
          <div className="cake-stand-plate"></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="candle-controls-row">
        {!isBlown ? (
          <button
            type="button"
            className="btn-blow-candle"
            onClick={handleBlow}
          >
            <Flame className="inline mr-1 text-amber-300" size={18} />
            Tiup Lilin 22 Sekarang ✦
          </button>
        ) : (
          <button
            type="button"
            className="btn-relight-candle"
            onClick={handleRelight}
          >
            <RefreshCw className="inline mr-1 text-amber-700" size={16} />
            Nyalakan Lilin Kembali
          </button>
        )}
      </div>

      {/* Wish Message Box (Opens after blowing) */}
      {showWishMessage && (
        <div className="wish-granted-banner">
          <div className="wish-banner-inner">
            <Sparkles className="wish-star-icon" size={24} />
            <h3 className="wish-banner-title">Wish Granted! ✨</h3>
            <p className="wish-banner-text">
              "Selamat ulang tahun yang ke-22, Rayi sayang. Semoga di umur yang baru ini kamu selalu sehat,
              kuliah teknik listriknya semakin lancar, Persib juara, dan semua impian besarmu terkabul satu per satu.
              Aku selalu bangga dan sayang sama kamu!"
            </p>
            <p className="wish-banner-from">— Peluk hangat dari Keisya <Heart size={14} className="inline text-rose-500 fill-rose-500" /></p>
          </div>
        </div>
      )}
    </div>
  );
}

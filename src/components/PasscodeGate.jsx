import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Sparkles, Delete, X } from 'lucide-react';

export default function PasscodeGate({ onUnlocked, correctPin = "281004" }) {
  const [pin, setPin] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Cek jika sudah pernah unlock dalam sesi ini
    if (sessionStorage.getItem('rayi_bday_unlocked') === 'true') {
      setIsUnlocked(true);
      onUnlocked(true); // pass true indicating already unlocked
    }
  }, []);

  const handleInput = (digit) => {
    if (pin.length < 6 && !isSuccess) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setIsError(false);

      if (nextPin.length === 6) {
        verify(nextPin);
      }
    }
  };

  const handleBackspace = () => {
    if (pin.length > 0 && !isSuccess) {
      setPin(pin.slice(0, -1));
      setIsError(false);
    }
  };

  const handleClear = () => {
    setPin("");
    setIsError(false);
  };

  const verify = (inputPin) => {
    if (inputPin === correctPin) {
      setIsSuccess(true);
      sessionStorage.setItem('rayi_bday_unlocked', 'true');
      setTimeout(() => {
        setIsFading(true);
        setTimeout(() => {
          setIsUnlocked(true);
          onUnlocked(false); // newly unlocked -> trigger auto play
        }, 700);
      }, 700);
    } else {
      setIsError(true);
      setTimeout(() => {
        setPin("");
        setIsError(false);
      }, 800);
    }
  };

  // Keyboard support for desktop
  useEffect(() => {
    if (isUnlocked) return;
    const handleKeyDown = (e) => {
      if (/^[0-9]$/.test(e.key)) {
        handleInput(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, isUnlocked, isSuccess]);

  if (isUnlocked) return null;

  return (
    <div className={`passcode-gate ${isFading ? 'gate-fade-out' : ''}`}>
      <div className="gate-backdrop"></div>
      
      <div className={`passcode-card ${isError ? 'card-shake' : ''} ${isSuccess ? 'card-success' : ''}`}>
        <div className="tape tape-top"></div>
        
        <div className="lock-icon-wrap">
          {isSuccess ? (
            <Unlock className="lock-icon unlocked" size={32} />
          ) : (
            <Lock className="lock-icon" size={32} />
          )}
        </div>

        <p className="card-sub-header">surat rahasia dari keisya ♡</p>
        <h2 className="card-title">Masukkan PIN</h2>
        <p className="card-clue">
          <Sparkles size={14} className="inline mr-1 text-amber-500" />
          clue: tanggal lahir kamu (DDMMYY)
        </p>

        {/* 6 Dots Indicator */}
        <div className="pin-dots-row">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`pin-dot ${i < pin.length ? 'filled' : ''} ${isSuccess ? 'success' : ''}`}
            />
          ))}
        </div>

        {/* Error / Success Message */}
        <div className="pin-status-msg">
          {isError && <span className="text-red-700">PIN salah nih sayang, coba lagi ya ♡</span>}
          {isSuccess && <span className="text-emerald-700 font-semibold">PIN benar! Membuka scrapbook... ✨</span>}
        </div>

        {/* Keypad */}
        <div className="pin-keypad-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              type="button"
              className="keypad-btn"
              onClick={() => handleInput(num.toString())}
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            className="keypad-btn keypad-func"
            onClick={handleClear}
            title="Hapus Semua"
          >
            <X size={18} />
          </button>
          <button
            type="button"
            className="keypad-btn"
            onClick={() => handleInput("0")}
          >
            0
          </button>
          <button
            type="button"
            className="keypad-btn keypad-func"
            onClick={handleBackspace}
            title="Hapus Satu"
          >
            <Delete size={18} />
          </button>
        </div>

        <p className="card-footer-note">hanya untuk Rayi Rizkia 🤍</p>
      </div>
    </div>
  );
}

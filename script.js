/* ══════════════════════════════════════════════
   SCRAPBOOK JOURNALING — RAYI RIZKIA
   JS: Album navigation, click-to-print photobooth,
       clear vintage envelope unseal, vinyl player (sal.mp3),
       message board, age calc
   ══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initPasscodeGate();
  calcAge();
  initReveal();
  initScrapbookAlbum();
  initClickToPrintPhotobooth();
  initVintageEnvelope();
  initVinylPlayer();
  initMessageBoard();
  initBirthdayCake();
  initScrollNavigation();
  initCalendarInteractions();
  initConstellationPuzzle();
  initCalendarDay28Modal();
});

/* ── 0. Passcode Gate (PIN: 281004) ── */
function initPasscodeGate() {
  const gate = document.getElementById('passcodeGate');
  const card = document.getElementById('passcodeCard');
  const lockIcon = document.getElementById('passcodeLockIcon');
  const dots = document.querySelectorAll('.pin-dot');
  const errorMsg = document.getElementById('pinErrorMsg');
  const keys = document.querySelectorAll('.pin-key[data-val]');
  const clearBtn = document.getElementById('pinClearBtn');
  const backspaceBtn = document.getElementById('pinBackspaceBtn');
  if (!gate) return;

  const CORRECT_PIN = '281004';
  let currentPin = '';
  let isChecking = false;

  // Check if previously unlocked in this session
  if (sessionStorage.getItem('rayi_birthday_unlocked') === 'true') {
    gate.style.display = 'none';
    document.body.classList.remove('passcode-active');
    return;
  }
  document.body.classList.add('passcode-active');

  function updateDots() {
    dots.forEach((dot, idx) => {
      if (idx < currentPin.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled', 'success');
      }
    });
  }

  function handleInput(val) {
    if (isChecking) return;
    if (currentPin.length < 6) {
      currentPin += val;
      updateDots();
      if (errorMsg) errorMsg.textContent = '';

      if (currentPin.length === 6) {
        verifyPin();
      }
    }
  }

  function handleBackspace() {
    if (isChecking) return;
    if (currentPin.length > 0) {
      currentPin = currentPin.slice(0, -1);
      updateDots();
      if (errorMsg) errorMsg.textContent = '';
    }
  }

  function handleClear() {
    if (isChecking) return;
    currentPin = '';
    updateDots();
    if (errorMsg) errorMsg.textContent = '';
  }

  function verifyPin() {
    isChecking = true;
    if (currentPin === CORRECT_PIN) {
      // SUCCESS
      dots.forEach(d => d.classList.add('success'));
      if (lockIcon) lockIcon.textContent = '🔓';
      if (errorMsg) {
        errorMsg.style.color = '#768153';
        errorMsg.textContent = 'PIN benar! Membuka surat cinta... ♡';
      }

      sessionStorage.setItem('rayi_birthday_unlocked', 'true');

      // Autoplay music & celebration confetti after unlocking
      const audio = document.getElementById('bgmAudio');
      if (audio) {
        audio.play().then(() => {
          const vinylDisc = document.getElementById('vinylDisc');
          const vinylWidget = document.getElementById('vinylWidget');
          const playIcon = document.getElementById('playIcon');
          const playText = document.getElementById('playText');
          if (playIcon) playIcon.textContent = '❚❚';
          if (playText) playText.textContent = 'Pause Lagu';
          if (vinylDisc) vinylDisc.classList.add('spinning');
          if (vinylWidget) vinylWidget.classList.add('playing');
        }).catch(err => console.log('Autoplay:', err));
      }

      if (window.confetti) {
        window.confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      setTimeout(() => {
        gate.classList.add('unlocked');
        document.body.classList.remove('passcode-active');
        setTimeout(() => {
          gate.style.display = 'none';
        }, 600);
      }, 700);
    } else {
      // WRONG PIN
      if (card) card.classList.add('shake');
      if (errorMsg) {
        errorMsg.style.color = '#872828';
        errorMsg.textContent = 'PIN salah nih sayang, coba lagi ya ♡';
      }

      setTimeout(() => {
        if (card) card.classList.remove('shake');
        currentPin = '';
        updateDots();
        isChecking = false;
      }, 750);
    }
  }

  // Keypad button clicks
  keys.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-val');
      if (val) handleInput(val);
    });
  });

  if (clearBtn) clearBtn.addEventListener('click', handleClear);
  if (backspaceBtn) backspaceBtn.addEventListener('click', handleBackspace);

  // Keyboard typing support (laptop / desktop)
  window.addEventListener('keydown', (e) => {
    if (gate.classList.contains('unlocked') || gate.style.display === 'none') return;
    if (/^[0-9]$/.test(e.key)) {
      handleInput(e.key);
    } else if (e.key === 'Backspace') {
      handleBackspace();
    } else if (e.key === 'Escape') {
      handleClear();
    }
  });
}

/* ── 1. Interactive Scrapbook Album Book ── */
function initScrapbookAlbum() {
  const spreads = document.querySelectorAll('.album-spread');
  const dots = document.querySelectorAll('.album-dots .dot');
  const prevBtn = document.getElementById('albumPrev');
  const nextBtn = document.getElementById('albumNext');
  if (!spreads.length) return;

  let currentPage = 1;
  const totalPages = spreads.length;

  function goToPage(page) {
    if (page < 1) page = totalPages;
    if (page > totalPages) page = 1;
    currentPage = page;

    spreads.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    const currentSpread = document.querySelector(`.album-spread[data-page="${currentPage}"]`);
    const currentDot = document.querySelector(`.album-dots .dot[data-index="${currentPage}"]`);

    if (currentSpread) currentSpread.classList.add('active');
    if (currentDot) currentDot.classList.add('active');
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(idx)) goToPage(idx);
    });
  });

  spreads.forEach(s => {
    s.addEventListener('click', (e) => {
      if (!e.target.closest('.album-controls')) {
        goToPage(currentPage + 1);
      }
    });
  });
}

/* ── 2. Photobooth: Click to Eject (No Looping!) ── */
function initClickToPrintPhotobooth() {
  const printBtn = document.getElementById('printTriggerBtn');
  const paper = document.getElementById('photostripPaper');
  const led = document.getElementById('printerLed');
  const statusText = document.getElementById('printerStatusText');
  if (!printBtn || !paper) return;

  printBtn.addEventListener('click', () => {
    printBtn.disabled = true;

    if (statusText) statusText.textContent = 'PRINTING...';
    if (led) {
      led.style.background = '#872828';
      led.style.boxShadow = '0 0 10px #872828';
    }

    paper.classList.remove('ejected');
    void paper.offsetWidth; // trigger reflow
    paper.classList.add('ejected');

    setTimeout(() => {
      if (statusText) statusText.textContent = 'PRINTED 🤍';
      if (led) {
        led.style.background = '#a3b86c';
        led.style.boxShadow = '0 0 10px #a3b86c';
      }
      printBtn.innerHTML = '<span class="btn-print-icon">↻</span> Cetak Ulang Foto Strip';
      printBtn.disabled = false;
    }, 1400);
  });
}

/* ── 3. Clear Vintage Envelope (Surat Keluar dari Amplop) ── */
function initVintageEnvelope() {
  const envelopeCard = document.getElementById('vintageEnvelopeCard');
  const letterCard = document.getElementById('unfoldedLetterCard');
  const sealBtn = document.getElementById('waxSealBtn');
  const openBtn = document.getElementById('openEnvelopeBtn');
  const closeBtn = document.getElementById('closeEnvelopeBtn');

  function openLetter() {
    if (!envelopeCard || !letterCard) return;
    envelopeCard.style.opacity = '0';
    envelopeCard.style.transform = 'scale(0.95)';
    setTimeout(() => {
      envelopeCard.style.display = 'none';
      letterCard.classList.remove('hidden-letter');
      letterCard.classList.add('visible-letter');
    }, 300);
  }

  function closeLetter() {
    if (!envelopeCard || !letterCard) return;
    letterCard.classList.remove('visible-letter');
    letterCard.classList.add('hidden-letter');
    setTimeout(() => {
      envelopeCard.style.display = 'flex';
      void envelopeCard.offsetWidth;
      envelopeCard.style.opacity = '1';
      envelopeCard.style.transform = 'scale(1)';
    }, 200);
  }

  if (sealBtn) sealBtn.addEventListener('click', openLetter);
  if (envelopeCard) envelopeCard.addEventListener('click', openLetter);
  if (closeBtn) closeBtn.addEventListener('click', closeLetter);
}

/* ── 4. Vinyl Music Player (Sal Priadi — Serta Mulia via assets/sal.mp3) ── */
function initVinylPlayer() {
  const audio = document.getElementById('bgmAudio');
  const playBtn = document.getElementById('vinylPlayBtn');
  const playIcon = document.getElementById('playIcon');
  const playText = document.getElementById('playText');
  const vinylDisc = document.getElementById('vinylDisc');
  const vinylWidget = document.getElementById('vinylWidget');
  if (!playBtn || !audio) return;

  function setPlayingState(playing) {
    if (playing) {
      playIcon.textContent = '❚❚';
      playText.textContent = 'Pause Lagu';
      if (vinylDisc) vinylDisc.classList.add('spinning');
      if (vinylWidget) vinylWidget.classList.add('playing');
    } else {
      playIcon.textContent = '▶';
      playText.textContent = 'Putar Lagu';
      if (vinylDisc) vinylDisc.classList.remove('spinning');
      if (vinylWidget) vinylWidget.classList.remove('playing');
    }
  }

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        setPlayingState(true);
      }).catch(err => {
        console.warn('Playback error:', err);
      });
    } else {
      audio.pause();
      setPlayingState(false);
    }
  });

  audio.addEventListener('play', () => setPlayingState(true));
  audio.addEventListener('pause', () => setPlayingState(false));
  audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    audio.play();
  });
}

/* ── 5. Age Calculator ── */
function calcAge() {
  const el = document.getElementById('ageNum');
  if (!el) return;
  el.textContent = '22';
}

/* ── 6. Scroll Reveal ── */
function initReveal() {
  const selectors = [
    '.polaroid', '.patch', '.torn-note', '.vintage-envelope-card',
    '.wish-card-memo', '.printer-box', '.age-circle', '.close-body',
    '.sec-title', '.sec-sub', '.msg-form', '.scrapbook-album',
    '.cake-showcase-card', '.birthday-cake-stage', '.typewriter-page-spread', '.stars-page-canvas',
    '.heart-mosaic-showcase', '.silly-page-canvas', '.vintage-oval-showcase', '.calendar-spread-book',
    '.memory-card', '.memories-grid-container', '.card-ten-things'
  ];

  selectors.forEach(s => {
    document.querySelectorAll(s).forEach(el => el.classList.add('reveal'));
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const siblings = Array.from(e.target.parentElement?.children || []);
        const idx = siblings.indexOf(e.target);
        const delay = Math.min(idx * 60, 300);
        setTimeout(() => e.target.classList.add('vis'), delay);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ── 7. Message Board ── */
function initMessageBoard() {
  const board = document.getElementById('msgBoard');
  const input = document.getElementById('msgInput');
  const btn = document.getElementById('msgSend');
  if (!board || !input || !btn) return;

  const KEY = 'rayi_bday_msgs';

  const getMsgs = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  };

  const saveMsgs = (m) => localStorage.setItem(KEY, JSON.stringify(m));

  const esc = (s) => {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  };

  function render() {
    const msgs = getMsgs();
    board.innerHTML = '';

    if (!msgs.length) {
      board.innerHTML = `<p style="font-family:var(--font-body);color:var(--text-dark);text-align:center;font-size:0.9rem;font-weight:500;">belum ada pesan... tulis sesuatu dong ♡</p>`;
      return;
    }

    msgs.forEach((m, i) => {
      const note = document.createElement('div');
      note.className = 'msg-note';
      note.innerHTML = `
        <p>${esc(m.text)}</p>
        <span class="mn-time">${m.time}</span>
        <button class="mn-del" data-i="${i}" title="hapus">✕</button>
      `;
      board.appendChild(note);
    });

    board.querySelectorAll('.mn-del').forEach(b => {
      b.addEventListener('click', () => {
        const msgs = getMsgs();
        msgs.splice(parseInt(b.dataset.i), 1);
        saveMsgs(msgs);
        render();
      });
    });
  }

  function send() {
    const text = input.value.trim();
    if (!text) return;
    const msgs = getMsgs();
    const now = new Date();
    const time = now.toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
    msgs.push({ text, time });
    saveMsgs(msgs);
    input.value = '';
    render();
    setTimeout(() => {
      const last = board.querySelector('.msg-note:last-child');
      if (last) last.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  btn.addEventListener('click', send);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });

  // WhatsApp send button
  const btnWa = document.getElementById('msgSendWa');
  if (btnWa) {
    btnWa.addEventListener('click', () => {
      const text = input.value.trim();
      if (!text) {
        alert('Tulis pesan balasan kamu dulu ya sayang ♡');
        return;
      }
      send();
      const encoded = encodeURIComponent('Halo Keisya sayang! ♡\n\nIni balasan surat ulang tahunku:\n"' + text + '"\n\nMakasih banyak ya sayangku! 🤍');
      window.open('https://wa.me/?text=' + encoded, '_blank');
    });
  }

  render();
}

/* ── 8. Aesthetic Interactive Birthday Cake: Make a Wish & Blow Candles ── */
function initBirthdayCake() {
  const cakeArea = document.getElementById('cakeInteractiveArea');
  const actionBtn = document.getElementById('cakeActionBtn');
  const actionIcon = document.getElementById('cakeActionIcon');
  const actionLabel = document.getElementById('cakeActionLabel');
  const actionHint = document.getElementById('cakeActionHint');
  const cakePhotoLit = document.getElementById('cakePhotoLit');
  const cakePhotoUnlit = document.getElementById('cakePhotoUnlit');
  const flames = document.querySelectorAll('.candle-flame, .c-flame');
  const smokes = document.querySelectorAll('.candle-smoke, .smoke-puff');
  const backGlow = document.getElementById('cakeBackGlow');
  const wishReveal = document.getElementById('cakeWishReveal');

  if (!actionBtn && !cakeArea) return;

  let isBlownOut = false;

  // Gentle blowing sound + magical chime using Web Audio API
  function playWishChime(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'blow') {
        // Soft breath / puff noise
        const bufferSize = ctx.sampleRate * 0.35;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.12));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();

        // Sweet magical bell arpeggio [Do-Mi-Sol-Do-Mi]
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + 0.15 + idx * 0.08);
          noteGain.gain.setValueAtTime(0.12, ctx.currentTime + 0.15 + idx * 0.08);
          noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15 + idx * 0.08 + 0.55);
          osc.connect(noteGain);
          noteGain.connect(ctx.destination);
          osc.start(ctx.currentTime + 0.15 + idx * 0.08);
          osc.stop(ctx.currentTime + 0.15 + idx * 0.08 + 0.6);
        });
      } else {
        // Relight spark chime
        const notes = [440.00, 554.37, 659.25, 880.00];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
          noteGain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.06);
          noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.35);
          osc.connect(noteGain);
          noteGain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.06);
          osc.stop(ctx.currentTime + idx * 0.06 + 0.4);
        });
      }
    } catch (e) {
      // AudioCtx fallback
    }
  }

  function triggerBlowCandles() {
    if (!isBlownOut) {
      // 1. BLOW OUT CANDLES
      isBlownOut = true;
      playWishChime('blow');

      if (cakePhotoLit) cakePhotoLit.classList.add('faded');
      if (cakePhotoUnlit) cakePhotoUnlit.classList.add('visible');

      flames.forEach(f => f.classList.add('blown-out'));
      smokes.forEach(s => {
        s.classList.remove('drift');
        void s.offsetWidth;
        s.classList.add('drift');
      });

      if (backGlow) backGlow.classList.add('dimmed');

      // Change button state
      if (actionIcon) actionIcon.textContent = '🔥';
      if (actionLabel) actionLabel.textContent = 'make another wish ♡';
      if (actionHint) actionHint.textContent = 'ketuk lagi untuk menyalakan lilin ulang ♡';

      // Reveal the secret birthday wish letter
      if (wishReveal) {
        wishReveal.classList.remove('hidden');
        setTimeout(() => {
          wishReveal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      }

      // Celebratory multi-stage fireworks confetti
      if (window.confetti) {
        // Center burst
        window.confetti({
          particleCount: 120,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#8B1E1E', '#B52828', '#DCA037', '#FFFDF9', '#C93B3B', '#FFE066']
        });

        // Left cannon
        setTimeout(() => {
          window.confetti({
            particleCount: 70,
            angle: 60,
            spread: 70,
            origin: { x: 0.2, y: 0.65 },
            colors: ['#DCA037', '#FFE066', '#8B1E1E', '#FF6B6B']
          });
        }, 200);

        // Right cannon
        setTimeout(() => {
          window.confetti({
            particleCount: 70,
            angle: 120,
            spread: 70,
            origin: { x: 0.8, y: 0.65 },
            colors: ['#DCA037', '#FFE066', '#8B1E1E', '#FF6B6B']
          });
        }, 400);
      }
    } else {
      // 2. RELIGHT CANDLES
      isBlownOut = false;
      playWishChime('relight');

      if (cakePhotoLit) cakePhotoLit.classList.remove('faded');
      if (cakePhotoUnlit) cakePhotoUnlit.classList.remove('visible');

      flames.forEach(f => f.classList.remove('blown-out'));
      smokes.forEach(s => s.classList.remove('drift'));
      if (backGlow) backGlow.classList.remove('dimmed');

      // Change button state
      if (actionIcon) actionIcon.textContent = '🕯️';
      if (actionLabel) actionLabel.textContent = 'make a wish ♡';
      if (actionHint) actionHint.textContent = 'klik kue atau pita untuk meniup lilin ♡';

      if (window.confetti) {
        window.confetti({
          particleCount: 35,
          spread: 50,
          origin: { y: 0.55 },
          colors: ['#FFE066', '#DCA037', '#FFFDF9']
        });
      }
    }
  }

  if (actionBtn) actionBtn.addEventListener('click', triggerBlowCandles);
  if (cakeArea) cakeArea.addEventListener('click', triggerBlowCandles);
}

/* ── 9. Smooth Scroll & Back to Top Navigation ── */
function initScrollNavigation() {
  const scrollDownBtn = document.getElementById('scrollDownHint');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const floatingTopBtn = document.getElementById('floatingTopBtn');

  // Scroll down from cover to boarding pass
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('birthdayCake') || document.getElementById('boardingPass');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Scroll to top button in closing section
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Floating back to top button
  if (floatingTopBtn) {
    floatingTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Show/hide floating button on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        floatingTopBtn.classList.add('visible');
      } else {
        floatingTopBtn.classList.remove('visible');
      }
    }, { passive: true });
  }
}


/* ── 10. October Calendar Date 28 Fireworks Confetti ── */
function initCalendarInteractions() {
  const bdayTrigger = document.getElementById('calBdayTrigger');

  if (bdayTrigger) {
    bdayTrigger.addEventListener('click', () => {
      if (window.confetti) {
        // Multi-cannon explosive celebration confetti
        // Center burst
        window.confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#8B1E1E', '#B52828', '#DCA037', '#FFFDF9', '#C93B3B', '#FFD700']
        });
        // Left cannon
        setTimeout(() => {
          window.confetti({
            particleCount: 75,
            angle: 60,
            spread: 75,
            origin: { x: 0.15, y: 0.7 },
            colors: ['#8B1E1E', '#B52828', '#DCA037', '#FF6B6B']
          });
        }, 150);
        // Right cannon
        setTimeout(() => {
          window.confetti({
            particleCount: 75,
            angle: 120,
            spread: 75,
            origin: { x: 0.85, y: 0.7 },
            colors: ['#8B1E1E', '#B52828', '#DCA037', '#FF6B6B']
          });
        }, 300);
      }
    });
  }
}

/* ── 11. Interactive Constellation Puzzle: I Love You to the Moon and Back ── */
function initConstellationPuzzle() {
  const card = document.getElementById('constellationCard');
  const stage = document.getElementById('constellationStage');
  if (!card && !stage) return;

  // Starlight chime audio generator
  function playStarChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [659.25, 783.99, 987.77, 1318.51, 1567.98]; // Celestial harp arpeggio
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.09, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.55);
      });
    } catch(e) {}
  }

  function triggerStarSparkle() {
    if (card) {
      card.classList.remove('pulse-active');
      void card.offsetWidth;
      card.classList.add('pulse-active');
      setTimeout(() => card.classList.remove('pulse-active'), 1200);
    }

    playStarChime();

    if (window.confetti) {
      window.confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#FFD700', '#FFE066', '#FFFDF8', '#9BBED5', '#FFB6C1']
      });
    }
  }

  if (card) card.addEventListener('click', triggerStarSparkle);
}

/* ── 12. Calendar Day 28 Birthday Pop-Up Modal ── */
function initCalendarDay28Modal() {
  const trigger = document.getElementById('calBdayTrigger');
  const modal = document.getElementById('calBdayModal');
  const backdrop = document.getElementById('calModalBackdrop');
  const closeBtn = document.getElementById('calModalClose');
  const ackBtn = document.getElementById('calModalAckBtn');
  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    if (window.confetti) {
      window.confetti({
        particleCount: 55,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#8B1E1E', '#DCA037', '#FFFDF9', '#FFA500', '#FF6B6B']
      });
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (trigger) trigger.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (ackBtn) ackBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

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
    return;
  }

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

      setTimeout(() => {
        gate.classList.add('unlocked');
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
  if (openBtn) openBtn.addEventListener('click', openLetter);
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
  const bday = new Date(2004, 9, 28);
  const now = new Date();
  let age = now.getFullYear() - bday.getFullYear();
  const m = now.getMonth() - bday.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < bday.getDate())) age--;
  el.textContent = age;
}

/* ── 6. Scroll Reveal ── */
function initReveal() {
  const selectors = [
    '.polaroid', '.patch', '.torn-note', '.vintage-envelope-card',
    '.wish-card-memo', '.printer-box', '.age-circle', '.close-body',
    '.sec-title', '.sec-sub', '.msg-form', '.scrapbook-album'
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

  render();
}

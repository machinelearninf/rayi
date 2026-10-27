import React, { useState, useEffect } from 'react';
import { Mail, Send, MessageCircle, Heart, X } from 'lucide-react';
import { CONFIG } from '../../data/scrapbookData';

export default function Page14LoveLetterWA() {
  const [isOpen, setIsOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rayi_bday_replies');
      if (saved) setNotes(JSON.parse(saved));
    } catch (e) {
      console.warn("Storage error:", e);
    }
  }, []);

  const handleSaveLocal = () => {
    if (!replyText.trim()) return;
    const newNote = {
      id: Date.now(),
      text: replyText.trim(),
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    localStorage.setItem('rayi_bday_replies', JSON.stringify(updated));
    setReplyText("");
  };

  const handleSendWhatsApp = () => {
    if (!replyText.trim()) {
      alert("Tulis pesan balasan kamu dulu ya sayang ♡");
      return;
    }
    const msg = encodeURIComponent(
      `Halo Keisya sayang! ♡\n\nIni balasan surat ulang tahunku:\n"${replyText.trim()}"\n\nMakasih banyak ya sayangku buat scrapbooknya! 🤍`
    );
    const waUrl = `https://wa.me/${CONFIG.kekeyWhatsApp}?text=${msg}`;
    window.open(waUrl, '_blank');
    handleSaveLocal();
  };

  const handleDeleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    localStorage.setItem('rayi_bday_replies', JSON.stringify(updated));
  };

  return (
    <div className="scrap-card card-bg-cream flex flex-col justify-start items-center p-5 relative overflow-y-auto max-h-full select-none custom-scrollbar">
      
      {/* ── 1. The Vintage Wax-Seal Envelope ── */}
      <div className="w-full max-w-[320px] mb-4">
        {!isOpen ? (
          <div
            className="vintage-envelope-box cursor-pointer transition-transform hover:scale-[1.02] active:scale-95"
            onClick={() => setIsOpen(true)}
            title="Klik untuk membuka surat dari Keisya"
          >
            <div className="envelope-stamp">💌 AIR MAIL</div>
            <div className="envelope-to-block">
              <span className="text-[10px] text-stone-500 font-mono">Khusus Untuk:</span>
              <h4 className="font-serif text-[#7A1C1C] text-lg font-bold">Rayi Rizkia ♡</h4>
              <p className="text-[11px] text-stone-600 font-sans">dari: Keisya</p>
            </div>

            <div className="wax-seal-wrapper">
              <div className="wax-seal-disk">
                <span className="wax-seal-initials">R ♡ K</span>
              </div>
            </div>
            <p className="envelope-click-hint">ketuk amplop / stempel lilin untuk buka ✉️</p>
          </div>
        ) : (
          <div className="unfolded-letter-card bg-[#FAF6EF] p-4 rounded-md shadow-md border border-stone-300 relative text-left">
            <button
              type="button"
              className="absolute top-2 right-2 text-stone-400 hover:text-stone-700"
              onClick={() => setIsOpen(false)}
              title="Tutup surat"
            >
              <X size={16} />
            </button>

            <h4 className="font-serif text-[#7A1C1C] text-base font-bold mb-2">
              Rayi sayang,
            </h4>

            <div className="font-sans text-[#3C1F1F] text-xs leading-relaxed space-y-2">
              <p>Selamat ulang tahun yang ke-22 ya ♡</p>
              <p>
                Aku tau kamu orangnya santai dan nggak suka yang lebay-lebay, tapi hari ini hari spesial kamu,
                jadi bolehlah ya aku sedikit cheesy di scrapbook ini.
              </p>
              <p>
                Makasih udah jadi orang yang selalu ada buat aku. Yang sabar banget, yang selalu support,
                dan yang selalu bikin hari-hariku lebih tenang. Kadang aku nggak bisa ungkapin langsung,
                tapi percaya deh — aku bersyukur banget punya kamu.
              </p>
              <p>
                Aku suka ngeliat kamu yang antusias banget kalau ngomongin taktik Persib, analisis superhero Marvel,
                dan pas kamu lagi fokus baca buku. Kamu tuh superhero versi aku. 🌿
              </p>
              <p>
                Di umur 22 ini, semoga kuliah teknik listriknya lancar, sehat selalu, dan semua impianmu kejadian
                satu per satu. Aku sama kamu, kamu sama aku.
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-stone-300 flex justify-between items-center text-[11px] font-script text-[#7A1C1C] font-bold">
              <span>Selalu sayang kamu,</span>
              <span>Keisya ♡</span>
            </div>
          </div>
        )}
      </div>

      {/* ── 2. Message Reply Box with WhatsApp Integration ── */}
      <div className="w-full max-w-[320px] bg-white/70 p-3.5 rounded-lg border border-[#7A1C1C]/20 shadow-sm mt-2">
        <div className="flex items-center gap-1.5 mb-2 text-[#7A1C1C]">
          <Mail size={14} />
          <h4 className="font-serif text-xs font-bold uppercase tracking-wider">
            Balas Surat Keisya 💌
          </h4>
        </div>

        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Tulis pesan balasan atau perasaanmu buat Keisya..."
          rows={3}
          maxLength={300}
          className="w-full p-2 text-xs font-sans border border-stone-300 rounded bg-[#FAF9F6] text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#7A1C1C]"
        />

        <div className="flex items-center gap-2 mt-2">
          {/* WhatsApp Direct Send Button */}
          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-medium flex items-center justify-center gap-1 shadow-sm transition-colors"
            title="Kirim pesan langsung ke WhatsApp Keisya"
          >
            <MessageCircle size={13} /> Kirim ke WA Keisya 💬
          </button>

          {/* Local Save Note Button */}
          <button
            type="button"
            onClick={handleSaveLocal}
            className="py-1.5 px-2.5 bg-[#7A1C1C] hover:bg-[#601616] text-white rounded text-[11px] font-medium flex items-center justify-center gap-1 shadow-sm transition-colors"
            title="Simpan sebagai sticky note"
          >
            <Send size={11} /> Simpan
          </button>
        </div>

        {/* Saved Sticky Notes */}
        {notes.length > 0 && (
          <div className="mt-3 space-y-1.5 border-t border-stone-200 pt-2 max-h-[100px] overflow-y-auto">
            {notes.map((n) => (
              <div key={n.id} className="p-2 bg-amber-50 rounded border border-amber-200 text-left relative group">
                <p className="text-[11px] text-stone-800 font-sans pr-4">{n.text}</p>
                <div className="flex justify-between items-center text-[9px] text-stone-400 mt-1">
                  <span>{n.date}</span>
                  <button
                    onClick={() => handleDeleteNote(n.id)}
                    className="text-stone-400 hover:text-red-500"
                    title="Hapus"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

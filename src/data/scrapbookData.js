// ══════════════════════════════════════════════════════════════════════
// SCRAPBOOK DATA CONFIGURATION — RAYI RIZKIA & KEISYA
// Kamu bisa ganti foto, teks, dan nomor WhatsApp di sini dengan mudah!
// ══════════════════════════════════════════════════════════════════════

export const CONFIG = {
  recipientName: "Rayi Rizkia",
  senderName: "Keisya",
  birthDate: "28 Oktober 2004",
  age: 22,
  pin: "281004", // DDMMYY
  // Ganti dengan nomor WhatsApp Keisya (gunakan format 628xxxxxxxxxx tanpa tanda +)
  kekeyWhatsApp: "6281234567890", 
  bgmTitle: "Happy Birthday to you",
  bgmArtist: "Pamungkas",
  bgmSrc: "/assets/sal.mp3"
};

// Kumpulan foto yang dipakai di halaman.
// Sementara menggunakan asset yang sudah ada (/assets/love.webp dan /assets/littlerayi.webp).
// Nanti jika ada foto baru, cukup taruh di folder public/assets/ lalu ubah link di bawah ini!
export const PHOTOS = {
  coverHero: "/assets/love.webp",
  littleRayi: "/assets/littlerayi.webp",
  coupleUs: "/assets/love.webp",
  
  // 9 Foto untuk Page 06 (My Favorite Pictures)
  favPictures: [
    { id: 1, src: "/assets/love.webp", caption: "senyum favorit" },
    { id: 2, src: "/assets/littlerayi.webp", caption: "little rayi 🥺" },
    { id: 3, src: "/assets/love.webp", caption: "jalan sore" },
    { id: 4, src: "/assets/love.webp", caption: "my superhero" },
    { id: 5, src: "/assets/littlerayi.webp", caption: "gemes banget" },
    { id: 6, src: "/assets/love.webp", caption: "anak teknik keren" },
    { id: 7, src: "/assets/love.webp", caption: "tatapan hangat" },
    { id: 8, src: "/assets/littlerayi.webp", caption: "bayi siapa ini" },
    { id: 9, src: "/assets/love.webp", caption: "always & forever" }
  ],

  // Foto untuk Page 03 (I HOPE OUR RELATIONSHIP WILL LAST FOREVER)
  relationshipStory: [
    { word: "I", src: "/assets/love.webp" },
    { word: "HOPE", src: "/assets/littlerayi.webp" },
    { word: "OUR", src: "/assets/love.webp" },
    { word: "RELATIONSHIP", src: "/assets/love.webp" },
    { word: "WILL LAST", src: "/assets/love.webp" },
    { word: "FOREVER", src: "/assets/love.webp" }
  ],

  // Foto untuk Page 07 (Typewriter + 4 Photos)
  fourMemories: [
    { id: 1, src: "/assets/love.webp", label: "Awal Cerita" },
    { id: 2, src: "/assets/littlerayi.webp", label: "Little Hero" },
    { id: 3, src: "/assets/love.webp", label: "Ketawa Bareng" },
    { id: 4, src: "/assets/love.webp", label: "Kita Berdua" }
  ],

  // Foto sticker bulat untuk Page 09 (Cheers to more...)
  roundStickers: [
    "/assets/love.webp",
    "/assets/littlerayi.webp",
    "/assets/love.webp",
    "/assets/love.webp",
    "/assets/littlerayi.webp",
    "/assets/love.webp",
    "/assets/love.webp",
    "/assets/littlerayi.webp"
  ]
};

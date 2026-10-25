import { HookFormula } from '../types/content';

export const HOOK_FORMULAS: HookFormula[] = [
  {
    id: 'neg-1',
    category: 'negative',
    categoryName: 'Negative Hook (Peringatan / Anti-Rugi)',
    badgeColor: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400',
    title: 'Stop Lakukan Kesalahan Ini',
    pattern: 'Stop [kebiasaan umum], ini alasan kenapa [akibat buruk]...',
    template: 'Stop [melakukan X] setiap hari kalau kamu nggak mau [rugi/akibat Y]!',
    example: 'Stop posting video jam 12 malam kalau kamu nggak mau engagement akunmu anjlok drastis!',
    whyItWorks: 'Psikologi loss aversion membuat otak manusia 2x lebih takut kehilangan daripada ingin mendapatkan sesuatu.',
    testedRetention: '86% retensi 3 detik pertama'
  },
  {
    id: 'neg-2',
    category: 'negative',
    categoryName: 'Negative Hook (Peringatan / Anti-Rugi)',
    badgeColor: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400',
    title: 'Jangan Beli Sebelum Tahu Ini',
    pattern: 'Jangan pernah beli/coba [Produk/Metode] sebelum kamu tahu 3 hal ini...',
    template: 'Jangan pernah [mencoba X] sebelum kamu tahu resiko terbesarnya ini.',
    example: 'Jangan pernah sewa studio rekaman sebelum kamu tonton rahasia pencahayaan ponsel ini.',
    whyItWorks: 'Menyelamatkan penonton dari penyesalan uang atau waktu.',
    testedRetention: '82% retensi 3 detik pertama'
  },
  {
    id: 'cur-1',
    category: 'curiosity',
    categoryName: 'Curiosity Gap (Bocoran Rahasia)',
    badgeColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400',
    title: 'Rahasia yang 99% Orang Tidak Tahu',
    pattern: 'Rahasia yang cuma diketahui 1% top [profesi/kategori]...',
    template: 'Ini rahasia yang 99% orang nggak sadar waktu [menjalani aktivitas X]...',
    example: 'Ini trik algoritma TikTok 2026 yang cuma diketahui 1% top agency video!',
    whyItWorks: 'Memicu rasa penasaran instan (FOMO) dan keinginan menjadi bagian dari kelompok eksklusif.',
    testedRetention: '89% retensi 3 detik pertama'
  },
  {
    id: 'cur-2',
    category: 'curiosity',
    categoryName: 'Curiosity Gap (Bocoran Rahasia)',
    badgeColor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400',
    title: 'Benda Murah Bernilai Mahal',
    pattern: 'Aku nemu satu [tools/benda] seharga [harga murah] yang bisa gantikan [hal mahal]...',
    template: 'Benda gratisan seharga 0 rupiah ini bisa gantikan aplikasi berbayar seharga jutaan!',
    example: 'Website gratis ini bisa otomatis potong bagian hening video naskahmu dalam 10 detik.',
    whyItWorks: 'Menawarkan asimetri nilai yang sangat tinggi (modal kecil, faedah besar).',
    testedRetention: '91% retensi 3 detik pertama'
  },
  {
    id: 'proof-1',
    category: 'proof',
    categoryName: 'Proof & Hasil Nyata (Social Proof)',
    badgeColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400',
    title: 'Dari X Menjadi Y dalam Waktu Z',
    pattern: 'Bagaimana aku mengubah [Kondisi Awal] jadi [Hasil Mengagumkan] cuma dalam [Durasi]...',
    template: 'Cara aku naikin [metrik X] dari [angka awal] ke [angka akhir] hanya dalam [waktu] tanpa [kendala biasa]!',
    example: 'Cara aku dapet 25.000 followers dalam 21 hari tanpa keluar modal iklan sepeser pun!',
    whyItWorks: 'Bukti angka konkret dan timeline jelas membangun kredibilitas instan.',
    testedRetention: '88% retensi 3 detik pertama'
  },
  {
    id: 'proof-2',
    category: 'proof',
    categoryName: 'Proof & Hasil Nyata (Social Proof)',
    badgeColor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400',
    title: 'Studi Kasus 1 Langkah Sederhana',
    pattern: 'Satu perubahan kecil ini yang bikin omzet/hasil melonjak...',
    template: 'Aku cuma ubah 1 baris kalimat ini, dan hasilnya langsung melonjak [persentase]%!',
    example: 'Aku cuma ganti 3 detik pertama video ini, dan views langsung naik dari 500 ke 1,2 juta!',
    whyItWorks: 'Efek "high leverage" — perubahan kecil dengan dampak masif menarik orang malas/sibuk.',
    testedRetention: '85% retensi 3 detik pertama'
  },
  {
    id: 'cont-1',
    category: 'contrarian',
    categoryName: 'Contrarian & Hot Take (Melawan Arus)',
    badgeColor: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-400',
    title: 'Mitos Populer yang Sebenarnya Salah',
    pattern: 'Semua orang bilang [pendapat populer], tapi data membuktikan sebaliknya...',
    template: 'Nasihat tentang [topik populer] itu sebenarnya bohong besar. Ini faktanya!',
    example: 'Semua guru konten bilang harus upload 3x sehari. Faktanya, itu cara tercepat kena shadowban!',
    whyItWorks: 'Menantang status quo memicu perdebatan kognitif dan komentar aktif di feed.',
    testedRetention: '94% retensi 3 detik pertama'
  },
  {
    id: 'story-1',
    category: 'story',
    categoryName: 'Storytelling & Relatable (Kisah Pribadi)',
    badgeColor: 'text-sky-600 bg-sky-50 dark:bg-sky-950/40 dark:text-sky-400',
    title: 'Waktu Aku Pertama Kali...',
    pattern: 'Waktu pertama kali [mulai/mencoba], aku hampir menyerah gara-gara...',
    template: 'Tahun lalu aku sempat mau hapus akun ini selamanya gara-gara satu kesalahan bodoh ini...',
    example: '3 bulan lalu video aku konsisten mentok di 200 views dan aku hampir banting ponsel...',
    whyItWorks: 'Kerentanan emosional memicu empati dan koneksi mendalam antara kreator dan audiens.',
    testedRetention: '84% retensi 3 detik pertama'
  },
  {
    id: 'ques-1',
    category: 'question',
    categoryName: 'Direct Question & Pain Point (Masalah Nyata)',
    badgeColor: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400',
    title: 'Pertanyaan Menusuk Rasa Sakit',
    pattern: 'Kenapa setiap kali kamu [coba X], hasilnya selalu [kegagalan Y]?',
    template: 'Pernah nggak kamu ngerasa udah capek-capek [usaha X], tapi orang lain yang baru mulai malah [dapat hasil Y]?',
    example: 'Pernah nggak kamu ngerasa udah edit video 4 jam, tapi yang nonton cuma 150 orang?',
    whyItWorks: 'Secara instan menyaring target audiens yang merasakan frustrasi yang sama.',
    testedRetention: '87% retensi 3 detik pertama'
  }
];

export function calculateHookScore(hookText: string): { score: number; feedback: string; wordCount: number; readTimeSec: number } {
  if (!hookText || hookText.trim().length === 0) {
    return { score: 0, feedback: 'Tulis kalimat pembuka hook video kamu', wordCount: 0, readTimeSec: 0 };
  }

  const words = hookText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  // Average speaking speed: ~2.5 to 3 words per second
  const readTimeSec = Math.max(1, Math.round((wordCount / 2.6) * 10) / 10);

  let score = 50;

  // Word count balance: Ideal video hook is 8 to 22 words (approx 2.5 - 5 seconds)
  if (wordCount >= 8 && wordCount <= 22) {
    score += 25;
  } else if (wordCount < 8) {
    score += 10;
  } else if (wordCount > 30) {
    score -= 15;
  }

  // Power words list in Indonesian
  const powerWords = [
    'stop', 'jangan', 'rahasia', 'trik', 'cara', 'bukti', 'gratis', 'kesalahan', 
    'rugi', 'viral', 'view', 'omzet', 'anjlok', 'meledak', 'ternyata', 'fakta',
    'bohong', 'sebenarnya', 'tonton', 'sebelum', 'pernah', 'kenapa', 'bocoran',
    'menyesal', 'gagal', 'sukses', 'cepat', 'otomatis', '99%', '1%'
  ];

  const lower = hookText.toLowerCase();
  let matchedPowerWords = 0;
  powerWords.forEach(pw => {
    if (lower.includes(pw)) matchedPowerWords++;
  });

  score += Math.min(25, matchedPowerWords * 7);

  // Punctuation check (question mark, exclamation)
  if (hookText.includes('?') || hookText.includes('!')) {
    score += 5;
  }

  score = Math.min(100, Math.max(15, score));

  let feedback = 'Hook standar. Coba tambahkan kata pemicu rasa penasaran atau peringatan.';
  if (score >= 85) {
    feedback = '🔥 Hook Sangat Kuat! Padat, langsung menusuk rasa penasaran penonton dalam 3 detik!';
  } else if (score >= 70) {
    feedback = '⚡ Hook Bagus! Panjang ideal dan memiliki kata kunci penahan scroll yang oke.';
  } else if (wordCount > 25) {
    feedback = '⚠️ Hook terlalu panjang. Usahakan selesai dalam 3-5 detik pertama (maks 20-22 kata).';
  } else if (wordCount < 6) {
    feedback = '⚠️ Terlalu singkat. Berikan sedikit konteks apa yang akan didapat penonton.';
  }

  return { score, feedback, wordCount, readTimeSec };
}

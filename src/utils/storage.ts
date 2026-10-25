import { ContentIdea, CreatorProfile, SavedHook } from '../types/content';

const STORAGE_KEY_IDEAS = 'creator_desk_ideas_v1';
const STORAGE_KEY_SAVED_HOOKS = 'creator_desk_hooks_v1';
const STORAGE_KEY_PROFILE = 'creator_desk_profile_v1';

// Today's date string YYYY-MM-DD
export function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDateOffset(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const INITIAL_IDEAS: ContentIdea[] = [
  {
    id: 'idea-1',
    title: '5 AI Tools Gratis yang Bikin Kerja Konten Jadi 10x Lebih Cepat',
    niche: 'Tech & AI',
    platform: 'tiktok',
    format: 'Reels / Shorts',
    status: 'scheduled',
    priority: 'high',
    rating: 5,
    hook: 'Stop edit video manual berjam-jam! Website gratis ini bisa potong bagian hening otomatis dalam 10 detik!',
    hookFormula: 'Stop Lakukan Kesalahan Ini',
    hookScore: 92,
    script: `1. Hook: Stop edit video manual berjam-jam! Website gratis ini potong bagian hening otomatis dalam 10 detik.
2. Masalah: Kebanyakan kreator pemula habis waktu 3 jam cuma buat potong naskah yang salah.
3. Solusi: Buka AutoCut / Descript versi gratis, drag video, dan klik "Remove Silence".
4. Hasil: Video langsung padat tanpa jeda awkward yang bikin penonton swipe.
5. CTA: Simpan video ini biar nggak lupa pas ngedit nanti malam!`,
    callToAction: 'Simpan video ini buat bekal ngedit nanti malam!',
    scheduledDate: getTodayString(),
    scheduledTime: '19:30',
    tags: ['ai', 'editing', 'produktivitas', 'tools'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'idea-2',
    title: 'Kesalahan Terbesar Bikin Akun Instagram Baru di 2026',
    niche: 'Tips & Tutorial',
    platform: 'instagram',
    format: 'Reels / Shorts',
    status: 'hook_ready',
    priority: 'high',
    rating: 4,
    hook: 'Jangan pernah bikin akun Instagram baru sebelum kamu matikan 2 settingan bawaan ini!',
    hookFormula: 'Jangan Beli Sebelum Tahu Ini',
    hookScore: 88,
    script: `Tunjukkan layar HP:
- Masuk ke Settings > Media Quality > Nyalakan "Upload at Highest Quality"
- Matikan sinkronisasi kontak acak agar algoritma merekomendasikan ke niche yang tepat.
- Tulis bio dengan format: Siapa kamu + Masalah apa yang kamu selesaikan + Freebie link.`,
    callToAction: 'Komen "SETTING" kalau mau tutorial lengkapnya!',
    scheduledDate: getDateOffset(1),
    scheduledTime: '12:00',
    tags: ['instagram', 'algoritma', 'reels', 'kreator'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'idea-3',
    title: 'Bagaimana Aku Naikkan Penghasilan Freelance dari 3 Juta ke 18 Juta/Bulan',
    niche: 'Bisnis & Finansial',
    platform: 'youtube_long',
    format: 'Video Panjang',
    status: 'scripted',
    priority: 'high',
    rating: 5,
    hook: 'Tahun 2024 aku hampir berhenti freelance karena klien nawar 50 ribu per desain. Ini satu skill yang ubah segalanya.',
    hookFormula: 'Waktu Aku Pertama Kali...',
    hookScore: 85,
    script: `Struktur Video YouTube:
[00:00 - 01:30] Hook & Kilas Balik rekening bank awal
[01:31 - 04:00] Kenapa jualan "jasa teknis" itu murah, tapi jualan "solusi bisnis" dibayar mahal
[04:01 - 08:30] Blueprint positioning baru (Portfolio Case Study)
[08:31 - 12:00] Cara outreach klien luar negeri via LinkedIn
[12:01 - 14:00] Kesimpulan & Template proposal gratis di deskripsi`,
    callToAction: 'Download template proposal di deskripsi video gratis!',
    scheduledDate: getDateOffset(3),
    scheduledTime: '16:00',
    tags: ['freelance', 'keuangan', 'karier', 'youtube'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'idea-4',
    title: 'Rutinitas Pagi 1 Jam Kreator Konten Produktif Tanpa Burnout',
    niche: 'Lifestyle & Produktivitas',
    platform: 'youtube_shorts',
    format: 'Reels / Shorts',
    status: 'published',
    priority: 'medium',
    rating: 4,
    hook: 'Pernah nggak kamu bangun tidur langsung buka HP, terus seharian merasa otak capek dan nggak produktif sama sekali?',
    hookFormula: 'Pertanyaan Menusuk Rasa Sakit',
    hookScore: 84,
    script: `Aturan 30 menit tanpa layar:
1. Minum air putih 500ml + sinar matahari pagi 10 menit
2. Tulis 3 ide konten sebelum buka medsos orang lain
3. Batch recording saat energi otak masih 100%`,
    callToAction: 'Share ke teman kamu yang sering kena screen fatigue!',
    scheduledDate: getDateOffset(-2),
    scheduledTime: '08:00',
    publishedDate: getDateOffset(-2),
    tags: ['morningroutine', 'produktivitas', 'mindset'],
    metrics: {
      views: 14200,
      likes: 1240,
      comments: 68,
      shares: 310,
      retentionPercent: 68,
      notes: 'Hook pertanyaan di detik pertama sangat efektif! Waktu nonton rata-rata di atas 80%.'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'idea-5',
    title: 'Bedah Hook 1 Juta Views: Kenapa Video Ini Bisa FYP Parah',
    niche: 'Edukasi',
    platform: 'tiktok',
    format: 'Reels / Shorts',
    status: 'draft',
    priority: 'medium',
    rating: 3,
    hook: 'Ada satu pola rahasia di 3 detik pertama video viral yang nggak pernah diajarin di seminar manapun...',
    hookFormula: 'Rahasia yang 99% Orang Tidak Tahu',
    hookScore: 90,
    script: 'Bedah visual hook: pergerakan tangan ke kamera, text on screen yang kontras, dan sound trending yang dipelankan.',
    callToAction: 'Follow untuk bedah konten viral berikutnya!',
    scheduledDate: getDateOffset(2),
    scheduledTime: '20:00',
    tags: ['bedahkonten', 'fyp', 'tiktoktips'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const INITIAL_SAVED_HOOKS: SavedHook[] = [
  {
    id: 'hook-saved-1',
    text: 'Stop beli mic mahal kalau kamu belum coba trik rekaman di dalam lemari baju ini!',
    formulaTitle: 'Stop Lakukan Kesalahan Ini',
    category: 'negative',
    topic: 'Audio & Rekaman',
    createdAt: new Date().toISOString()
  },
  {
    id: 'hook-saved-2',
    text: 'Website rahasia ini bisa buat 30 hook konten otomatis dalam hitungan 5 detik...',
    formulaTitle: 'Rahasia yang 99% Orang Tidak Tahu',
    category: 'curiosity',
    topic: 'Ideasi Konten',
    createdAt: new Date().toISOString()
  },
  {
    id: 'hook-saved-3',
    text: 'Semua orang bilang upload tiap hari wajib, tapi video seminggu 2x aku malah tembus 500k views!',
    formulaTitle: 'Mitos Populer yang Sebenarnya Salah',
    category: 'contrarian',
    topic: 'Konsistensi & Algoritma',
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_PROFILE: CreatorProfile = {
  name: 'Irsyad Konten',
  niche: 'Tech & Edukasi',
  weeklyGoal: 4,
  monthlyGoal: 16,
  primaryPlatform: 'tiktok',
  theme: 'dark',
  streak: 5,
  lastActiveDate: getTodayString()
};

export function loadIdeas(): ContentIdea[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_IDEAS);
    if (!raw) {
      saveIdeas(INITIAL_IDEAS);
      return INITIAL_IDEAS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_IDEAS;
  }
}

export function saveIdeas(ideas: ContentIdea[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_IDEAS, JSON.stringify(ideas));
  } catch (e) {
    console.error('Failed to save ideas to localStorage', e);
  }
}

export function loadSavedHooks(): SavedHook[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SAVED_HOOKS);
    if (!raw) {
      saveSavedHooks(INITIAL_SAVED_HOOKS);
      return INITIAL_SAVED_HOOKS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SAVED_HOOKS;
  }
}

export function saveSavedHooks(hooks: SavedHook[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_SAVED_HOOKS, JSON.stringify(hooks));
  } catch (e) {
    console.error('Failed to save hooks to localStorage', e);
  }
}

export function loadProfile(): CreatorProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (!raw) {
      saveProfile(INITIAL_PROFILE);
      return INITIAL_PROFILE;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PROFILE;
  }
}

export function saveProfile(profile: CreatorProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile to localStorage', e);
  }
}

export function exportAllData(): string {
  const data = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    profile: loadProfile(),
    ideas: loadIdeas(),
    savedHooks: loadSavedHooks()
  };
  return JSON.stringify(data, null, 2);
}

export function importAllData(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.ideas && Array.isArray(parsed.ideas)) {
      saveIdeas(parsed.ideas);
    }
    if (parsed.profile) {
      saveProfile(parsed.profile);
    }
    if (parsed.savedHooks && Array.isArray(parsed.savedHooks)) {
      saveSavedHooks(parsed.savedHooks);
    }
    return true;
  } catch (e) {
    console.error('Failed to import data', e);
    return false;
  }
}

export function resetToDefaults(): void {
  saveIdeas(INITIAL_IDEAS);
  saveSavedHooks(INITIAL_SAVED_HOOKS);
  saveProfile(INITIAL_PROFILE);
}

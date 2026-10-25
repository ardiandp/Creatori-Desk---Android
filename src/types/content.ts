export type Platform = 'tiktok' | 'instagram' | 'youtube_shorts' | 'youtube_long' | 'x_twitter' | 'linkedin';

export type ContentFormat = 'Reels / Shorts' | 'Video Panjang' | 'Carousel / Slide' | 'Thread / Teks' | 'Story / Live';

export type ContentStatus = 'draft' | 'hook_ready' | 'scripted' | 'recording' | 'scheduled' | 'published';

export type Priority = 'low' | 'medium' | 'high';

export type NicheCategory = 
  | 'Edukasi'
  | 'Bisnis & Finansial'
  | 'Tech & AI'
  | 'Lifestyle & Produktivitas'
  | 'Hiburan & Komedi'
  | 'Tips & Tutorial'
  | 'Storytelling & Pengalaman'
  | 'Karier & Kerja'
  | 'Kesehatan & Olahraga'
  | 'Lainnya';

export interface PerformanceMetrics {
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  retentionPercent?: number;
  notes?: string;
}

export interface ContentIdea {
  id: string;
  title: string;
  niche: NicheCategory;
  platform: Platform;
  format: ContentFormat;
  status: ContentStatus;
  priority: Priority;
  rating: number; // 1 to 5
  hook: string;
  hookFormula?: string;
  hookScore?: number; // 0 to 100
  script: string;
  callToAction: string;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // HH:mm
  publishedDate?: string;
  tags: string[];
  metrics?: PerformanceMetrics;
  createdAt: string;
  updatedAt: string;
}

export type HookCategory = 'negative' | 'curiosity' | 'story' | 'proof' | 'contrarian' | 'question';

export interface HookFormula {
  id: string;
  category: HookCategory;
  categoryName: string;
  badgeColor: string;
  title: string;
  pattern: string;
  template: string;
  example: string;
  whyItWorks: string;
  testedRetention: string;
}

export interface CreatorProfile {
  name: string;
  niche: string;
  weeklyGoal: number;
  monthlyGoal: number;
  primaryPlatform: Platform;
  theme: 'dark' | 'light' | 'system';
  streak: number;
  lastActiveDate: string;
}

export interface SavedHook {
  id: string;
  text: string;
  formulaTitle: string;
  category: HookCategory;
  topic?: string;
  createdAt: string;
}

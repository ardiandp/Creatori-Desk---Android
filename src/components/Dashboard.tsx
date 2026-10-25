import React, { useState } from 'react';
import { 
  Flame, 
  Target, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Copy, 
  Check, 
  Plus, 
  Play, 
  FileText,
  Share2,
  Video,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ContentIdea, CreatorProfile, Platform } from '../types/content';
import { HOOK_FORMULAS } from '../utils/hookFormulas';
import { getTodayString } from '../utils/storage';

interface DashboardProps {
  profile: CreatorProfile;
  ideas: ContentIdea[];
  onOpenNewIdea: (prefill?: Partial<ContentIdea>) => void;
  onEditIdea: (idea: ContentIdea) => void;
  onOpenTeleprompter: (idea: ContentIdea) => void;
  onMarkAsPublished: (idea: ContentIdea) => void;
  onNavigateTab: (tab: string) => void;
  onQuickSaveIdea: (title: string, platform: Platform) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  profile,
  ideas,
  onOpenNewIdea,
  onEditIdea,
  onOpenTeleprompter,
  onMarkAsPublished,
  onNavigateTab,
  onQuickSaveIdea
}) => {
  const [quickTitle, setQuickTitle] = useState('');
  const [quickPlatform, setQuickPlatform] = useState<Platform>('tiktok');
  const [copiedHook, setCopiedHook] = useState(false);

  // Today string
  const todayStr = getTodayString();

  // Pipeline counts
  const draftsCount = ideas.filter(i => i.status === 'draft').length;
  const hookReadyCount = ideas.filter(i => i.status === 'hook_ready').length;
  const scheduledCount = ideas.filter(i => i.status === 'scheduled').length;
  const publishedCount = ideas.filter(i => i.status === 'published').length;

  // Published this week (estimate by checking items created/updated recently or status published)
  const weeklyPublished = ideas.filter(i => i.status === 'published').length;
  const weeklyGoalPercent = Math.min(100, Math.round((weeklyPublished / (profile.weeklyGoal || 4)) * 100));

  // Up next / Scheduled ideas
  const scheduledIdeas = ideas
    .filter(i => i.status === 'scheduled')
    .sort((a, b) => (a.scheduledDate || '').localeCompare(b.scheduledDate || ''));

  // Today's ideas
  const todayIdeas = ideas.filter(i => i.scheduledDate === todayStr && i.status !== 'published');

  // Random Daily Hook recommendation
  const dailyHookFormula = HOOK_FORMULAS[Math.floor((new Date().getDate() + 2) % HOOK_FORMULAS.length)];

  const handleCopyHook = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHook(true);
    setTimeout(() => setCopiedHook(false), 2000);
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    onQuickSaveIdea(quickTitle.trim(), quickPlatform);
    setQuickTitle('');
  };

  const handlePublishWithConfetti = (idea: ContentIdea) => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onMarkAsPublished(idea);
  };

  // Format date readable in Indonesian
  const formattedToday = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  const getPlatformBadge = (platform: Platform) => {
    switch (platform) {
      case 'tiktok': return { label: 'TikTok', bg: 'bg-black text-white dark:bg-slate-800' };
      case 'instagram': return { label: 'Instagram', bg: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' };
      case 'youtube_shorts': return { label: 'YT Shorts', bg: 'bg-red-600 text-white' };
      case 'youtube_long': return { label: 'YouTube', bg: 'bg-red-700 text-white' };
      case 'x_twitter': return { label: 'X (Twitter)', bg: 'bg-slate-800 text-white' };
      case 'linkedin': return { label: 'LinkedIn', bg: 'bg-blue-600 text-white' };
      default: return { label: platform, bg: 'bg-slate-700 text-white' };
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Welcome Banner & Streak Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-200 text-xs font-medium tracking-wide">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedToday}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              Semangat Berkarya, {profile.name}! 👋
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200/80 mt-1 max-w-lg">
              Fokus pada konsistensi dan 3 detik pertama hook video kamu. Niche: <span className="font-semibold text-white">{profile.niche}</span>.
            </p>
          </div>

          {/* Streak Counter Pill */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-4 flex items-center gap-3 shrink-0 self-start sm:self-center">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold font-mono tabular-nums text-white">
                  {profile.streak}
                </span>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Hari Streak
                </span>
              </div>
              <p className="text-[11px] text-indigo-200">
                Konsisten bikin konten 🔥
              </p>
            </div>
          </div>
        </div>

        {/* Weekly Goal Progress Bar */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-medium text-indigo-200 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-300" />
              Target Konten Minggu Ini
            </span>
            <span className="font-mono tabular-nums font-semibold text-white">
              {weeklyPublished} / {profile.weeklyGoal} Selesai ({weeklyGoalPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500"
              style={{ width: `${weeklyGoalPercent}%` }}
            />
          </div>
        </div>
      </section>

      {/* Production Pipeline Summary Strip */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Pipeline Produksi
          </h3>
          <button
            type="button"
            onClick={() => onNavigateTab('vault')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            Buka Vault <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => onNavigateTab('vault')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left hover:border-indigo-300 dark:hover:border-indigo-700 transition-all shadow-xs group"
          >
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Ide Baru (Draft)
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {draftsCount}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Perlu dimatangkan
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('vault')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left hover:border-amber-300 dark:hover:border-amber-700 transition-all shadow-xs group"
          >
            <div className="text-xs font-medium text-amber-600 dark:text-amber-400">
              Hook Siap
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1 group-hover:text-amber-600 transition-colors">
              {hookReadyCount}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Siap tulis naskah
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('calendar')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left hover:border-sky-300 dark:hover:border-sky-700 transition-all shadow-xs group"
          >
            <div className="text-xs font-medium text-sky-600 dark:text-sky-400">
              Terjadwal
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1 group-hover:text-sky-600 transition-colors">
              {scheduledCount}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Menunggu waktu tayang
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('progress')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-left hover:border-emerald-300 dark:hover:border-emerald-700 transition-all shadow-xs group"
          >
            <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Sudah Tayang
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1 group-hover:text-emerald-600 transition-colors">
              {publishedCount}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Live di medsos
            </div>
          </button>
        </div>
      </section>

      {/* Up Next: Today & Upcoming Content */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Jadwal Posting Terdekat
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('calendar')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Lihat Kalender Lengkap
          </button>
        </div>

        {scheduledIdeas.length === 0 ? (
          <div className="text-center py-8 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700">
            <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Belum ada postingan yang dijadwalkan
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Jadwalkan satu ide konten dari Vault agar kamu tetap konsisten dan tidak bingung mau upload apa.
            </p>
            <button
              type="button"
              onClick={() => onOpenNewIdea({ status: 'scheduled', scheduledDate: todayStr, scheduledTime: '19:00' })}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
            >
              Jadwalkan Konten Hari Ini
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {scheduledIdeas.slice(0, 3).map((idea) => {
              const platformInfo = getPlatformBadge(idea.platform);
              const isToday = idea.scheduledDate === todayStr;

              return (
                <div 
                  key={idea.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${platformInfo.bg}`}>
                        {platformInfo.label}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {idea.format}
                      </span>
                      <span className="text-slate-300 dark:text-slate-600">·</span>
                      <span className={`text-xs font-semibold font-mono tabular-nums ${isToday ? 'text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-300'}`}>
                        {isToday ? 'Hari Ini' : idea.scheduledDate} {idea.scheduledTime ? `@ ${idea.scheduledTime}` : ''}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {idea.title}
                    </h4>

                    {idea.hook && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 italic line-clamp-1 bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/50">
                        "{idea.hook}"
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-slate-700/60">
                    {idea.script && (
                      <button
                        type="button"
                        onClick={() => onOpenTeleprompter(idea)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                        title="Buka Mode Rekaman / Teleprompter"
                      >
                        <Play className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Rekam</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handlePublishWithConfetti(idea)}
                      className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/50 flex items-center gap-1.5 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Tandai Tayang</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onEditIdea(idea)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
                      title="Edit Detail Konten"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Two Column Grid: Quick Ideation Box + Daily Viral Hook Inspiration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Quick Ideation Pad */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Catat Ide Kilat
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Punya ide mendadak sebelum hilang dari ingatan? Ketik di sini dan langsung simpan ke Vault.
            </p>

            <form onSubmit={handleQuickSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={quickTitle}
                  onChange={(e) => setQuickTitle(e.target.value)}
                  placeholder="Contoh: 3 trik rahasia bikin audio renyah di CapCut..."
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-500 dark:text-slate-400">Platform:</span>
                {(['tiktok', 'instagram', 'youtube_shorts', 'youtube_long'] as Platform[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setQuickPlatform(p)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                      quickPlatform === p 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {p === 'youtube_shorts' ? 'Shorts' : p === 'youtube_long' ? 'YT Long' : p}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={!quickTitle.trim()}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Simpan Ide ke Vault</span>
              </button>
            </form>
          </div>
        </section>

        {/* Hook of the Day / Viral Formula Spotlight */}
        <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-5 border border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Formula Hook Hari Ini
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {dailyHookFormula.testedRetention}
              </span>
            </div>

            <h4 className="text-sm font-bold text-white mb-1">
              {dailyHookFormula.title}
            </h4>

            <p className="text-xs text-slate-300 mb-3">
              {dailyHookFormula.whyItWorks}
            </p>

            <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-amber-200/90 font-medium italic relative group mb-3">
              "{dailyHookFormula.example}"
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleCopyHook(dailyHookFormula.example)}
              className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedHook ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedHook ? 'Tersalin!' : 'Salin Contoh'}</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenNewIdea({
                hook: dailyHookFormula.example,
                hookFormula: dailyHookFormula.title,
                hookScore: 90
              })}
              className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pakai di Ide Baru</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

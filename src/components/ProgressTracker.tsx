import React, { useState } from 'react';
import { 
  TrendingUp, 
  Flame, 
  Award, 
  Target, 
  Eye, 
  Heart, 
  Share2, 
  CheckCircle, 
  BarChart3, 
  Plus, 
  Edit3, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { ContentIdea, CreatorProfile, PerformanceMetrics } from '../types/content';

interface ProgressTrackerProps {
  profile: CreatorProfile;
  ideas: ContentIdea[];
  onUpdateMetrics: (ideaId: string, metrics: PerformanceMetrics) => void;
  onOpenSettings: () => void;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  profile,
  ideas,
  onUpdateMetrics,
  onOpenSettings
}) => {
  const [selectedIdeaForMetric, setSelectedIdeaForMetric] = useState<ContentIdea | null>(null);
  const [metricForm, setMetricForm] = useState<PerformanceMetrics>({
    views: 0,
    likes: 0,
    retentionPercent: 0,
    notes: ''
  });

  const totalIdeas = ideas.length;
  const publishedIdeas = ideas.filter(i => i.status === 'published');
  const publishedCount = publishedIdeas.length;
  const scheduledCount = ideas.filter(i => i.status === 'scheduled').length;
  const scriptedCount = ideas.filter(i => i.status === 'scripted' || i.status === 'recording').length;
  const draftCount = ideas.filter(i => i.status === 'draft' || i.status === 'hook_ready').length;

  // Monthly and weekly progress
  const weeklyProgress = Math.min(100, Math.round((publishedCount / (profile.weeklyGoal || 4)) * 100));
  const monthlyProgress = Math.min(100, Math.round((publishedCount / (profile.monthlyGoal || 16)) * 100));

  // Total views & likes logged
  let totalViews = 0;
  let totalLikes = 0;
  let loggedVideosCount = 0;
  let totalRetentionSum = 0;

  publishedIdeas.forEach(i => {
    if (i.metrics?.views) {
      totalViews += i.metrics.views;
      totalLikes += (i.metrics.likes || 0);
      loggedVideosCount++;
      if (i.metrics.retentionPercent) {
        totalRetentionSum += i.metrics.retentionPercent;
      }
    }
  });

  const avgRetention = loggedVideosCount > 0 ? Math.round(totalRetentionSum / loggedVideosCount) : 0;

  // Platform count breakdown
  const platformCounts: Record<string, number> = {};
  ideas.forEach(i => {
    platformCounts[i.platform] = (platformCounts[i.platform] || 0) + 1;
  });

  const handleOpenMetricModal = (idea: ContentIdea) => {
    setSelectedIdeaForMetric(idea);
    setMetricForm({
      views: idea.metrics?.views || 0,
      likes: idea.metrics?.likes || 0,
      retentionPercent: idea.metrics?.retentionPercent || 0,
      notes: idea.metrics?.notes || ''
    });
  };

  const handleSaveMetrics = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIdeaForMetric) return;
    onUpdateMetrics(selectedIdeaForMetric.id, metricForm);
    setSelectedIdeaForMetric(null);
  };

  // Badges system
  const badges = [
    {
      id: 'streak_master',
      title: 'Konsistensi Api',
      desc: 'Streak aktif 5+ hari',
      unlocked: profile.streak >= 5,
      icon: Flame,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60'
    },
    {
      id: 'idea_bank',
      title: 'Pabrik Ide',
      desc: 'Menyimpan 5+ ide konten',
      unlocked: totalIdeas >= 5,
      icon: Target,
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60'
    },
    {
      id: 'producer',
      title: 'Produser Aktif',
      desc: 'Publikasikan 3+ konten',
      unlocked: publishedCount >= 3,
      icon: Award,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60'
    },
    {
      id: 'views_club',
      title: 'Centurion Views',
      desc: 'Capai 10.000+ views total',
      unlocked: totalViews >= 10000,
      icon: Eye,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60'
    }
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* Target Progress Strip */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>Target & Pencapaian Kreator</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              Pantau Pertumbuhan & Konsistensi
            </h2>
            <p className="text-xs text-indigo-200/80 mt-1">
              "Kreator yang sukses bukanlah yang paling pintar, tapi yang paling konsisten belajar dari data."
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenSettings}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 self-start sm:self-center transition-colors"
          >
            Ubah Target Goal
          </button>
        </div>

        {/* 2 Target Cards: Weekly and Monthly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-indigo-200">Target Minggu Ini</span>
              <span className="font-mono tabular-nums font-bold text-white">
                {publishedCount} / {profile.weeklyGoal} Postingan
              </span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${weeklyProgress}%` }}
              />
            </div>
            <p className="text-[11px] text-indigo-300">
              {weeklyProgress >= 100 ? '🎉 Target mingguan tercapai! Luar biasa!' : `${profile.weeklyGoal - publishedCount} postingan lagi untuk capai target mingguan.`}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-indigo-200">Target Bulan Ini</span>
              <span className="font-mono tabular-nums font-bold text-white">
                {publishedCount} / {profile.monthlyGoal} Postingan
              </span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-sky-400 rounded-full transition-all duration-500"
                style={{ width: `${monthlyProgress}%` }}
              />
            </div>
            <p className="text-[11px] text-indigo-300">
              {monthlyProgress}% menuju target bulanan konsistensi konten.
            </p>
          </div>
        </div>
      </section>

      {/* Aggregate Stats Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-indigo-500" />
            <span>Total Ide Vault</span>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
            {totalIdeas}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {draftCount} draft aktif
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Sudah Tayang</span>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
            {publishedCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {totalIdeas > 0 ? `${Math.round((publishedCount / totalIdeas) * 100)}% rasio publish` : '0%'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-sky-500" />
            <span>Total Views Terdata</span>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
            {totalViews.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Dari {loggedVideosCount} video terdata
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-purple-500" />
            <span>Rata-Rata Retensi</span>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
            {avgRetention}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Rata-rata 3s watch time
          </div>
        </div>
      </section>

      {/* Creator Badges / Achievements */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Pencapaian & Medali Kreator
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                  badge.unlocked
                    ? 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                    : 'bg-slate-50/40 dark:bg-slate-800/20 border-dashed border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${badge.unlocked ? badge.color : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {badge.unlocked ? (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                      Raih
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-slate-400">
                      Terkunci
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {badge.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {badge.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Performance Log & Post Evaluations */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Log Evaluasi Konten Tayang
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Catat views dan hal yang kamu pelajari dari video yang sudah diunggah
              </p>
            </div>
          </div>
        </div>

        {publishedIdeas.length === 0 ? (
          <div className="text-center py-10 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Belum ada postingan yang ditandai tayang.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Tandai postingan sebagai "Tayang" dari Beranda atau Vault untuk mulai mencatat performa views & likes!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {publishedIdeas.map((idea) => {
              const hasMetrics = idea.metrics && (idea.metrics.views || idea.metrics.notes);

              return (
                <div
                  key={idea.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 uppercase">
                        {idea.platform}
                      </span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {idea.format}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {idea.title}
                    </h4>

                    {hasMetrics ? (
                      <div className="flex items-center gap-4 text-xs font-mono text-slate-600 dark:text-slate-300 pt-1">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-sky-500" />
                          <span>{idea.metrics?.views?.toLocaleString('id-ID') || 0} views</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-rose-500" />
                          <span>{idea.metrics?.likes?.toLocaleString('id-ID') || 0} likes</span>
                        </span>
                        {idea.metrics?.retentionPercent ? (
                          <span>Retensi: <strong>{idea.metrics.retentionPercent}%</strong></span>
                        ) : null}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">
                        Belum ada data metrik. Klik tombol "Catat Performa" untuk menambahkan.
                      </p>
                    )}

                    {idea.metrics?.notes && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200/60 dark:border-slate-700">
                        📝 <strong>Catatan Evaluasi:</strong> {idea.metrics.notes}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenMetricModal(idea)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{hasMetrics ? 'Edit Metrik' : 'Catat Performa'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Metric Logger Modal */}
      {selectedIdeaForMetric && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div>
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Catat Hasil & Evaluasi
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 truncate">
                {selectedIdeaForMetric.title}
              </h3>
            </div>

            <form onSubmit={handleSaveMetrics} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Total Views
                  </label>
                  <input
                    type="number"
                    value={metricForm.views || ''}
                    onChange={(e) => setMetricForm({ ...metricForm, views: Number(e.target.value) || 0 })}
                    placeholder="Contoh: 12500"
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Total Likes
                  </label>
                  <input
                    type="number"
                    value={metricForm.likes || ''}
                    onChange={(e) => setMetricForm({ ...metricForm, likes: Number(e.target.value) || 0 })}
                    placeholder="Contoh: 850"
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Persentase Retensi / Watch Time (%)
                </label>
                <input
                  type="number"
                  max={100}
                  min={0}
                  value={metricForm.retentionPercent || ''}
                  onChange={(e) => setMetricForm({ ...metricForm, retentionPercent: Number(e.target.value) || 0 })}
                  placeholder="Contoh: 65"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Catatan Pembelajaran & Evaluasi
                </label>
                <textarea
                  rows={3}
                  value={metricForm.notes || ''}
                  onChange={(e) => setMetricForm({ ...metricForm, notes: e.target.value })}
                  placeholder="Apa yang membuat video ini ramai atau sepi? (Misal: 'Hook pertanyaan di 3 detik pertama terbukti ampuh, tapi durasi tengah agak bertele-tele')."
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedIdeaForMetric(null)}
                  className="flex-1 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                >
                  Simpan Metrik
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

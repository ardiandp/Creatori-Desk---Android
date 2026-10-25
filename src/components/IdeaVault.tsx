import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Play, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Tag, 
  LayoutGrid, 
  List, 
  ChevronDown,
  ArrowUpDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ContentIdea, ContentStatus, Platform, Priority } from '../types/content';

interface IdeaVaultProps {
  ideas: ContentIdea[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenNewIdea: (prefill?: Partial<ContentIdea>) => void;
  onEditIdea: (idea: ContentIdea) => void;
  onDeleteIdea: (id: string) => void;
  onOpenTeleprompter: (idea: ContentIdea) => void;
  onUpdateStatus: (id: string, newStatus: ContentStatus) => void;
}

export const IdeaVault: React.FC<IdeaVaultProps> = ({
  ideas,
  searchQuery,
  onSearchChange,
  onOpenNewIdea,
  onEditIdea,
  onDeleteIdea,
  onOpenTeleprompter,
  onUpdateStatus
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'scheduled' | 'rating'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      // Platform filter
      if (selectedPlatform !== 'all' && idea.platform !== selectedPlatform) return false;
      // Status filter
      if (selectedStatus !== 'all' && idea.status !== selectedStatus) return false;
      // Priority filter
      if (selectedPriority !== 'all' && idea.priority !== selectedPriority) return false;
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = idea.title.toLowerCase().includes(query);
        const matchesHook = idea.hook.toLowerCase().includes(query);
        const matchesScript = idea.script.toLowerCase().includes(query);
        const matchesNiche = idea.niche.toLowerCase().includes(query);
        const matchesTags = idea.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesHook && !matchesScript && !matchesNiche && !matchesTags) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'scheduled') {
        if (!a.scheduledDate) return 1;
        if (!b.scheduledDate) return -1;
        return a.scheduledDate.localeCompare(b.scheduledDate);
      }
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });
  }, [ideas, selectedPlatform, selectedStatus, selectedPriority, searchQuery, sortBy]);

  const handleStatusChange = (id: string, newStatus: ContentStatus) => {
    if (newStatus === 'published') {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
    onUpdateStatus(id, newStatus);
  };

  const getPlatformLabel = (platform: Platform) => {
    switch (platform) {
      case 'tiktok': return { label: 'TikTok', color: 'bg-black text-white dark:bg-slate-800' };
      case 'instagram': return { label: 'Instagram Reels', color: 'bg-rose-500 text-white' };
      case 'youtube_shorts': return { label: 'YT Shorts', color: 'bg-red-600 text-white' };
      case 'youtube_long': return { label: 'YouTube Video', color: 'bg-red-700 text-white' };
      case 'x_twitter': return { label: 'X (Twitter)', color: 'bg-slate-800 text-white' };
      case 'linkedin': return { label: 'LinkedIn', color: 'bg-blue-600 text-white' };
      default: return { label: platform, color: 'bg-slate-700 text-white' };
    }
  };

  const getStatusLabel = (status: ContentStatus) => {
    switch (status) {
      case 'draft': return { label: 'Draft / Ide Baru', class: 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300' };
      case 'hook_ready': return { label: 'Hook Siap', class: 'text-amber-700 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400' };
      case 'scripted': return { label: 'Naskah Siap', class: 'text-indigo-700 bg-indigo-50 dark:bg-indigo-950/50 dark:text-indigo-400' };
      case 'recording': return { label: 'Tahap Rekaman', class: 'text-purple-700 bg-purple-50 dark:bg-purple-950/50 dark:text-purple-400' };
      case 'scheduled': return { label: 'Terjadwal', class: 'text-sky-700 bg-sky-50 dark:bg-sky-950/50 dark:text-sky-400' };
      case 'published': return { label: 'Sudah Tayang', class: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400' };
    }
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Top Filter & Search Controls */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        {/* Search bar inside vault if header search isn't already active */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari kata kunci di judul, hook, atau naskah..."
            className="w-full h-10 pl-10 pr-4 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filter Segment Row 1: Platform */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-slate-400 font-medium whitespace-nowrap mr-1">Platform:</span>
          {[
            { id: 'all', label: 'Semua' },
            { id: 'tiktok', label: 'TikTok' },
            { id: 'instagram', label: 'Instagram' },
            { id: 'youtube_shorts', label: 'YT Shorts' },
            { id: 'youtube_long', label: 'YouTube' },
            { id: 'x_twitter', label: 'X' },
            { id: 'linkedin', label: 'LinkedIn' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedPlatform(tab.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedPlatform === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Segment Row 2: Status */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-slate-400 font-medium whitespace-nowrap mr-1">Status:</span>
          {[
            { id: 'all', label: 'Semua' },
            { id: 'draft', label: 'Draft' },
            { id: 'hook_ready', label: 'Hook Siap' },
            { id: 'scripted', label: 'Naskah Siap' },
            { id: 'scheduled', label: 'Terjadwal' },
            { id: 'published', label: 'Tayang' },
          ].map((statusTab) => (
            <button
              key={statusTab.id}
              type="button"
              onClick={() => setSelectedStatus(statusTab.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedStatus === statusTab.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {statusTab.label}
            </button>
          ))}
        </div>

        {/* Bottom Filter & View mode toolbar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400">
              Menampilkan <span className="font-semibold text-slate-900 dark:text-white font-mono">{filteredIdeas.length}</span> ide
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-none rounded-lg px-2.5 py-1 text-xs focus:ring-1 focus:ring-indigo-500 font-medium"
            >
              <option value="newest">Terbaru Dibuat</option>
              <option value="scheduled">Jadwal Terdekat</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600'}`}
              title="Tampilan Grid"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600'}`}
              title="Tampilan List"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Ideas Collection */}
      {filteredIdeas.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <Sparkles className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Tidak ada ide konten yang cocok
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian, sesuaikan filter, atau buat ide konten baru untuk mengisi vault kamu.
          </p>
          <button
            type="button"
            onClick={() => onOpenNewIdea()}
            className="mt-4 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Ide Baru Sekarang</span>
          </button>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'}>
          {filteredIdeas.map((idea) => {
            const platformInfo = getPlatformLabel(idea.platform);
            const statusInfo = getStatusLabel(idea.status);

            return (
              <div
                key={idea.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all flex flex-col justify-between gap-4 group"
              >
                <div>
                  {/* Top metadata strip */}
                  <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${platformInfo.color}`}>
                        {platformInfo.label}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {idea.format}
                      </span>
                      <span className="text-slate-300 dark:text-slate-600">·</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {idea.niche}
                      </span>
                    </div>

                    {/* Priority Stars */}
                    <div className="flex items-center gap-0.5" title={`Prioritas: ${idea.priority} (Rating: ${idea.rating}/5)`}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= (idea.rating || 3)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200 dark:text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {idea.title}
                  </h3>

                  {/* Hook Quote Box if present */}
                  {idea.hook && (
                    <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-indigo-500" />
                          <span>Hook 3 Detik:</span>
                        </span>
                        {idea.hookScore && (
                          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                            Skor {idea.hookScore}/100
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 italic line-clamp-2">
                        "{idea.hook}"
                      </p>
                    </div>
                  )}

                  {/* Script preview snippet if exists */}
                  {idea.script && !idea.hook && (
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {idea.script}
                    </p>
                  )}

                  {/* Schedule Indicator if exists */}
                  {idea.scheduledDate && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 px-2.5 py-1 rounded-xl w-fit">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="font-medium font-mono tabular-nums">
                        Jadwal: {idea.scheduledDate} {idea.scheduledTime ? `@ ${idea.scheduledTime}` : ''}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Row: Status Selector & Action Buttons */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
                  {/* Status Dropdown */}
                  <div className="relative">
                    <select
                      value={idea.status}
                      onChange={(e) => handleStatusChange(idea.id, e.target.value as ContentStatus)}
                      className={`text-xs font-semibold px-2.5 py-1.5 rounded-xl border-none pr-7 appearance-none cursor-pointer ${statusInfo.class}`}
                    >
                      <option value="draft">Draft</option>
                      <option value="hook_ready">Hook Siap</option>
                      <option value="scripted">Naskah Siap</option>
                      <option value="recording">Tahap Rekaman</option>
                      <option value="scheduled">Terjadwal</option>
                      <option value="published">Tayang ✅</option>
                    </select>
                    <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1">
                    {idea.script && (
                      <button
                        type="button"
                        onClick={() => onOpenTeleprompter(idea)}
                        className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 rounded-xl transition-colors"
                        title="Buka Teleprompter / Mode Rekam"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onEditIdea(idea)}
                      className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                      title="Edit Detail Konten"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Hapus ide "${idea.title}"?`)) {
                          onDeleteIdea(idea.id);
                        }
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
                      title="Hapus Ide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

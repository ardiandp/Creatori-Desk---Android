import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Clock, 
  Calendar, 
  Star, 
  ChevronDown, 
  FileText, 
  Zap, 
  Check, 
  HelpCircle,
  Hash
} from 'lucide-react';
import { 
  ContentFormat, 
  ContentIdea, 
  ContentStatus, 
  NicheCategory, 
  Platform, 
  Priority 
} from '../types/content';
import { HOOK_FORMULAS, calculateHookScore } from '../utils/hookFormulas';
import { getTodayString } from '../utils/storage';

interface IdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (idea: ContentIdea) => void;
  initialData?: Partial<ContentIdea> | null;
}

export const IdeaModal: React.FC<IdeaModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const [title, setTitle] = useState('');
  const [niche, setNiche] = useState<NicheCategory>('Tech & AI');
  const [platform, setPlatform] = useState<Platform>('tiktok');
  const [format, setFormat] = useState<ContentFormat>('Reels / Shorts');
  const [status, setStatus] = useState<ContentStatus>('draft');
  const [priority, setPriority] = useState<Priority>('medium');
  const [rating, setRating] = useState<number>(4);
  const [hook, setHook] = useState('');
  const [hookFormula, setHookFormula] = useState('');
  const [script, setScript] = useState('');
  const [callToAction, setCallToAction] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('19:00');
  const [tagsInput, setTagsInput] = useState('');

  // Active sub-tab inside modal
  const [activeTab, setActiveTab] = useState<'details' | 'hook' | 'script'>('details');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setNiche(initialData.niche || 'Tech & AI');
      setPlatform(initialData.platform || 'tiktok');
      setFormat(initialData.format || 'Reels / Shorts');
      setStatus(initialData.status || 'draft');
      setPriority(initialData.priority || 'medium');
      setRating(initialData.rating || 4);
      setHook(initialData.hook || '');
      setHookFormula(initialData.hookFormula || '');
      setScript(initialData.script || '');
      setCallToAction(initialData.callToAction || '');
      setScheduledDate(initialData.scheduledDate || '');
      setScheduledTime(initialData.scheduledTime || '19:00');
      setTagsInput(initialData.tags ? initialData.tags.join(', ') : '');
    } else {
      setTitle('');
      setNiche('Tech & AI');
      setPlatform('tiktok');
      setFormat('Reels / Shorts');
      setStatus('draft');
      setPriority('medium');
      setRating(4);
      setHook('');
      setHookFormula('');
      setScript('');
      setCallToAction('');
      setScheduledDate('');
      setScheduledTime('19:00');
      setTagsInput('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const hookAnalysis = calculateHookScore(hook);

  // Script metrics
  const scriptWords = script.trim() ? script.trim().split(/\s+/).length : 0;
  const scriptDurationSec = Math.round((scriptWords / 2.5) * 10) / 10;

  const handleSelectFormula = (formulaId: string) => {
    const f = HOOK_FORMULAS.find(item => item.id === formulaId);
    if (f) {
      setHook(f.example);
      setHookFormula(f.title);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tagsArray = tagsInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const nowIso = new Date().toISOString();

    const savedIdea: ContentIdea = {
      id: initialData?.id || `idea-${Date.now()}`,
      title: title.trim(),
      niche,
      platform,
      format,
      status,
      priority,
      rating,
      hook: hook.trim(),
      hookFormula,
      hookScore: hookAnalysis.score,
      script: script.trim(),
      callToAction: callToAction.trim(),
      scheduledDate,
      scheduledTime: scheduledDate ? scheduledTime : '',
      publishedDate: status === 'published' ? (initialData?.publishedDate || getTodayString()) : undefined,
      tags: tagsArray,
      createdAt: initialData?.createdAt || nowIso,
      updatedAt: nowIso,
      metrics: initialData?.metrics
    };

    onSave(savedIdea);
    onClose();
  };

  const niches: NicheCategory[] = [
    'Tech & AI',
    'Edukasi',
    'Bisnis & Finansial',
    'Lifestyle & Produktivitas',
    'Hiburan & Komedi',
    'Tips & Tutorial',
    'Storytelling & Pengalaman',
    'Karier & Kerja',
    'Kesehatan & Olahraga',
    'Lainnya'
  ];

  const platforms: { id: Platform; label: string }[] = [
    { id: 'tiktok', label: 'TikTok' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'youtube_shorts', label: 'YouTube Shorts' },
    { id: 'youtube_long', label: 'YouTube Panjang' },
    { id: 'x_twitter', label: 'X (Twitter)' },
    { id: 'linkedin', label: 'LinkedIn' },
  ];

  const formats: ContentFormat[] = [
    'Reels / Shorts',
    'Video Panjang',
    'Carousel / Slide',
    'Thread / Teks',
    'Story / Live'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {initialData?.id ? 'Edit Ide Konten' : 'Buat Ide Konten Baru'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lengkapi naskah, racik hook, dan tentukan jadwal publikasi
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Inner Tabs */}
        <div className="px-5 pt-3 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-2 shrink-0 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`pb-2.5 font-semibold border-b-2 transition-colors ${
              activeTab === 'details'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            1. Detail & Platform
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('hook')}
            className={`pb-2.5 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'hook'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <span>2. Hook 3 Detik</span>
            {hook && (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold">
                {hookAnalysis.score}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('script')}
            className={`pb-2.5 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'script'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <span>3. Naskah & CTA</span>
            {scriptWords > 0 && (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {scriptWords}w
              </span>
            )}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Judul Konten / Konsep Utama <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: 3 trik tersembunyi CapCut yang jarang diketahui..."
                  className="w-full text-sm p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Platform Tujuan
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as Platform)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  >
                    {platforms.map(p => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Format Konten
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as ContentFormat)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  >
                    {formats.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Niche / Kategori
                  </label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value as NicheCategory)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  >
                    {niches.map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Status Tahapan
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ContentStatus)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  >
                    <option value="draft">Draft / Ide Mentah</option>
                    <option value="hook_ready">Hook Siap</option>
                    <option value="scripted">Naskah Selesai</option>
                    <option value="recording">Tahap Rekaman Video</option>
                    <option value="scheduled">Terjadwal di Kalender</option>
                    <option value="published">Sudah Tayang</option>
                  </select>
                </div>
              </div>

              {/* Priority & Excitement Rating */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Prioritas & Potensi Ide
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Beri rating seberapa yakin kamu ide ini akan diminati
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Scheduling fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Jadwal Tanggal Tayang</span>
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Jam Posting (WIB)</span>
                  </label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Hash className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Tagar / Kata Kunci (Pisahkan dengan koma)</span>
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="ai, editing, tutorial, viral"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>
            </div>
          )}

          {/* TAB 2: HOOK STUDIO */}
          {activeTab === 'hook' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Hook Pembuka (3 Detik Pertama)
                  </label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Kalimat pertama yang kamu ucapkan atau tampil di layar
                  </p>
                </div>

                {hook && (
                  <div className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-lg">
                    Skor: {hookAnalysis.score}/100
                  </div>
                )}
              </div>

              {/* Quick Template Picker Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  💡 Ingin pakai template formula yang terbukti?
                </label>
                <select
                  onChange={(e) => handleSelectFormula(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  defaultValue=""
                >
                  <option value="" disabled>-- Pilih Formula Hook Viral --</option>
                  {HOOK_FORMULAS.map((f) => (
                    <option key={f.id} value={f.id}>
                      [{f.categoryName.split(' ')[0]}] {f.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <textarea
                  rows={4}
                  value={hook}
                  onChange={(e) => setHook(e.target.value)}
                  placeholder="Tulis hook di sini... Contoh: 'Stop bikin konten begini kalau nggak mau akunmu sepi!'"
                  className="w-full text-sm p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 resize-none font-medium"
                />
              </div>

              {/* Live Hook Retention Feedback */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs space-y-1">
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  {hookAnalysis.feedback}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-3">
                  <span>Panjang: <strong>{hookAnalysis.wordCount}</strong> kata</span>
                  <span>·</span>
                  <span>Estimasi baca: <strong>~{hookAnalysis.readTimeSec}</strong> detik (Target: 3-5 detik)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SCRIPT & CTA */}
          {activeTab === 'script' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Naskah Lengkap / Poin Pembahasan
                  </label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Bisa berupa bullet points atau teks kata-demi-kata untuk dibaca di Teleprompter
                  </p>
                </div>

                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {scriptWords} kata · ~{scriptDurationSec}s
                </div>
              </div>

              <div>
                <textarea
                  rows={8}
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  placeholder={`1. Masalah utama penonton: ...
2. Solusi & cara implementasi langkah demi langkah: ...
3. Contoh sebelum & sesudah: ...
4. Kesimpulan ringkas.`}
                  className="w-full text-sm p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 resize-y font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Call to Action (CTA) Penutup
                </label>
                <input
                  type="text"
                  value={callToAction}
                  onChange={(e) => setCallToAction(e.target.value)}
                  placeholder="Contoh: 'Komen TEMPLATE di bawah buat dapetin link gratisnya!'"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400"
                />
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Ide Konten</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

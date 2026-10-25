import React, { useState } from 'react';
import { 
  Zap, 
  Sparkles, 
  Copy, 
  Check, 
  Bookmark, 
  Plus, 
  Smartphone, 
  Lightbulb, 
  TrendingUp, 
  Trash2,
  HelpCircle,
  Flame,
  ArrowRight
} from 'lucide-react';
import { HookCategory, HookFormula, SavedHook } from '../types/content';
import { HOOK_FORMULAS, calculateHookScore } from '../utils/hookFormulas';

interface HookStudioProps {
  savedHooks: SavedHook[];
  onSaveHook: (hook: SavedHook) => void;
  onDeleteHook: (id: string) => void;
  onCreateIdeaFromHook: (hookText: string, formulaTitle: string) => void;
}

export const HookStudio: React.FC<HookStudioProps> = ({
  savedHooks,
  onSaveHook,
  onDeleteHook,
  onCreateIdeaFromHook
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customHook, setCustomHook] = useState<string>(
    'Stop posting video jam 12 malam kalau kamu nggak mau engagement akunmu anjlok drastis!'
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Generator inputs
  const [topicInput, setTopicInput] = useState<string>('Bikin Konten Medsos');
  const [painInput, setPainInput] = useState<string>('View mentok di 200 penonton');
  const [dreamInput, setDreamInput] = useState<string>('Tembus 50.000 views dalam seminggu');
  const [generatedVariations, setGeneratedVariations] = useState<string[]>([]);

  // Hook evaluation
  const hookAnalysis = calculateHookScore(customHook);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Semua Formula' },
    { id: 'negative', label: 'Negative / Anti-Rugi' },
    { id: 'curiosity', label: 'Curiosity Gap' },
    { id: 'proof', label: 'Proof & Hasil' },
    { id: 'contrarian', label: 'Contrarian / Hot Take' },
    { id: 'story', label: 'Storytelling' },
    { id: 'question', label: 'Direct Pain Point' }
  ];

  const filteredFormulas = selectedCategory === 'all'
    ? HOOK_FORMULAS
    : HOOK_FORMULAS.filter(f => f.category === selectedCategory);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveCurrentHook = () => {
    if (!customHook.trim()) return;
    const newHook: SavedHook = {
      id: `hook-${Date.now()}`,
      text: customHook.trim(),
      formulaTitle: 'Custom Studio Hook',
      category: 'negative',
      topic: topicInput || 'Umum',
      createdAt: new Date().toISOString()
    };
    onSaveHook(newHook);
  };

  const generateVariations = () => {
    const topic = topicInput.trim() || 'topik ini';
    const pain = painInput.trim() || 'hasilnya mengecewakan';
    const dream = dreamInput.trim() || 'hasil luar biasa';

    const results = [
      `Stop ${topic} dengan cara lama kalau kamu nggak mau ${pain}!`,
      `Rahasia yang 99% orang nggak tahu tentang ${topic} untuk ${dream}...`,
      `Cara aku mengubah ${pain} jadi ${dream} cuma dalam waktu 7 hari!`,
      `Semua orang salah paham tentang ${topic}. Nasihat populer itu sebenarnya bikin kamu gagal!`,
      `Pernah nggak kamu ngerasa udah capek-capek ${topic}, tapi malah ${pain}?`
    ];
    setGeneratedVariations(results);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <section className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Studio Hook 3 Detik</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              Racik Kalimat Pembuka yang Menahan Jari Penonton
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200/90 mt-1 max-w-xl">
              80% kesuksesan video pendek ditentukan dalam 3 detik pertama. Gunakan formula psikologi audiens untuk mencegah orang swipe away.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 shrink-0">
            <Flame className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs text-indigo-200 font-medium">Sweet Spot Durasi:</div>
              <div className="text-sm font-bold text-white font-mono">3 - 5 Detik (8-20 Kata)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hook Writer & Real-Time Retention Analyzer */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Tulis & Evaluasi Skor Hook Kamu
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">Skor Potensi Retensi:</span>
            <span className={`text-sm font-bold font-mono px-2 py-0.5 rounded-lg ${
              hookAnalysis.score >= 80 
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400' 
                : hookAnalysis.score >= 65 
                ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
                : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'
            }`}>
              {hookAnalysis.score} / 100
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Input & Feedback (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="relative">
              <textarea
                rows={3}
                value={customHook}
                onChange={(e) => setCustomHook(e.target.value)}
                placeholder="Tulis kalimat pertama video kamu di sini..."
                className="w-full text-sm p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors resize-none font-medium"
              />
            </div>

            {/* Micro Stats & Advice */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  {hookAnalysis.feedback}
                </div>
                <div className="text-slate-500 dark:text-slate-400 flex items-center gap-3">
                  <span>Panjang: <strong className="font-mono text-slate-700 dark:text-slate-300">{hookAnalysis.wordCount}</strong> kata</span>
                  <span>·</span>
                  <span>Estimasi baca: <strong className="font-mono text-slate-700 dark:text-slate-300">~{hookAnalysis.readTimeSec}</strong> detik</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleSaveCurrentHook}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Simpan Hook</span>
                </button>

                <button
                  type="button"
                  onClick={() => onCreateIdeaFromHook(customHook, 'Custom Hook')}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Jadikan Ide Konten</span>
                </button>
              </div>
            </div>
          </div>

          {/* 9:16 Video Mockup Preview (1 Col) */}
          <div className="bg-slate-950 text-white rounded-2xl p-4 flex flex-col justify-between aspect-[9/14] sm:aspect-[9/13] max-w-[240px] mx-auto w-full shadow-lg border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] text-slate-400 z-10">
              <span className="flex items-center gap-1">
                <Smartphone className="w-3 h-3" />
                <span>Simulasi Layar 9:16</span>
              </span>
              <span className="bg-red-500/80 px-1.5 py-0.5 rounded text-[9px] text-white font-bold">
                00:03
              </span>
            </div>

            {/* Video overlay text simulation */}
            <div className="z-10 my-auto text-center px-2">
              <div className="bg-black/75 backdrop-blur-xs border border-white/20 p-2.5 rounded-xl shadow-xl">
                <p className="text-xs font-extrabold text-amber-300 leading-snug drop-shadow-md">
                  {customHook || 'Kalimat hook kamu akan tampil di sini'}
                </p>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 font-medium">
                Teks on-screen 3 detik pertama
              </p>
            </div>

            <div className="z-10 flex items-center justify-between text-[10px] text-slate-400 border-t border-white/10 pt-2">
              <span>@kreator</span>
              <span>Suara Asli 🎵</span>
            </div>
          </div>
        </div>
      </section>

      {/* Generator Cepat Variasi Hook */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Generator Cepat Variasi Hook
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Isi 3 variabel sederhana ini, dan sistem akan meracik 5 variasi hook berdaya tahan tinggi secara instan:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              1. Topik Konten
            </label>
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="Misal: Bikin Konten Reels"
              className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              2. Masalah / Kesalahan Penonton
            </label>
            <input
              type="text"
              value={painInput}
              onChange={(e) => setPainInput(e.target.value)}
              placeholder="Misal: View selalu mentok di 200"
              className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              3. Hasil Impian (Desired Outcome)
            </label>
            <input
              type="text"
              value={dreamInput}
              onChange={(e) => setDreamInput(e.target.value)}
              placeholder="Misal: Tembus 50.000 views dalam seminggu"
              className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={generateVariations}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>Buat 5 Variasi Hook Instan</span>
        </button>

        {generatedVariations.length > 0 && (
          <div className="mt-4 space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Hasil Variasi Hook:
            </h4>
            {generatedVariations.map((hookText, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-3"
              >
                <p className="text-xs font-medium text-slate-900 dark:text-white flex-1">
                  "{hookText}"
                </p>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setCustomHook(hookText);
                    }}
                    className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100"
                  >
                    Uji Skor
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy(`gen-${idx}`, hookText)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg"
                    title="Salin Hook"
                  >
                    {copiedId === `gen-${idx}` ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => onCreateIdeaFromHook(hookText, 'Generated Formula')}
                    className="px-2.5 py-1 text-[11px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                  >
                    Pakai di Ide
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Formula Bank Library */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Bank Formula Hook Terbukti
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pilih formula psikologis yang sudah teruji di ribuan video viral
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                selectedCategory === c.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Formulas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFormulas.map((f) => (
            <div
              key={f.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${f.badgeColor}`}>
                    {f.categoryName.split(' ')[0]}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    {f.testedRetention}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {f.title}
                </h4>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {f.whyItWorks}
                </p>

                <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-400">Pola Formula:</div>
                  <div className="text-xs font-mono text-slate-800 dark:text-slate-200">
                    {f.pattern}
                  </div>
                  <div className="text-[11px] font-semibold text-indigo-500 pt-1">Contoh Nyata:</div>
                  <div className="text-xs italic text-slate-700 dark:text-slate-300 font-medium">
                    "{f.example}"
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(f.id, f.example)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === f.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === f.id ? 'Tersalin' : 'Salin Contoh'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCustomHook(f.example);
                    window.scrollTo({ top: 180, behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex items-center gap-1.5 hover:bg-indigo-100 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Coba Edit di Editor</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Saved Hooks Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Koleksi Hook Tersimpan ({savedHooks.length})
            </h3>
          </div>
        </div>

        {savedHooks.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400 italic py-4 text-center">
            Belum ada hook yang disimpan ke koleksi pribadi. Klik tombol "Simpan Hook" di atas untuk menyimpan hook favoritmu.
          </p>
        ) : (
          <div className="space-y-2.5">
            {savedHooks.map((sh) => (
              <div
                key={sh.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">{sh.formulaTitle}</span>
                    {sh.topic && (
                      <>
                        <span>·</span>
                        <span>{sh.topic}</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 italic">
                    "{sh.text}"
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopy(sh.id, sh.text)}
                    className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-700"
                    title="Salin Hook"
                  >
                    {copiedId === sh.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => onCreateIdeaFromHook(sh.text, sh.formulaTitle)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
                  >
                    Gunakan di Ide
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteHook(sh.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 rounded-xl"
                    title="Hapus dari koleksi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

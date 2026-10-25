import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Sparkles, 
  Eye,
  CheckCircle2
} from 'lucide-react';
import { ContentIdea } from '../types/content';

interface TeleprompterModalProps {
  idea: ContentIdea | null;
  onClose: () => void;
  onMarkPublished?: (idea: ContentIdea) => void;
}

export const TeleprompterModal: React.FC<TeleprompterModalProps> = ({
  idea,
  onClose,
  onMarkPublished
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(2); // pixels per tick
  const [fontSize, setFontSize] = useState<number>(22); // px
  const [countdown, setCountdown] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCountdown(null);
      setIsPlaying(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Handle smooth auto-scrolling
  useEffect(() => {
    if (isPlaying) {
      const scrollStep = () => {
        if (containerRef.current) {
          containerRef.current.scrollTop += scrollSpeed * 0.5;
        }
        animationFrameRef.current = requestAnimationFrame(scrollStep);
      };
      animationFrameRef.current = requestAnimationFrame(scrollStep);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, scrollSpeed]);

  if (!idea) return null;

  const handleStartCountdown = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setCountdown(3);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col">
      {/* Top Teleprompter Controls Bar */}
      <div className="p-3 sm:p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0" />
          <h2 className="text-sm font-bold truncate text-white">
            Teleprompter: {idea.title}
          </h2>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Font Controls */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-800 rounded-xl p-1 text-xs">
            <button
              type="button"
              onClick={() => setFontSize(Math.max(16, fontSize - 2))}
              className="p-1 hover:text-indigo-400"
              title="Perkecil Teks"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono px-1">{fontSize}px</span>
            <button
              type="button"
              onClick={() => setFontSize(Math.min(36, fontSize + 2))}
              className="p-1 hover:text-indigo-400"
              title="Perbesar Teks"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-800 rounded-xl px-2 py-1 text-xs font-mono">
            <span className="text-slate-400">Kecepatan:</span>
            {[1, 2, 3].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setScrollSpeed(s)}
                className={`px-1.5 py-0.5 rounded ${scrollSpeed === s ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400'}`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Countdown Overlay */}
      {countdown !== null && countdown > 0 && (
        <div className="absolute inset-0 z-40 bg-black/80 flex items-center justify-center pointer-events-none">
          <div className="text-8xl font-black text-amber-400 animate-ping font-mono">
            {countdown}
          </div>
        </div>
      )}

      {/* Prompter Text Scroll Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-6 sm:px-12 md:px-24 py-12 max-w-4xl mx-auto w-full text-center space-y-8 select-none"
        style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
      >
        {/* Prompter Guide Line */}
        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest pb-4 border-b border-slate-800">
          --- MULAI REKAMAN DI SINI ---
        </div>

        {/* Hook */}
        {idea.hook && (
          <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-extrabold shadow-lg">
            <div className="text-xs uppercase tracking-wider text-amber-400 font-mono mb-2 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>3 Detik Pertama (Tatap Lensa Kamera):</span>
            </div>
            "{idea.hook}"
          </div>
        )}

        {/* Script Content */}
        <div className="font-semibold text-slate-100 whitespace-pre-wrap text-left sm:text-center max-w-2xl mx-auto">
          {idea.script || 'Belum ada naskah yang ditulis untuk ide ini. Tambahkan naskah di menu edit.'}
        </div>

        {/* Call to Action */}
        {idea.callToAction && (
          <div className="p-6 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold shadow-lg">
            <div className="text-xs uppercase tracking-wider text-indigo-400 font-mono mb-2">
              Penutup / Call to Action:
            </div>
            "{idea.callToAction}"
          </div>
        )}

        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest pt-12">
          --- AKHIR NASKAH ---
        </div>
      </div>

      {/* Bottom Teleprompter Control Dock */}
      <div className="p-4 bg-slate-900/95 border-t border-slate-800 flex items-center justify-center gap-3 shrink-0">
        <button
          type="button"
          onClick={handleReset}
          className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          title="Ulangi dari Awal"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleStartCountdown}
          className={`px-8 py-3.5 rounded-2xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg ${
            isPlaying
              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5" />
              <span>Jeda Prompter</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              <span>Mulai Gulir (Countdown 3s)</span>
            </>
          )}
        </button>

        {onMarkPublished && idea.status !== 'published' && (
          <button
            type="button"
            onClick={() => {
              onMarkPublished(idea);
              onClose();
            }}
            className="px-4 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="hidden sm:inline">Selesai Rekam &</span> Tayang
          </button>
        )}
      </div>
    </div>
  );
};

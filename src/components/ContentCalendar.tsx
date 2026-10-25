import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  CheckCircle2, 
  Play, 
  Edit3, 
  Sparkles,
  CalendarDays
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ContentIdea, Platform } from '../types/content';
import { getTodayString } from '../utils/storage';

interface ContentCalendarProps {
  ideas: ContentIdea[];
  onOpenNewIdea: (prefill?: Partial<ContentIdea>) => void;
  onEditIdea: (idea: ContentIdea) => void;
  onOpenTeleprompter: (idea: ContentIdea) => void;
  onMarkAsPublished: (idea: ContentIdea) => void;
}

export const ContentCalendar: React.FC<ContentCalendarProps> = ({
  ideas,
  onOpenNewIdea,
  onEditIdea,
  onOpenTeleprompter,
  onMarkAsPublished
}) => {
  const todayStr = getTodayString();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string>(todayStr);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First day of month
  const firstDay = new Date(year, month, 1);
  // Total days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Day of week for first day (0 = Sunday, 1 = Monday, etc.)
  const startDayOfWeek = firstDay.getDay(); // 0 is Sunday

  // Month names in Indonesian
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDateStr(todayStr);
  };

  // Map ideas by scheduled date YYYY-MM-DD
  const ideasByDate: Record<string, ContentIdea[]> = {};
  ideas.forEach((idea) => {
    if (idea.scheduledDate) {
      if (!ideasByDate[idea.scheduledDate]) {
        ideasByDate[idea.scheduledDate] = [];
      }
      ideasByDate[idea.scheduledDate].push(idea);
    }
  });

  const selectedDateIdeas = ideasByDate[selectedDateStr] || [];

  const getPlatformDotColor = (platform: Platform) => {
    switch (platform) {
      case 'tiktok': return 'bg-slate-900 dark:bg-white';
      case 'instagram': return 'bg-pink-500';
      case 'youtube_shorts': return 'bg-red-500';
      case 'youtube_long': return 'bg-red-700';
      case 'x_twitter': return 'bg-sky-500';
      case 'linkedin': return 'bg-blue-600';
      default: return 'bg-indigo-500';
    }
  };

  const handlePublishWithConfetti = (idea: ContentIdea) => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onMarkAsPublished(idea);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Calendar Header Controls */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {monthNames[month]} {year}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Jadwalkan dan pantau ritme postingan mingguan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-center">
            <button
              type="button"
              onClick={goToToday}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Hari Ini
            </button>
            <button
              type="button"
              onClick={prevMonth}
              className="p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Bulan sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Bulan berikutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 mb-2">
          {dayNames.map((d, idx) => (
            <div key={idx} className="py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Days Grid */}
        <div className="grid grid-cols-7 gap-1.5">
          {/* Empty cells before month start */}
          {Array.from({ length: startDayOfWeek }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-16 sm:h-20 rounded-2xl bg-slate-50/50 dark:bg-slate-800/20" />
          ))}

          {/* Actual days */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDateStr;
            const dayItems = ideasByDate[dateStr] || [];

            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => setSelectedDateStr(dateStr)}
                className={`h-16 sm:h-20 p-1.5 rounded-2xl flex flex-col justify-between text-left transition-all relative ${
                  isSelected
                    ? 'ring-2 ring-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40'
                    : isToday
                    ? 'bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800'
                    : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded-md ${
                      isToday
                        ? 'bg-amber-500 text-white'
                        : isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {dayNum}
                  </span>

                  {dayItems.length > 0 && (
                    <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                      {dayItems.length}
                    </span>
                  )}
                </div>

                {/* Dots indicator for platforms */}
                {dayItems.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap mt-auto">
                    {dayItems.slice(0, 3).map((item, dotIdx) => (
                      <span
                        key={dotIdx}
                        className={`w-2 h-2 rounded-full ${getPlatformDotColor(item.platform)}`}
                        title={`${item.platform}: ${item.title}`}
                      />
                    ))}
                    {dayItems.length > 3 && (
                      <span className="text-[9px] text-slate-400 leading-none">
                        +{dayItems.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Selected Date Detail Panel */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Detail Agenda Tanggal
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
              {new Intl.DateTimeFormat('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }).format(new Date(selectedDateStr + 'T00:00:00'))}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => onOpenNewIdea({
              scheduledDate: selectedDateStr,
              scheduledTime: '19:00',
              status: 'scheduled'
            })}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 self-start sm:self-center transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Jadwalkan di Tanggal Ini</span>
          </button>
        </div>

        {selectedDateIdeas.length === 0 ? (
          <div className="text-center py-10 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700">
            <Clock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Tidak ada konten terjadwal di tanggal ini
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Klik tombol "Jadwalkan di Tanggal Ini" untuk membuat jadwal postingan video atau artikel kamu.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedDateIdeas.map((idea) => {
              const isPublished = idea.status === 'published';

              return (
                <div
                  key={idea.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 uppercase">
                        {idea.platform}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {idea.format}
                      </span>
                      {idea.scheduledTime && (
                        <>
                          <span className="text-slate-300 dark:text-slate-600">·</span>
                          <span className="text-xs font-semibold font-mono text-slate-700 dark:text-slate-300">
                            Pukul {idea.scheduledTime} WIB
                          </span>
                        </>
                      )}
                      {isPublished && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                          Sudah Tayang ✅
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {idea.title}
                    </h4>

                    {idea.hook && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 italic line-clamp-1 bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                        "{idea.hook}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {idea.script && (
                      <button
                        type="button"
                        onClick={() => onOpenTeleprompter(idea)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
                        title="Buka Teleprompter"
                      >
                        <Play className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Rekam</span>
                      </button>
                    )}

                    {!isPublished ? (
                      <button
                        type="button"
                        onClick={() => handlePublishWithConfetti(idea)}
                        className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl hover:bg-emerald-100 flex items-center gap-1.5 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Tayang</span>
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        Tayang
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => onEditIdea(idea)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/50"
                      title="Edit Detail Konten"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

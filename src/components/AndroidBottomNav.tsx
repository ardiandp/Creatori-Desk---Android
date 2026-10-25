import React from 'react';
import { 
  LayoutDashboard, 
  Lightbulb, 
  Zap, 
  CalendarDays, 
  TrendingUp, 
  Plus
} from 'lucide-react';

interface AndroidBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenNewIdeaModal: () => void;
}

export const AndroidBottomNav: React.FC<AndroidBottomNavProps> = ({
  activeTab,
  onTabChange,
  onOpenNewIdeaModal
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Beranda', icon: LayoutDashboard },
    { id: 'vault', label: 'Ide Vault', icon: Lightbulb },
    { id: 'hook', label: 'Hook Studio', icon: Zap },
    { id: 'calendar', label: 'Kalender', icon: CalendarDays },
    { id: 'progress', label: 'Kemajuan', icon: TrendingUp },
  ];

  return (
    <>
      {/* Floating Action Button (FAB) for instant content idea creation */}
      <div className="fixed bottom-20 right-4 sm:right-6 md:right-8 z-40">
        <button
          type="button"
          onClick={onOpenNewIdeaModal}
          className="h-14 w-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-xl shadow-indigo-600/30 flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 group"
          title="Buat Ide Konten Baru"
          aria-label="Buat Ide Konten Baru"
        >
          <Plus className="w-6 h-6 transition-transform group-hover:rotate-90 duration-200" />
        </button>
      </div>

      {/* Android Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 pb-safe transition-colors">
        <div className="max-w-md md:max-w-xl mx-auto grid grid-cols-5 h-16 items-center px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center justify-center h-full w-full py-1 min-h-[48px] rounded-xl transition-all duration-150 ${
                  isActive 
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
                }`}
              >
                <div className={`relative px-3 py-1 rounded-full transition-colors ${isActive ? 'bg-indigo-50 dark:bg-indigo-950/60' : ''}`}>
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : 'scale-100'}`} />
                </div>
                <span className="text-[11px] leading-tight tracking-tight mt-0.5">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

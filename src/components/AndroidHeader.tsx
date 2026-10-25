import React from 'react';
import { 
  Sparkles, 
  Search, 
  Sun, 
  Moon, 
  Settings, 
  Smartphone, 
  Monitor,
  CalendarCheck
} from 'lucide-react';
import { CreatorProfile } from '../types/content';

interface AndroidHeaderProps {
  profile: CreatorProfile;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  onToggleTheme: () => void;
  theme: 'dark' | 'light' | 'system';
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  onOpenSettings: () => void;
  activeTab: string;
}

export const AndroidHeader: React.FC<AndroidHeaderProps> = ({
  profile,
  searchQuery,
  onSearchChange,
  isSearchOpen,
  setIsSearchOpen,
  onToggleTheme,
  theme,
  isPhoneFrame,
  onTogglePhoneFrame,
  onOpenSettings,
  activeTab
}) => {
  // Page Title mapping based on active tab
  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Creator Desk';
      case 'vault': return 'Vault Ide Konten';
      case 'hook': return 'Studio Hook Video';
      case 'calendar': return 'Kalender Konten';
      case 'progress': return 'Pelacak Kemajuan';
      default: return 'Creator Desk';
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Top Android App Bar */}
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="truncate">
            <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white truncate">
              {getTabTitle()}
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block truncate">
              {profile.name} · {profile.niche}
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Quick Search Toggle */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`min-h-[40px] min-w-[40px] p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center ${isSearchOpen ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400' : ''}`}
            title="Cari ide & hook"
            aria-label="Cari"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Phone Frame Toggle (Mobile App vs Desktop View) */}
          <button
            type="button"
            onClick={onTogglePhoneFrame}
            className={`min-h-[40px] min-w-[40px] p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden md:flex items-center justify-center ${isPhoneFrame ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40' : ''}`}
            title={isPhoneFrame ? "Beralih ke Tampilan Lebar Desktop" : "Simulasikan Tampilan Android Phone"}
            aria-label="Mode Tampilan"
          >
            {isPhoneFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="min-h-[40px] min-w-[40px] p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
            title={theme === 'dark' ? "Mode Terang" : "Mode Gelap"}
            aria-label="Ganti Tema"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Settings / Local Backup */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="min-h-[40px] min-w-[40px] p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
            title="Pengaturan & Backup Data Lokal"
            aria-label="Pengaturan"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {isSearchOpen && (
        <div className="px-4 pb-3 max-w-6xl mx-auto transition-all duration-200">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari judul konten, hook video, catatan, atau tag..."
              className="w-full h-10 pl-10 pr-10 text-sm bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-indigo-500 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1 py-0.5"
              >
                Hapus
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

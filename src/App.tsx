import React, { useState, useEffect } from 'react';
import { AndroidHeader } from './components/AndroidHeader';
import { AndroidBottomNav } from './components/AndroidBottomNav';
import { Dashboard } from './components/Dashboard';
import { IdeaVault } from './components/IdeaVault';
import { HookStudio } from './components/HookStudio';
import { ContentCalendar } from './components/ContentCalendar';
import { ProgressTracker } from './components/ProgressTracker';
import { IdeaModal } from './components/IdeaModal';
import { TeleprompterModal } from './components/TeleprompterModal';
import { SettingsModal } from './components/SettingsModal';
import { 
  ContentIdea, 
  ContentStatus, 
  CreatorProfile, 
  PerformanceMetrics, 
  Platform, 
  SavedHook 
} from './types/content';
import { 
  loadIdeas, 
  saveIdeas, 
  loadSavedHooks, 
  saveSavedHooks, 
  loadProfile, 
  saveProfile, 
  getTodayString 
} from './utils/storage';

export default function App() {
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [savedHooks, setSavedHooks] = useState<SavedHook[]>([]);
  const [profile, setProfile] = useState<CreatorProfile>(loadProfile());
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Modals state
  const [isIdeaModalOpen, setIsIdeaModalOpen] = useState<boolean>(false);
  const [ideaModalPrefill, setIdeaModalPrefill] = useState<Partial<ContentIdea> | null>(null);
  const [selectedTeleprompterIdea, setSelectedTeleprompterIdea] = useState<ContentIdea | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Initialize data on mount
  useEffect(() => {
    const loadedIdeas = loadIdeas();
    const loadedHooks = loadSavedHooks();
    const loadedProfile = loadProfile();

    setIdeas(loadedIdeas);
    setSavedHooks(loadedHooks);
    setProfile(loadedProfile);

    // Initial theme check
    const savedTheme = (loadedProfile.theme === 'light' ? 'light' : 'dark') as 'dark' | 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Update streak if active today
    const today = getTodayString();
    if (loadedProfile.lastActiveDate !== today) {
      // Check if last active was yesterday (continuous streak) or older
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

      let newStreak = loadedProfile.streak;
      if (loadedProfile.lastActiveDate === yesterdayStr) {
        newStreak += 1;
      }
      const updatedProfile = {
        ...loadedProfile,
        streak: newStreak,
        lastActiveDate: today
      };
      setProfile(updatedProfile);
      saveProfile(updatedProfile);
    }
  }, []);

  // Theme toggle
  const handleToggleTheme = () => {
    const nextTheme: 'dark' | 'light' = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const updatedProfile: CreatorProfile = { ...profile, theme: nextTheme };
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
  };

  // Idea handlers
  const handleSaveIdea = (newOrUpdatedIdea: ContentIdea) => {
    let updatedIdeas: ContentIdea[];
    const exists = ideas.some(i => i.id === newOrUpdatedIdea.id);
    if (exists) {
      updatedIdeas = ideas.map(i => i.id === newOrUpdatedIdea.id ? newOrUpdatedIdea : i);
    } else {
      updatedIdeas = [newOrUpdatedIdea, ...ideas];
    }
    setIdeas(updatedIdeas);
    saveIdeas(updatedIdeas);
  };

  const handleDeleteIdea = (id: string) => {
    const updated = ideas.filter(i => i.id !== id);
    setIdeas(updated);
    saveIdeas(updated);
  };

  const handleUpdateStatus = (id: string, newStatus: ContentStatus) => {
    const updated = ideas.map(i => {
      if (i.id === id) {
        return {
          ...i,
          status: newStatus,
          publishedDate: newStatus === 'published' ? (i.publishedDate || getTodayString()) : i.publishedDate,
          updatedAt: new Date().toISOString()
        };
      }
      return i;
    });
    setIdeas(updated);
    saveIdeas(updated);
  };

  const handleMarkAsPublished = (idea: ContentIdea) => {
    handleUpdateStatus(idea.id, 'published');
  };

  const handleQuickSaveIdea = (title: string, platform: Platform) => {
    const newIdea: ContentIdea = {
      id: `idea-${Date.now()}`,
      title,
      niche: (profile.niche as any) || 'Tech & AI',
      platform,
      format: 'Reels / Shorts',
      status: 'draft',
      priority: 'medium',
      rating: 4,
      hook: '',
      script: '',
      callToAction: '',
      scheduledDate: '',
      scheduledTime: '',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [newIdea, ...ideas];
    setIdeas(updated);
    saveIdeas(updated);
  };

  // Hook handlers
  const handleSaveHook = (hook: SavedHook) => {
    const updated = [hook, ...savedHooks];
    setSavedHooks(updated);
    saveSavedHooks(updated);
  };

  const handleDeleteHook = (id: string) => {
    const updated = savedHooks.filter(h => h.id !== id);
    setSavedHooks(updated);
    saveSavedHooks(updated);
  };

  const handleCreateIdeaFromHook = (hookText: string, formulaTitle: string) => {
    setIdeaModalPrefill({
      hook: hookText,
      hookFormula: formulaTitle,
      title: hookText.slice(0, 60) + (hookText.length > 60 ? '...' : '')
    });
    setIsIdeaModalOpen(true);
  };

  // Metrics update
  const handleUpdateMetrics = (ideaId: string, metrics: PerformanceMetrics) => {
    const updated = ideas.map(i => {
      if (i.id === ideaId) {
        return {
          ...i,
          metrics,
          updatedAt: new Date().toISOString()
        };
      }
      return i;
    });
    setIdeas(updated);
    saveIdeas(updated);
  };

  // Profile save
  const handleSaveProfile = (newProfile: CreatorProfile) => {
    setProfile(newProfile);
    saveProfile(newProfile);
  };

  // Data reload after import/reset
  const handleReloadData = () => {
    setIdeas(loadIdeas());
    setSavedHooks(loadSavedHooks());
    setProfile(loadProfile());
  };

  const openNewIdeaModal = (prefill?: Partial<ContentIdea>) => {
    setIdeaModalPrefill(prefill || null);
    setIsIdeaModalOpen(true);
  };

  const openEditIdeaModal = (idea: ContentIdea) => {
    setIdeaModalPrefill(idea);
    setIsIdeaModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center">
      {/* Outer Shell: Either Responsive Full Width or Simulated Android Device Frame */}
      <div 
        className={`w-full transition-all duration-300 ${
          isPhoneFrame 
            ? 'max-w-[440px] my-4 md:my-8 rounded-[44px] shadow-2xl border-[10px] border-slate-800 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden min-h-[840px] flex flex-col relative' 
            : 'max-w-5xl'
        }`}
      >
        {/* Android Virtual Status Bar in Phone Frame mode */}
        {isPhoneFrame && (
          <div className="h-6 bg-slate-900 text-slate-400 px-6 flex items-center justify-between text-[11px] font-mono select-none">
            <span>09:41</span>
            <div className="w-16 h-3.5 bg-black rounded-full mx-auto" />
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* Top Android Header */}
        <AndroidHeader
          profile={profile}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          onToggleTheme={handleToggleTheme}
          theme={theme}
          isPhoneFrame={isPhoneFrame}
          onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          activeTab={activeTab}
        />

        {/* Main Viewport Content */}
        <main className="flex-1 px-3 sm:px-5 py-4 w-full">
          {activeTab === 'dashboard' && (
            <Dashboard
              profile={profile}
              ideas={ideas}
              onOpenNewIdea={openNewIdeaModal}
              onEditIdea={openEditIdeaModal}
              onOpenTeleprompter={(idea) => setSelectedTeleprompterIdea(idea)}
              onMarkAsPublished={handleMarkAsPublished}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onQuickSaveIdea={handleQuickSaveIdea}
            />
          )}

          {activeTab === 'vault' && (
            <IdeaVault
              ideas={ideas}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onOpenNewIdea={openNewIdeaModal}
              onEditIdea={openEditIdeaModal}
              onDeleteIdea={handleDeleteIdea}
              onOpenTeleprompter={(idea) => setSelectedTeleprompterIdea(idea)}
              onUpdateStatus={handleUpdateStatus}
            />
          )}

          {activeTab === 'hook' && (
            <HookStudio
              savedHooks={savedHooks}
              onSaveHook={handleSaveHook}
              onDeleteHook={handleDeleteHook}
              onCreateIdeaFromHook={handleCreateIdeaFromHook}
            />
          )}

          {activeTab === 'calendar' && (
            <ContentCalendar
              ideas={ideas}
              onOpenNewIdea={openNewIdeaModal}
              onEditIdea={openEditIdeaModal}
              onOpenTeleprompter={(idea) => setSelectedTeleprompterIdea(idea)}
              onMarkAsPublished={handleMarkAsPublished}
            />
          )}

          {activeTab === 'progress' && (
            <ProgressTracker
              profile={profile}
              ideas={ideas}
              onUpdateMetrics={handleUpdateMetrics}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          )}
        </main>

        {/* Android Bottom Navigation */}
        <AndroidBottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenNewIdeaModal={() => openNewIdeaModal()}
        />

        {/* Virtual Android Home Bar Indicator in Phone Frame mode */}
        {isPhoneFrame && (
          <div className="h-5 bg-white dark:bg-slate-900 flex items-center justify-center select-none pb-1">
            <div className="w-32 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
          </div>
        )}
      </div>

      {/* Global Modals */}
      <IdeaModal
        isOpen={isIdeaModalOpen}
        onClose={() => setIsIdeaModalOpen(false)}
        onSave={handleSaveIdea}
        initialData={ideaModalPrefill}
      />

      <TeleprompterModal
        idea={selectedTeleprompterIdea}
        onClose={() => setSelectedTeleprompterIdea(null)}
        onMarkPublished={handleMarkAsPublished}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
        onDataReload={handleReloadData}
      />
    </div>
  );
}

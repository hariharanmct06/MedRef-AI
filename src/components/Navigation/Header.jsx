import React from 'react';
import { Search, Mic, Sun, Moon, Bell } from 'lucide-react';
import Logo from './Logo';

export default function Header({
  currentView,
  setCurrentView,
  themeMode,
  setThemeMode,
  onOpenCommandMenu,
  onOpenVoiceModal
}) {
  const getPageTitle = () => {
    switch (currentView) {
      case 'home':
        return 'Medical Knowledge Workspace';
      case 'ai-search':
        return 'AI Medical Search & Workspace';
      case 'diseases':
        return 'Disease Reference Library';
      case 'drugs':
        return 'Pharmacology & Drug Reference';
      case 'calculators':
        return 'Clinical Calculators Workspace';
      case 'vision':
        return 'AI Vision Diagnostic Assistant';
      case 'knowledge-graph':
        return 'Medical Knowledge Graph';
      case 'learn':
        return 'Learning & Exam Revision';
      case 'library':
        return 'Saved Knowledge & Library';
      case 'profile':
        return 'User Profile & Statistics';
      case 'settings':
        return 'System & AI Preferences';
      default:
        return 'MedRef AI';
    }
  };

  return (
    <header className="bg-slate-950/60 backdrop-blur-md border-b border-slate-800/60 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-20">
      {/* Mobile Title / Brand Header */}
      <div className="flex items-center gap-3">
        <div className="md:hidden flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
          <Logo size="small" showText={true} />
        </div>

        <div className="hidden md:block">
          <h2 className="text-base font-semibold text-slate-100 tracking-tight">
            {getPageTitle()}
          </h2>
          <p className="text-xs text-slate-400">
            Smarter Reference. Better Care. • Harrison’s & UpToDate Compliant
          </p>
        </div>
      </div>

      {/* Global Action Tools */}
      <div className="flex items-center gap-2.5">
        {/* Search trigger button */}
        <button
          onClick={onOpenCommandMenu}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 transition-all hover:shadow-[0_0_12px_rgba(6,182,212,0.15)] group"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span>Quick Search...</span>
          <kbd className="ml-2 px-1.5 py-0.5 bg-slate-800 text-[10px] text-slate-400 rounded font-mono border border-slate-700">
            ⌘K
          </kbd>
        </button>

        {/* Voice Input Action */}
        <button
          onClick={onOpenVoiceModal}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all group relative"
          title="Voice Search"
        >
          <Mic className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all"
          title="Toggle Theme"
        >
          {themeMode === 'dark' ? (
            <Sun className="w-4 h-4 text-slate-300 hover:text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-300 hover:text-cyan-400" />
          )}
        </button>

        {/* User Mini Profile Avatar */}
        <div
          onClick={() => setCurrentView('profile')}
          className="flex items-center gap-2.5 pl-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1.5px] group-hover:shadow-[0_0_12px_rgba(6,182,212,0.5)] transition-all">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-xs font-bold text-cyan-300">
              DR
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

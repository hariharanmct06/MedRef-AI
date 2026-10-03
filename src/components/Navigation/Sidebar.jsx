import React from 'react';
import {
  Home,
  Search,
  BookOpen,
  Pill,
  Activity,
  Calculator,
  Eye,
  GitFork,
  Bookmark,
  User,
  Settings,
  Command,
  Sun,
  Moon,
  ShieldCheck
} from 'lucide-react';
import Logo from './Logo';

export default function Sidebar({
  currentView,
  setCurrentView,
  themeMode,
  setThemeMode,
  onOpenCommandMenu
}) {
  const mainNav = [
    { id: 'home', label: 'Home', icon: Home, badge: null },
    { id: 'ai-search', label: 'AI Search', icon: Search, badge: 'AI' },
    { id: 'diseases', label: 'Diseases', icon: Activity, badge: null },
    { id: 'drugs', label: 'Drug Reference', icon: Pill, badge: null },
    { id: 'calculators', label: 'Calculators', icon: Calculator, badge: null },
    { id: 'vision', label: 'AI Vision', icon: Eye, badge: 'Vision' },
    { id: 'knowledge-graph', label: 'Knowledge Graph', icon: GitFork, badge: 'Graph' },
    { id: 'learn', label: 'Learn & Revision', icon: BookOpen, badge: 'Pro' },
    { id: 'library', label: 'Saved Library', icon: Bookmark, badge: null },
  ];

  const bottomNav = [
    { id: 'profile', label: 'Profile & Stats', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-950/80 backdrop-blur-xl border-r border-slate-800/60 flex flex-col justify-between hidden md:flex h-screen sticky top-0 z-30 select-none">
      {/* Brand Header with Official MedRef AI Logo */}
      <div>
        <div className="px-5 py-4 border-b border-slate-800/50 flex items-center justify-between">
          <div
            onClick={() => setCurrentView('home')}
            className="cursor-pointer group"
          >
            <Logo size="normal" showText={true} />
          </div>
        </div>

        {/* Quick Command Palette Trigger */}
        <div className="px-4 pt-4 pb-2">
          <button
            onClick={onOpenCommandMenu}
            className="w-full flex items-center justify-between px-3 py-2 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-lg text-xs text-slate-400 hover:text-slate-200 transition-all group"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              Search or jump to...
            </span>
            <kbd className="px-1.5 py-0.5 bg-slate-800 text-[10px] text-slate-400 rounded border border-slate-700 font-mono flex items-center gap-0.5">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 py-2 space-y-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-950/80 to-slate-900 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="px-3 py-4 border-t border-slate-800/60 space-y-2">
        {bottomNav.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-slate-900 text-cyan-300 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Dark / Light Mode Toggle */}
        <div className="pt-2 flex items-center justify-between px-3">
          <span className="text-xs text-slate-400 font-medium">Appearance</span>
          <button
            onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-all flex items-center gap-1 text-xs"
            title="Toggle Light/Dark Theme"
          >
            {themeMode === 'dark' ? (
              <>
                <Moon className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px]">Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px]">Light</span>
              </>
            )}
          </button>
        </div>

        {/* Safety Badge */}
        <div className="mt-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <div className="text-[10px] text-slate-400 leading-tight">
            <span className="text-slate-200 font-medium">Medical Reference Only</span>
            <p>Smarter Reference. Better Care.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

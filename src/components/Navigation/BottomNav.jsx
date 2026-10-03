import React from 'react';
import { Home, Search, BookOpen, Bookmark, User } from 'lucide-react';
import MedRefOrb from '../Common/MedRefOrb';

export default function BottomNav({ currentView, setCurrentView }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/80 px-4 py-2 flex items-center justify-around">
      <button
        onClick={() => setCurrentView('home')}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
          currentView === 'home' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </button>

      <button
        onClick={() => setCurrentView('learn')}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
          currentView === 'learn' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <BookOpen className="w-5 h-5" />
        <span>Learn</span>
      </button>

      {/* Central Floating Signature AI Search Action Button */}
      <button
        onClick={() => setCurrentView('ai-search')}
        className="relative -top-4 p-1.5 rounded-full bg-slate-950 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95 transition-all"
        title="Ask MedRef AI"
      >
        <MedRefOrb size="md" state={currentView === 'ai-search' ? 'processing' : 'idle'} />
      </button>

      <button
        onClick={() => setCurrentView('library')}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
          currentView === 'library' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Bookmark className="w-5 h-5" />
        <span>Library</span>
      </button>

      <button
        onClick={() => setCurrentView('profile')}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
          currentView === 'profile' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <User className="w-5 h-5" />
        <span>Profile</span>
      </button>
    </div>
  );
}

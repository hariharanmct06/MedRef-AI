import React, { useState } from 'react';
import { Search, Bell, User, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import Logo from './Logo';

export default function Header({ currentView, setCurrentView, demoMode, setDemoMode, onOpenSearch }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="w-full bg-navy-950/80 border-b border-slate-800/80 backdrop-blur-md px-4 py-3 sticky top-0 z-20 flex items-center justify-between">
      {/* Left side: Mobile logo or View title */}
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <Logo size="small" showText={false} />
        </div>
        <div className="hidden md:block">
          <h1 className="text-sm font-semibold text-slate-200 capitalize flex items-center gap-2">
            <span>{currentView === 'ask-ai' ? 'Ask My Medical Records' : currentView.replace('-', ' ')}</span>
          </h1>
        </div>
      </div>

      {/* Center: Demo Data Banner Pill */}
      {demoMode && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-medium animate-pulse">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>DEMO DATA — NOT REAL PATIENT INFORMATION</span>
        </div>
      )}

      {/* Right side: Quick Search, Notifications, Profile */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Search records...</span>
        </button>

        {/* Notifications dropdown trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-navy-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="text-xs font-semibold text-slate-200">Notifications</span>
                <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">2 New</span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 flex items-start gap-2.5">
                  <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <p className="font-medium text-slate-200">Comparison Complete</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Jan 12 vs Sep 28 blood reports analyzed successfully.</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 flex items-start gap-2.5">
                  <span className="p-1 rounded-md bg-blue-500/10 text-cyan-400 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <p className="font-medium text-slate-200">Medication Reminder</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">Metformin 500mg daily dosage active.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <button
          onClick={() => setCurrentView('settings')}
          className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
        >
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 text-white text-xs font-bold flex items-center justify-center">
            A
          </div>
          <span className="text-xs font-medium text-slate-200 hidden sm:inline">Alex Vance</span>
        </button>
      </div>
    </header>
  );
}

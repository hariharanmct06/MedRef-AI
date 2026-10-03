import React, { useState } from 'react';
import { Settings, Moon, Sun, Volume2, ShieldCheck, Sliders, RefreshCw, Database } from 'lucide-react';

export default function SettingsView({ themeMode, setThemeMode, onResetAllData }) {
  const [defaultLevel, setDefaultLevel] = useState('clinical');
  const [voiceSpeed, setVoiceSpeed] = useState('1.0x');
  const [aiTemperature, setAiTemperature] = useState(0.2);

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto animate-in fade-in duration-300">
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-extrabold text-slate-100">System & AI Preferences</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Configure appearance, default cognitive depth, and AI synthesis parameters.</p>
        </div>
      </div>

      {/* Appearance */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Interface Theme</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setThemeMode('dark')}
            className={`flex-1 p-4 rounded-xl border flex items-center justify-between transition-all ${
              themeMode === 'dark' ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold">Deep Clinical Dark</span>
            </div>
            <span className="text-[10px] font-mono">Default</span>
          </button>

          <button
            onClick={() => setThemeMode('light')}
            className={`flex-1 p-4 rounded-xl border flex items-center justify-between transition-all ${
              themeMode === 'light' ? 'bg-amber-950/40 border-amber-500/60 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold">Refined Light Theme</span>
            </div>
          </button>
        </div>
      </div>

      {/* AI Cognitive Depth Default */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Default Explanation Depth</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {['beginner', 'student', 'clinical', 'exam', 'deep'].map(lvl => (
            <button
              key={lvl}
              onClick={() => setDefaultLevel(lvl)}
              className={`p-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                defaultLevel === lvl ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Data */}
      <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-bold text-red-400 uppercase tracking-wider">Reset Application State</h2>
          <p className="text-xs text-red-200 mt-0.5">Clears search history, reset saved library, and restore defaults.</p>
        </div>
        <button
          onClick={onResetAllData}
          className="px-4 py-2 rounded-xl bg-red-900/80 hover:bg-red-800 text-red-200 border border-red-500/40 text-xs font-bold transition-all"
        >
          Reset All Data
        </button>
      </div>
    </div>
  );
}

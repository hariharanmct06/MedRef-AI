import React, { useState } from 'react';
import { User, Award, BookOpen, Flame, Shield, Settings, Sliders, CheckCircle2, ChevronRight, Moon, Sun, Download } from 'lucide-react';

export default function ProfileView({ themeMode, setThemeMode, setCurrentView }) {
  const [role, setRole] = useState("3rd Year Medical Student");
  const [institution, setInstitution] = useState("Harvard Medical School");

  const roles = [
    "Medical Student",
    "3rd Year Medical Student",
    "Resident Physician",
    "Attending Physician",
    "Clinical Researcher",
    "Healthcare Educator"
  ];

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-blue-600 p-[2px] shadow-[0_0_25px_rgba(6,182,212,0.4)]">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-xl sm:text-2xl font-black text-cyan-300">
                DR
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-100">Dr. Alex Morgan</h1>
              <p className="text-xs sm:text-sm text-cyan-400 font-semibold">{role} • {institution}</p>
              <span className="inline-block mt-1 text-[10px] text-emerald-400 font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                MedRef AI Pro Subscriber • Active Session
              </span>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('settings')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Settings className="w-4 h-4 text-cyan-400" />
            <span>Preferences & Settings</span>
          </button>
        </div>

        {/* Study Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Study Streak</span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-slate-100">14 Days</div>
            <p className="text-[10px] text-emerald-400">Consistent daily study</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Topics Mastered</span>
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-slate-100">42 Topics</div>
            <p className="text-[10px] text-slate-400">Cardiology &amp; Pharma</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Questions Solved</span>
              <Award className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-slate-100">186 Qs</div>
            <p className="text-[10px] text-slate-400">89% accuracy rate</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Flashcards Reviewed</span>
              <BookOpen className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-slate-100">320 Cards</div>
            <p className="text-[10px] text-slate-400">Active recall cycle</p>
          </div>
        </div>
      </div>

      {/* Role & Institution Customizer */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
          Clinical Persona & Context
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Healthcare Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            >
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Institution / Hospital</label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

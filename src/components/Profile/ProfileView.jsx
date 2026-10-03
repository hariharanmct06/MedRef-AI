import React, { useState } from 'react';
import { User, Award, BookOpen, Flame, Settings, CheckCircle2, LogOut } from 'lucide-react';

export default function ProfileView({ user, themeMode, setThemeMode, setCurrentView, onSignOut }) {
  const [role, setRole] = useState(user?.role || "Healthcare Learner");
  const [institution, setInstitution] = useState("Medical Reference Center");

  const roles = [
    "Medical Student",
    "3rd Year Medical Student",
    "Resident Physician",
    "Attending Physician",
    "Clinical Researcher",
    "Healthcare Educator",
    "Healthcare Learner"
  ];

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0f172a] border border-[#1e293b] space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-sky-600 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#090d16] rounded-[14px] flex items-center justify-center text-xl font-bold text-sky-400 uppercase">
                {user?.name ? user.name.slice(0, 2) : 'DR'}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-100">{user?.name || 'Medical Practitioner'}</h1>
              <p className="text-xs sm:text-sm text-sky-400 font-semibold">{role} • {institution}</p>
              <span className="inline-block mt-1 text-[10px] text-slate-400 font-mono">
                {user?.email || 'Authenticated User'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('settings')}
              className="px-3.5 py-2 rounded-xl bg-[#1e293b] hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Settings className="w-4 h-4 text-sky-400" />
              <span>Settings</span>
            </button>

            <button
              onClick={onSignOut}
              className="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Role & Institution Customizer */}
      <div className="p-6 rounded-2xl bg-[#0f172a] border border-[#1e293b] space-y-4">
        <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
          Profile Settings & Context
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Healthcare Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
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
              className="w-full bg-[#090d16] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

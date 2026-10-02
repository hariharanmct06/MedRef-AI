import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  GitCommit, 
  ArrowLeftRight, 
  Pill, 
  Sparkles, 
  Calendar, 
  BookOpen, 
  Settings, 
  UploadCloud,
  ChevronRight,
  ShieldCheck,
  Globe
} from 'lucide-react';
import Logo from './Logo';

export default function Sidebar({ currentView, setCurrentView, demoMode, setDemoMode, documentCount }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'records', label: 'My Records', icon: FileText, badge: documentCount },
    { id: 'journey', label: 'Medical Journey', icon: GitCommit },
    { id: 'compare', label: 'Compare Reports', icon: ArrowLeftRight },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'ask-ai', label: 'Ask My Records', icon: Sparkles, highlight: true },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'reference', label: 'Medical Reference', icon: BookOpen },
    { id: 'privacy', label: 'Privacy & Security', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-navy-950/90 border-r border-slate-800/80 flex flex-col justify-between hidden md:flex h-screen sticky top-0 z-30 backdrop-blur-xl">
      {/* Top Header & Logo */}
      <div className="p-5 border-b border-slate-800/60">
        <Logo size="normal" />
        
        {/* View mode switcher badge */}
        <div className="mt-4 flex items-center justify-between p-2 rounded-xl bg-slate-900/90 border border-slate-800/80">
          <button 
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-cyan-400 transition-colors w-full justify-between"
          >
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" /> View Landing Page
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Main Workspace
        </div>
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-500/5' 
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                }`} />
                <span>{item.label}</span>
              </div>
              
              {item.badge !== undefined && (
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                  isActive ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-slate-400'
                }`}>
                  {item.badge}
                </span>
              )}

              {item.highlight && !isActive && (
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Upload CTA */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        <button
          onClick={() => setCurrentView('upload')}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Document</span>
        </button>

        {/* Demo Mode Toggle */}
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${demoMode ? 'bg-cyan-400 animate-ping' : 'bg-slate-500'}`} />
            <span className="text-slate-300 font-medium">Demo Mode</span>
          </div>
          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`px-2 py-1 rounded-md text-[10px] font-semibold tracking-wider uppercase transition-colors ${
              demoMode ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {demoMode ? 'Active' : 'Off'}
          </button>
        </div>
      </div>
    </aside>
  );
}

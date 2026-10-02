import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  GitCommit, 
  Sparkles, 
  MoreHorizontal,
  ArrowLeftRight,
  Pill,
  Calendar,
  BookOpen,
  Settings,
  ShieldCheck,
  Globe,
  UploadCloud,
  X
} from 'lucide-react';

export default function BottomNav({ currentView, setCurrentView }) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainTabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'records', label: 'Records', icon: FileText },
    { id: 'journey', label: 'Journey', icon: GitCommit },
    { id: 'ask-ai', label: 'AI', icon: Sparkles, highlight: true },
    { id: 'more', label: 'More', icon: MoreHorizontal }
  ];

  const moreItems = [
    { id: 'upload', label: 'Upload Document', icon: UploadCloud },
    { id: 'compare', label: 'Compare Reports', icon: ArrowLeftRight },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'reference', label: 'Medical Reference', icon: BookOpen },
    { id: 'privacy', label: 'Privacy & Security', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'landing', label: 'Landing Page', icon: Globe }
  ];

  const handleTabClick = (tabId) => {
    if (tabId === 'more') {
      setShowMoreMenu(!showMoreMenu);
    } else {
      setShowMoreMenu(false);
      setCurrentView(tabId);
    }
  };

  return (
    <>
      {/* More items drawer for mobile */}
      {showMoreMenu && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden flex flex-col justify-end animate-fadeIn">
          <div className="bg-navy-900 border-t border-slate-800 rounded-t-3xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <span className="text-sm font-semibold text-slate-200">More Features</span>
              <button 
                onClick={() => setShowMoreMenu(false)}
                className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 max-h-[60vh] overflow-y-auto pt-1">
              {moreItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setShowMoreMenu(false);
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-slate-200 text-xs font-medium text-left transition-colors"
                  >
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-navy-950/95 border-t border-slate-800/90 backdrop-blur-lg md:hidden px-2 py-2">
        <div className="flex items-center justify-around">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentView === tab.id || (tab.id === 'more' && showMoreMenu);
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all relative ${
                  isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-cyan-500/10' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5">{tab.label}</span>
                {tab.highlight && !isActive && (
                  <span className="absolute top-1 right-3 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

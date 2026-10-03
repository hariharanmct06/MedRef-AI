import React, { useState, useEffect } from 'react';
import { Search, X, Command, Activity, Pill, Calculator, Eye, GitFork, BookOpen, Bookmark, User, Settings } from 'lucide-react';
import { COMPREHENSIVE_DISEASES, COMPREHENSIVE_DRUGS, CALCULATORS_DATA } from '../../data/medrefData';

export default function CommandMenuModal({ isOpen, onClose, onNavigate, onSelectQuery }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or trigger
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const views = [
    { id: 'home', title: 'Home', icon: Activity, category: 'Navigation' },
    { id: 'ai-search', title: 'AI Search', icon: Search, category: 'Navigation' },
    { id: 'diseases', title: 'Disease Reference', icon: Activity, category: 'Navigation' },
    { id: 'drugs', title: 'Drug Reference', icon: Pill, category: 'Navigation' },
    { id: 'calculators', title: 'Medical Calculators', icon: Calculator, category: 'Navigation' },
    { id: 'vision', title: 'AI Vision Assistant', icon: Eye, category: 'Navigation' },
    { id: 'knowledge-graph', title: 'Knowledge Graph', icon: GitFork, category: 'Navigation' },
    { id: 'learn', title: 'Learn & Revision', icon: BookOpen, category: 'Navigation' },
    { id: 'library', title: 'Saved Library', icon: Bookmark, category: 'Navigation' },
    { id: 'profile', title: 'Profile & Stats', icon: User, category: 'Navigation' },
    { id: 'settings', title: 'Settings', icon: Settings, category: 'Navigation' }
  ];

  const filteredDiseases = COMPREHENSIVE_DISEASES.filter(d => d.title.toLowerCase().includes(query.toLowerCase()));
  const filteredDrugs = COMPREHENSIVE_DRUGS.filter(dr => dr.name.toLowerCase().includes(query.toLowerCase()));
  const filteredCalculators = CALCULATORS_DATA.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
  const filteredViews = views.filter(v => v.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden space-y-0">
        {/* Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search diseases, drugs, calculators..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 bg-slate-800 text-[10px] text-slate-400 rounded border border-slate-700 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-4">
          {/* Navigation Views */}
          {filteredViews.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Workspace Views
              </div>
              {filteredViews.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.id}
                    onClick={() => {
                      onNavigate(v.id);
                      onClose();
                    }}
                    className="px-3 py-2 rounded-xl hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs text-slate-200"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <span>{v.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Jump to</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Diseases */}
          {filteredDiseases.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400">
                Diseases
              </div>
              {filteredDiseases.map((d) => (
                <div
                  key={d.id}
                  onClick={() => {
                    onSelectQuery(d.title);
                    onClose();
                  }}
                  className="px-3 py-2 rounded-xl hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs text-slate-200"
                >
                  <span className="font-semibold text-slate-100">{d.title}</span>
                  <span className="text-[10px] text-slate-400">{d.category}</span>
                </div>
              ))}
            </div>
          )}

          {/* Drugs */}
          {filteredDrugs.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-400">
                Pharmacology & Drugs
              </div>
              {filteredDrugs.map((dr) => (
                <div
                  key={dr.id}
                  onClick={() => {
                    onSelectQuery(dr.name);
                    onClose();
                  }}
                  className="px-3 py-2 rounded-xl hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs text-slate-200"
                >
                  <span className="font-semibold text-slate-100">{dr.name}</span>
                  <span className="text-[10px] text-slate-400">{dr.drugClass}</span>
                </div>
              ))}
            </div>
          )}

          {/* Calculators */}
          {filteredCalculators.length > 0 && (
            <div className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                Calculators
              </div>
              {filteredCalculators.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    onNavigate('calculators');
                    onClose();
                  }}
                  className="px-3 py-2 rounded-xl hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs text-slate-200"
                >
                  <span className="font-semibold text-slate-100">{c.name}</span>
                  <span className="text-[10px] text-slate-400">{c.category}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

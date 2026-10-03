import React, { useState } from 'react';
import {
  Search,
  Mic,
  Camera,
  ArrowRight,
  BookOpen,
  Activity,
  Pill,
  Calculator,
  Eye,
  Bookmark,
  Clock,
  Info
} from 'lucide-react';
import Logo from '../Navigation/Logo';

export default function HomeView({
  user,
  setCurrentView,
  onOpenSearchWithQuery,
  onOpenVoiceModal,
  onOpenVisionWithUpload,
  savedItemsCount = 0,
  recentSearches = []
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenSearchWithQuery(searchQuery.trim());
    } else {
      setCurrentView('ai-search');
    }
  };

  const explorePills = [
    { id: 'diseases', label: 'Diseases', icon: Activity, color: 'text-sky-400 bg-[#0f172a] border border-[#1e293b] hover:border-sky-500/40' },
    { id: 'drugs', label: 'Drugs', icon: Pill, color: 'text-teal-400 bg-[#0f172a] border border-[#1e293b] hover:border-teal-500/40' },
    { id: 'calculators', label: 'Calculators', icon: Calculator, color: 'text-indigo-400 bg-[#0f172a] border border-[#1e293b] hover:border-indigo-500/40' },
    { id: 'learn', label: 'Learning', icon: BookOpen, color: 'text-emerald-400 bg-[#0f172a] border border-[#1e293b] hover:border-emerald-500/40' }
  ];

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Hero Section */}
      <div className="text-center pt-6 pb-2 space-y-6 flex flex-col items-center">
        {/* Brand Logo Header */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#0f172a] border border-[#1e293b]">
          <Logo size="normal" showText={true} />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100 font-sans">
          What would you like to <span className="text-sky-400">learn</span>?
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto font-normal">
          Ask MedRef AI a medical question or search structured clinical reference modules.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl mx-auto relative group">
          <div className="relative flex items-center bg-[#0f172a] border border-slate-700/80 focus-within:border-sky-500 rounded-2xl p-2 shadow-xl transition-all">
            <Search className="w-5 h-5 text-slate-400 ml-3 mr-2" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask MedRef AI about a medical topic..."
              className="w-full bg-transparent px-2 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            />

            {/* Actions */}
            <div className="flex items-center gap-1 pr-1">
              <button
                type="button"
                onClick={onOpenVoiceModal}
                className="p-2 rounded-xl text-slate-400 hover:text-sky-400 hover:bg-[#1e293b] transition-all"
                title="Voice Search"
              >
                <Mic className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenVisionWithUpload}
                className="p-2 rounded-xl text-slate-400 hover:text-sky-400 hover:bg-[#1e293b] transition-all"
                title="Camera / Image Upload"
              >
                <Camera className="w-4 h-4" />
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Explore Pills */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Explore</span>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
            {explorePills.map((pill) => {
              const Icon = pill.icon;
              return (
                <button
                  key={pill.id}
                  onClick={() => setCurrentView(pill.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${pill.color}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Onboarding Guidance & Library Status (Section 11) */}
      <div className="p-6 rounded-2xl bg-[#0f172a] border border-[#1e293b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-200">Your Medical Library</h3>
            <p className="text-xs text-slate-400">
              {savedItemsCount > 0
                ? `You have ${savedItemsCount} saved medical reference${savedItemsCount > 1 ? 's' : ''} in your library.`
                : "Your medical library will appear here as you save references."}
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentView('library')}
          className="px-4 py-2 rounded-xl bg-[#1e293b] hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-all whitespace-nowrap"
        >
          {savedItemsCount > 0 ? "Open Saved Library" : "View Personal Library"}
        </button>
      </div>

      {/* Recent Searches Section (Starts Empty per Section 14) */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Recent Searches
        </h2>

        {recentSearches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recentSearches.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onOpenSearchWithQuery(item)}
                className="p-3.5 rounded-xl bg-[#0f172a] border border-[#1e293b] hover:border-slate-700 cursor-pointer flex items-center justify-between text-xs text-slate-200 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium">{item}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-[#0f172a]/60 border border-[#1e293b] text-center text-xs text-slate-400 font-medium">
            Your recent searches will appear here as you explore.
          </div>
        )}
      </div>
    </div>
  );
}

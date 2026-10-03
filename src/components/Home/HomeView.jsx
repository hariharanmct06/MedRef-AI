import React, { useState } from 'react';
import {
  Search,
  Mic,
  Camera,
  ArrowRight,
  Sparkles,
  BookOpen,
  Activity,
  Pill,
  Calculator,
  Eye,
  GitFork,
  Bookmark,
  Clock,
  TrendingUp,
  Award,
  ChevronRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import MedRefOrb from '../Common/MedRefOrb';
import Logo from '../Navigation/Logo';
import { RECENT_TOPICS } from '../../data/medrefData';

export default function HomeView({
  setCurrentView,
  onOpenSearchWithQuery,
  onOpenVoiceModal,
  onOpenVisionWithUpload,
  savedItemsCount = 4
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

  const quickActions = [
    { id: 'ai-search', label: 'AI Search', icon: Sparkles, color: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30' },
    { id: 'drugs', label: 'Drug Reference', icon: Pill, color: 'text-teal-400 bg-teal-950/60 border-teal-500/30' },
    { id: 'diseases', label: 'Diseases', icon: Activity, color: 'text-blue-400 bg-blue-950/60 border-blue-500/30' },
    { id: 'calculators', label: 'Calculators', icon: Calculator, color: 'text-indigo-400 bg-indigo-950/60 border-indigo-500/30' },
    { id: 'vision', label: 'AI Vision', icon: Eye, color: 'text-sky-400 bg-sky-950/60 border-sky-500/30' },
    { id: 'knowledge-graph', label: 'Knowledge Graph', icon: GitFork, color: 'text-purple-400 bg-purple-950/60 border-purple-500/30' },
    { id: 'learn', label: 'Learn', icon: BookOpen, color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30' },
    { id: 'library', label: 'Saved Library', icon: Bookmark, color: 'text-amber-400 bg-amber-950/60 border-amber-500/30' }
  ];

  return (
    <div className="space-y-10 pb-16 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center pt-6 pb-2 space-y-6 flex flex-col items-center">
        {/* Official MedRef AI Brand Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <Logo size="normal" showText={true} />
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 font-sans">
          What do you want to <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">know</span>?
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-normal">
          Medical Knowledge. Reimagined. Instant evidence-based clinical intelligence for medical practice & study.
        </p>

        {/* Large Intelligent AI Search Bar */}
        <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl mx-auto relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-teal-500/20 to-blue-600/30 blur-lg opacity-75 group-hover:opacity-100 transition duration-500" />

          <div className="relative flex items-center bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 group-hover:border-cyan-500/50 rounded-2xl p-2 sm:p-2.5 shadow-2xl transition-all">
            {/* Integrated MedRef Orb */}
            <div className="pl-2 pr-1 cursor-pointer" onClick={() => setCurrentView('ai-search')}>
              <MedRefOrb size="md" state={searchQuery ? 'processing' : 'idle'} interactive />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search a disease, drug, symptom, concept, or ask a medical question..."
              className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none"
            />

            {/* Input Action Controls */}
            <div className="flex items-center gap-1.5 pr-1">
              <button
                type="button"
                onClick={onOpenVoiceModal}
                className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all"
                title="Voice Input"
              >
                <Mic className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenVisionWithUpload}
                className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all"
                title="Analyze Medical Image / Camera"
              >
                <Camera className="w-4 h-4" />
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
              >
                <span>Ask AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Quick Intelligence Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 max-w-3xl mx-auto">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => setCurrentView(action.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all hover:scale-105 active:scale-95 ${action.color}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue Where You Left Off */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-bold text-slate-200 tracking-tight">
              Continue where you left off
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('library')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RECENT_TOPICS.map((topic) => (
            <div
              key={topic.id}
              onClick={() => onOpenSearchWithQuery(topic.title)}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
                  {topic.category}
                </span>
                <span className="text-[11px] text-slate-500">{topic.time}</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                  Tap to view instant structured summary & guidelines.
                </p>
              </div>
              <div className="pt-1 flex items-center justify-between text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
                <span className="text-[11px]">Resume Reading</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Your Learning Progress Visualization */}
      <section className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-cyan-950/30 border border-slate-800/80 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h2 className="text-base font-bold text-slate-100">Your Learning & Retention</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Active study stats and personalized knowledge progress.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('learn')}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Launch Rapid Revision</span>
          </button>
        </div>

        {/* Progress Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Study Streak</span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-slate-100">14 Days</div>
            <p className="text-[10px] text-emerald-400">+3 days vs last week</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Cardiology Module</span>
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl font-bold text-cyan-400">68% Mastered</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-cyan-400 h-full rounded-full" style={{ width: '68%' }} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Flashcards Reviewed</span>
              <Award className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl font-bold text-slate-100">128 Cards</div>
            <p className="text-[10px] text-slate-400">92% retention score</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Saved References</span>
              <Bookmark className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-slate-100">{savedItemsCount} Saved</div>
            <p className="text-[10px] text-slate-400">Organized in 3 collections</p>
          </div>
        </div>
      </section>
    </div>
  );
}

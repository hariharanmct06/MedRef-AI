import React, { useState } from 'react';
import { Activity, Search, Bookmark, Share2, ChevronUp, ChevronDown, CheckCircle2, AlertTriangle, ExternalLink, ArrowRight } from 'lucide-react';
import { COMPREHENSIVE_DISEASES } from '../../data/medrefData';

export default function DiseaseReferenceView({ onOpenSearchWithQuery }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeDisease, setActiveDisease] = useState(COMPREHENSIVE_DISEASES[0]);
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    etiology: true,
    pathophysiology: true,
    clinicalFeatures: true,
    diagnosis: true,
    management: true,
    complications: true,
    prognosis: true,
    references: true
  });

  const categories = ['All', 'Cardiovascular', 'Endocrine & Metabolic', 'Respiratory', 'Emergency Medicine & Endocrine', 'Cardiovascular & Pulmonology'];

  const filteredDiseases = COMPREHENSIVE_DISEASES.filter(d => {
    const matchesCat = selectedCategory === 'All' || d.category.includes(selectedCategory);
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleSection = (sec) => {
    setExpandedSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              Disease Reference Library
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Structured clinical pathology monographs detailing etiology, diagnostic criteria, and evidence-based management.
          </p>
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search disease, category, or ICD..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: List */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Disease Monographs ({filteredDiseases.length})
          </h2>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredDiseases.map((dis) => {
              const isSelected = activeDisease.id === dis.id;
              return (
                <div
                  key={dis.id}
                  onClick={() => setActiveDisease(dis)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 px-2 py-0.5 rounded bg-blue-950 border border-blue-500/30">
                      {dis.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">ICD: {dis.icd10}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 mt-2">{dis.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{dis.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Structured Collapsible Monograph View */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold text-blue-400">{activeDisease.category}</span>
                <h2 className="text-2xl font-extrabold text-slate-100">{activeDisease.title}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{activeDisease.subtitle}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenSearchWithQuery(activeDisease.title)}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
                >
                  <span>Ask AI Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-3">
              {/* Overview */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                <button
                  onClick={() => toggleSection('overview')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-xs text-slate-200 uppercase tracking-wider bg-slate-900/60"
                >
                  <span>Overview</span>
                  {expandedSections.overview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {expandedSections.overview && (
                  <div className="p-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800">
                    {activeDisease.overview.clinical}
                  </div>
                )}
              </div>

              {/* Pathophysiology */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                <button
                  onClick={() => toggleSection('pathophysiology')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-xs text-slate-200 uppercase tracking-wider bg-slate-900/60"
                >
                  <span>Pathophysiology</span>
                  {expandedSections.pathophysiology ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {expandedSections.pathophysiology && (
                  <div className="p-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800">
                    {activeDisease.pathophysiology}
                  </div>
                )}
              </div>

              {/* Diagnosis */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                <button
                  onClick={() => toggleSection('diagnosis')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-xs text-slate-200 uppercase tracking-wider bg-slate-900/60"
                >
                  <span>Diagnostic Criteria</span>
                  {expandedSections.diagnosis ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {expandedSections.diagnosis && (
                  <div className="p-4 space-y-2 border-t border-slate-800 text-xs text-slate-300">
                    <div className="font-bold text-cyan-400">Labs:</div>
                    <ul className="list-disc pl-4 space-y-1">
                      {activeDisease.diagnosis.labs.map((l, i) => <li key={i}>{l}</li>)}
                    </ul>
                  </div>
                )}
              </div>

              {/* Management */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                <button
                  onClick={() => toggleSection('management')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-xs text-slate-200 uppercase tracking-wider bg-slate-900/60"
                >
                  <span>Therapeutic Management</span>
                  {expandedSections.management ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {expandedSections.management && (
                  <div className="p-4 space-y-2 border-t border-slate-800 text-xs text-slate-300">
                    <div className="font-bold text-emerald-400">First-Line Protocol:</div>
                    <ul className="list-disc pl-4 space-y-1">
                      {activeDisease.management.firstLine.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                  </div>
                )}
              </div>

              {/* Prognosis */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs text-slate-300">
                <span className="font-bold text-cyan-300 block mb-1">Clinical Prognosis:</span>
                {activeDisease.prognosis}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

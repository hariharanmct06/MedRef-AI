import React, { useState } from 'react';
import { Bookmark, FolderPlus, Search, Trash2, Edit3, ArrowRight, ExternalLink, Sparkles, FileText, Download } from 'lucide-react';
import { COMPREHENSIVE_DISEASES, COMPREHENSIVE_DRUGS } from '../../data/medrefData';

export default function LibraryView({ savedItems = [], onOpenTopic, onRemoveSavedItem }) {
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [userNotes, setUserNotes] = useState({
    'myocardial-infarction': 'Key exam focus: MONA protocol, door-to-balloon PCI time under 90 minutes.',
    'lisinopril': 'Check eGFR and serum potassium within 2 weeks of starting therapy.'
  });

  const collections = ['All', 'Pharmacology', 'Cardiology', 'Emergency Medicine', 'Exam Preparation'];

  // Default display items if user hasn't saved custom ones yet
  const displayItems = savedItems.length > 0
    ? savedItems
    : [COMPREHENSIVE_DISEASES[0], COMPREHENSIVE_DRUGS[0], COMPREHENSIVE_DISEASES[3]];

  const filteredItems = displayItems.filter(item => {
    const title = item.title || item.name || '';
    const cat = item.category || item.badgeCategory || '';
    const matchesCol = selectedCollection === 'All' || cat.toLowerCase().includes(selectedCollection.toLowerCase());
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCol && matchesSearch;
  });

  const handleExportPDF = () => {
    const content = filteredItems.map(item => `Title: ${item.title || item.name}\nCategory: ${item.category || item.badgeCategory}\nSummary: ${item.overview?.clinical || item.overview}\n---`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MedRef_AI_Personal_Library_Export.txt`;
    link.click();
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              Personal Medical Library & Collections
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Organized study notes, bookmarked clinical references, and high-yield collections.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPDF}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Notes</span>
          </button>
        </div>
      </div>

      {/* Collection Pills & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {collections.map(col => (
            <button
              key={col}
              onClick={() => setSelectedCollection(col)}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCollection === col
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {col}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved items..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Saved Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const title = item.title || item.name;
            const category = item.category || item.badgeCategory || 'Reference';
            const note = userNotes[item.id] || '';

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2.5 py-0.5 rounded bg-amber-950 border border-amber-500/30">
                      {category}
                    </span>
                    <button
                      onClick={() => onRemoveSavedItem && onRemoveSavedItem(item.id)}
                      className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                      title="Remove from Library"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {item.overview?.clinical || item.overview || item.subtitle}
                    </p>
                  </div>

                  {/* Personal Note Box */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                      <span>Personal Note:</span>
                      <Edit3 className="w-3 h-3 text-cyan-400" />
                    </div>
                    <textarea
                      rows={2}
                      value={note}
                      onChange={(e) => setUserNotes({ ...userNotes, [item.id]: e.target.value })}
                      placeholder="Add custom study note..."
                      className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-600 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => onOpenTopic && onOpenTopic(title)}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Open Full Reference</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
          <Bookmark className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-200">Your medical library is waiting.</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Save topics, drug monographs, or clinical calculators to build your personal medical reference library.
          </p>
        </div>
      )}
    </div>
  );
}

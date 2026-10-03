import React, { useState } from 'react';
import { Bookmark, Search, Trash2, Edit3, ArrowRight, Download, Plus, Folder } from 'lucide-react';

export default function LibraryView({ savedItems = [], onOpenTopic, onRemoveSavedItem, setCurrentView }) {
  const [activeTab, setActiveTab] = useState('saved'); // saved | collections | history
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [userNotes, setUserNotes] = useState({});
  const [customCollections, setCustomCollections] = useState(['Pharmacology', 'Cardiology', 'Emergency Medicine']);

  const filteredItems = savedItems.filter(item => {
    const title = item.title || item.name || '';
    const cat = item.category || item.badgeCategory || '';
    const matchesCol = selectedCollection === 'All' || cat.toLowerCase().includes(selectedCollection.toLowerCase());
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCol && matchesSearch;
  });

  const handleExportPDF = () => {
    if (savedItems.length === 0) return;
    const content = savedItems.map(item => `Title: ${item.title || item.name}\nCategory: ${item.category || item.badgeCategory}\nSummary: ${item.overview?.clinical || item.overview || item.subtitle}\n---`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MedRef_AI_Saved_Library.txt`;
    link.click();
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0f172a] border border-[#1e293b] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-sky-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              Personal Medical Library
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Build your personal clinical reference database as you study and research.
          </p>
        </div>

        {savedItems.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPDF}
              className="px-3.5 py-2 rounded-xl bg-[#1e293b] hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Export Saved Library</span>
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1e293b] pb-2">
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'saved'
              ? 'bg-sky-950 text-sky-300 border border-sky-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Saved References ({savedItems.length})
        </button>
        <button
          onClick={() => setActiveTab('collections')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'collections'
              ? 'bg-sky-950 text-sky-300 border border-sky-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Collections ({customCollections.length})
        </button>
      </div>

      {/* SECTION 12 & 25: EXACT EMPTY STATE WHEN STARTING FRESH */}
      {activeTab === 'saved' && (
        savedItems.length === 0 ? (
          <div className="p-12 sm:p-16 rounded-2xl bg-[#0f172a] border border-[#1e293b] text-center space-y-4 max-w-lg mx-auto my-8">
            <div className="w-12 h-12 rounded-2xl bg-[#1e293b] border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
              <Bookmark className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-100">Nothing saved yet.</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Save medical references to build your personal library.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setCurrentView('diseases')}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Explore Medical Topics</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Populated Saved List */
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search saved items..."
                  className="w-full bg-[#090d16] border border-slate-700 focus:border-sky-500 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => {
                const title = item.title || item.name;
                const category = item.category || item.badgeCategory || 'Reference';
                const note = userNotes[item.id] || '';

                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-[#0f172a] border border-[#1e293b] hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 px-2 py-0.5 rounded bg-sky-950 border border-sky-500/30">
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
                        <h3 className="text-sm font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                          {title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {item.overview?.clinical || item.overview || item.subtitle}
                        </p>
                      </div>

                      {/* Personal Note Box */}
                      <div className="p-2.5 rounded-xl bg-[#090d16] border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                          <span>Personal Note:</span>
                          <Edit3 className="w-3 h-3 text-sky-400" />
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
                      className="w-full py-2 rounded-xl bg-[#1e293b] hover:bg-slate-800 text-sky-300 border border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>Open Full Reference</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}

      {/* COLLECTIONS TAB */}
      {activeTab === 'collections' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {customCollections.map((col) => (
              <div key={col} className="p-5 rounded-2xl bg-[#0f172a] border border-[#1e293b] space-y-2">
                <div className="flex items-center justify-between">
                  <Folder className="w-5 h-5 text-sky-400" />
                  <span className="text-[11px] text-slate-500 font-mono">0 items</span>
                </div>
                <h3 className="text-sm font-bold text-slate-100">{col}</h3>
                <p className="text-xs text-slate-400">Custom user topic collection.</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

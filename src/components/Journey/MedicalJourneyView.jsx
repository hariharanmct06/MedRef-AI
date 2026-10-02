import React, { useState } from 'react';
import { GitCommit, Search, Filter, Calendar, FileText, Pill, Eye, ChevronRight, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

export default function MedicalJourneyView({ documents, onSelectDocument }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Reports', 'Prescriptions', 'Consultations', 'Tests'];

  // Filter documents
  const filteredDocs = documents.filter(doc => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.facility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.summary && doc.summary.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }).sort((a, b) => new Date(a.date) - new Date(b.date)); // Chronological order

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-2">
          <GitCommit className="w-3.5 h-3.5" />
          <span>Chronological Health History</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">My Medical Journey</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          A seamless timeline of your medical visits, lab tests, prescriptions, and consultations over time.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search my medical records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20' 
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chronological Timeline */}
      <div className="space-y-6 relative pl-4 sm:pl-8 before:absolute before:left-3 sm:before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-navy-950 px-2 py-1 rounded w-fit border border-cyan-500/20">
          2026 Medical History
        </div>

        {filteredDocs.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs rounded-2xl bg-slate-900/40 border border-slate-800">
            No medical records matched your search filter.
          </div>
        ) : (
          filteredDocs.map((doc, idx) => (
            <div 
              key={doc.id}
              onClick={() => onSelectDocument(doc)}
              className="relative group cursor-pointer"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[21px] sm:-left-[29px] top-4 w-4 h-4 rounded-full bg-navy-950 border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 transition-transform">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>

              {/* Event Card */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all space-y-3 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      {doc.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {doc.date}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-500" /> {doc.facility}
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{doc.summary}</p>
                  </div>
                  <button className="p-2 rounded-xl bg-slate-800 text-slate-400 group-hover:text-white group-hover:bg-cyan-500/20 transition-colors flex-shrink-0 ml-3">
                    <Eye className="w-4 h-4 text-cyan-400" />
                  </button>
                </div>

                {/* Micro preview of extracted metrics */}
                {doc.extractedData?.metrics?.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {doc.extractedData.metrics.slice(0, 3).map((m, mIdx) => (
                      <span key={mIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300 font-medium">
                        {m.name}: <span className="text-cyan-300 font-semibold">{m.value} {m.unit}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { BookOpen, Search, Info, HelpCircle, ExternalLink, MessageSquare, ShieldCheck, Tag } from 'lucide-react';
import { MEDICAL_REFERENCE_KNOWLEDGE_BASE } from '../../data/medicalReference';

export default function MedicalReferenceView({ initialQuery = '' }) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTerm, setSelectedTerm] = useState(MEDICAL_REFERENCE_KNOWLEDGE_BASE[0]);

  const filteredTerms = MEDICAL_REFERENCE_KNOWLEDGE_BASE.filter(item => 
    item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.simpleExplanation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Educational Medical Dictionary</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Medical Reference</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Search terms, understand laboratory reference ranges, and explore verified medical concepts.
        </p>
      </div>

      {/* Safety Notice */}
      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
        <ShieldCheck className="w-4 h-4 text-indigo-400 flex-shrink-0" />
        <span>This educational reference section provides general medical concepts and does not provide personal diagnosis.</span>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Search & Term List */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-indigo-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search medical terms (e.g. HbA1c, Hemoglobin)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredTerms.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedTerm(item)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                  selectedTerm.id === item.id 
                    ? 'bg-slate-900 border-indigo-500/50 shadow-lg shadow-indigo-500/10' 
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60'
                }`}
              >
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 block mb-1">
                  {item.category}
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-white">{item.term}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{item.simpleExplanation}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Term Card */}
        <div className="lg:col-span-2">
          {selectedTerm ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-2xl">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  {selectedTerm.category}
                </span>
                <h2 className="text-2xl font-bold text-white mt-2">{selectedTerm.term}</h2>
              </div>

              {/* Simple Explanation */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Info className="w-4 h-4" /> Simple Explanation
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  {selectedTerm.simpleExplanation}
                </p>
              </div>

              {/* Medical Context */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" /> Medical Context & Physiology
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  {selectedTerm.medicalContext}
                </p>
              </div>

              {/* Reference Ranges if available */}
              {selectedTerm.referenceRanges && selectedTerm.referenceRanges.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                    Clinical Reference Guidelines
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {selectedTerm.referenceRanges.map((ref, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                        <div className="text-slate-400 font-medium">{ref.condition}</div>
                        <div className="text-indigo-300 font-bold mt-0.5">{ref.range}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Terms */}
              {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <Tag className="w-4 h-4" /> Related Medical Concepts
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTerm.relatedTerms.map((rt, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-medium">
                        {rt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Questions to ask your doctor */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" /> Neutral Questions to Ask Your Doctor
                </h3>
                <ul className="space-y-2 text-xs text-slate-300 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  {selectedTerm.doctorQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-indigo-400">•</span>
                      <span>"{q}"</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sources */}
              {selectedTerm.sources && selectedTerm.sources.length > 0 && (
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Reliable Medical References & Sources:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedTerm.sources.map((src, idx) => (
                      <a
                        key={idx}
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-indigo-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <span>{src.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 text-xs rounded-3xl bg-slate-900/60 border border-slate-800">
              Select a medical term from the index list to view its complete breakdown.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Search, X, FileText, ArrowRight, BookOpen, Pill } from 'lucide-react';
import { MEDICAL_REFERENCE_KNOWLEDGE_BASE } from '../../data/medicalReference';

export default function GlobalSearchModal({ isOpen, onClose, documents, onSelectDocument, onSelectReference }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matchedDocs = documents.filter(d => 
    d.title.toLowerCase().includes(query.toLowerCase()) ||
    d.summary?.toLowerCase().includes(query.toLowerCase()) ||
    d.facility?.toLowerCase().includes(query.toLowerCase())
  );

  const matchedRef = MEDICAL_REFERENCE_KNOWLEDGE_BASE.filter(r =>
    r.term.toLowerCase().includes(query.toLowerCase()) ||
    r.simpleExplanation.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-fadeIn">
      <div className="bg-navy-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs">
            <Search className="w-4 h-4 text-cyan-400" />
            <span>Search MedRef AI Workspace</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <input
          type="text"
          autoFocus
          placeholder="Search documents, lab tests, terms (e.g. Hemoglobin, Glucose, Metformin)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
        />

        <div className="max-h-[350px] overflow-y-auto space-y-4 pt-1">
          {query.trim() === '' ? (
            <div className="text-center text-slate-500 text-xs py-8">
              Type to search across documents, extracted lab metrics, and medical dictionary terms.
            </div>
          ) : (
            <>
              {/* Documents Matches */}
              {matchedDocs.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Matching Documents ({matchedDocs.length})</span>
                  {matchedDocs.map(d => (
                    <button
                      key={d.id}
                      onClick={() => { onSelectDocument(d); onClose(); }}
                      className="w-full p-3 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-cyan-400" />
                        <div>
                          <span className="font-semibold text-white block">{d.title}</span>
                          <span className="text-slate-400 text-[11px]">{d.date} • {d.facility}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    </button>
                  ))}
                </div>
              )}

              {/* Reference Terms Matches */}
              {matchedRef.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Medical Dictionary Terms ({matchedRef.length})</span>
                  {matchedRef.map(r => (
                    <button
                      key={r.id}
                      onClick={() => { onSelectReference(r.term); onClose(); }}
                      className="w-full p-3 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-indigo-400" />
                        <div>
                          <span className="font-semibold text-white block">{r.term}</span>
                          <span className="text-slate-400 text-[11px] line-clamp-1">{r.simpleExplanation}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

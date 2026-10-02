import React, { useState } from 'react';
import { X, FileText, Info, HelpCircle, AlertCircle, MessageSquare, ShieldCheck, ExternalLink } from 'lucide-react';
import { MEDICAL_REFERENCE_KNOWLEDGE_BASE } from '../../data/medicalReference';

export default function ReportViewerModal({ document, onClose, onOpenReference }) {
  const [selectedMetric, setSelectedMetric] = useState(
    document?.extractedData?.metrics?.[0] || {
      name: "Hemoglobin",
      value: 11.2,
      unit: "g/dL",
      refRange: "12.0 - 15.5 g/dL",
      status: "low"
    }
  );

  if (!document) return null;

  // Find corresponding medical reference knowledge if available
  const matchRef = MEDICAL_REFERENCE_KNOWLEDGE_BASE.find(r => 
    r.term.toLowerCase().includes(selectedMetric.name.toLowerCase()) ||
    selectedMetric.name.toLowerCase().includes(r.term.toLowerCase().split(' ')[0])
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-navy-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">
                Explain My Report
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">{document.title}</h2>
              <div className="text-xs text-slate-400">{document.date} • {document.facility}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Responsible AI Disclaimer */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span>This breakdown translates lab terminology into plain language. It is strictly informational and not a diagnostic opinion.</span>
        </div>

        {/* Metric Selector Pills if document has multiple metrics */}
        {document.extractedData?.metrics?.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Select Test Metric to Explain:
            </span>
            <div className="flex flex-wrap gap-2">
              {document.extractedData.metrics.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedMetric(m)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                    selectedMetric.name === m.name 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>{m.name}</span>
                  <span className="text-[10px] opacity-80">{m.value} {m.unit}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4 Core Sections Required by Prompt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Section 1: What is it? */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider">
              <Info className="w-4 h-4" />
              <span>What is it?</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {matchRef?.simpleExplanation || `${selectedMetric.name} is an important biological biomarker evaluated in routine medical blood panels to assess body function and organ system balance.`}
            </p>
          </div>

          {/* Section 2: Why is it measured? */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Why is it measured?</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {matchRef?.medicalContext || `Healthcare providers order this test to monitor overall physiologic equilibrium, screen for potential deficiencies, and track metabolic responses over time.`}
            </p>
          </div>

          {/* Section 3: Your report says */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Your report says</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium block">{selectedMetric.name}</span>
                <span className="text-xl font-extrabold text-white">{selectedMetric.value} <span className="text-xs font-normal text-slate-400">{selectedMetric.unit}</span></span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Reference Range</span>
                <span className="text-xs font-semibold text-cyan-300">{selectedMetric.refRange}</span>
              </div>
            </div>
          </div>

          {/* Section 4: Things to discuss with your doctor */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              <MessageSquare className="w-4 h-4" />
              <span>Things to discuss with your doctor</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside leading-relaxed">
              <li>"What does this level mean in the context of my overall health history?"</li>
              <li>"Should we compare this result against my previous lab tests?"</li>
              <li>"Are any follow-up tests or lifestyle modifications recommended?"</li>
            </ul>
          </div>
        </div>

        {/* Doctor Notes & Footer */}
        {document.extractedData?.doctorNotes && (
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-1">
            <span className="font-semibold text-slate-200">Doctor Notes on File:</span>
            <p className="italic">{document.extractedData.doctorNotes}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={() => {
              onClose();
              if (onOpenReference) onOpenReference(selectedMetric.name);
            }}
            className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Search "{selectedMetric.name}" in Medical Reference</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Close Report Viewer
          </button>
        </div>
      </div>
    </div>
  );
}

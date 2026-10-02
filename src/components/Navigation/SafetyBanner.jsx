import React, { useState } from 'react';
import { ShieldAlert, Info, X } from 'lucide-react';

export default function SafetyBanner({ compact = false }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full bg-slate-900/80 border-b border-slate-800 backdrop-blur-md px-4 py-2.5 text-xs text-slate-300 flex items-center justify-between gap-3 shadow-inner">
      <div className="flex items-center gap-2.5 max-w-6xl mx-auto w-full">
        <span className="flex-shrink-0 p-1 rounded-full bg-blue-500/10 text-cyan-400 border border-cyan-500/20">
          <Info className="w-3.5 h-3.5" />
        </span>
        <div className="flex-1 leading-relaxed">
          <span className="font-semibold text-slate-200">Informational Notice:</span> MedRef AI provides document organization and terminology reference. It does not diagnose medical conditions or replace healthcare professionals. For urgent medical concerns, contact emergency services.
        </div>
      </div>
      <button 
        onClick={() => setDismissed(true)}
        className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        title="Dismiss notice"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function SafetyBanner() {
  return (
    <div className="bg-slate-900/90 border-b border-cyan-500/20 px-4 py-2 text-xs text-slate-300 flex items-center justify-center gap-2 text-center select-none">
      <AlertCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
      <span>
        <strong className="text-cyan-300 font-medium">MedRef AI Reference Portal:</strong> AI-generated medical information is for educational & decision-support purposes only. Verify key details with trusted clinical sources & qualified healthcare professionals.
      </span>
    </div>
  );
}

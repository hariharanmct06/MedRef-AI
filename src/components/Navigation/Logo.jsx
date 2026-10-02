import React from 'react';

export default function Logo({ size = "normal", showText = true, className = "" }) {
  const iconSize = size === "small" ? "w-6 h-6" : size === "large" ? "w-10 h-10" : "w-8 h-8";
  const textSize = size === "small" ? "text-base" : size === "large" ? "text-2xl" : "text-xl";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`relative ${iconSize} flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-navy-900 p-0.5 shadow-lg shadow-cyan-500/20`}>
        <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle grid accent inside logo */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:6px_6px]" />
          
          <svg className="w-3/4 h-3/4 text-cyan-400 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Document sheet contour */}
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            {/* AI Connected Nodes */}
            <circle cx="10" cy="13" r="1.5" fill="#38bdf8" />
            <circle cx="15" cy="13" r="1.5" fill="#38bdf8" />
            <circle cx="12.5" cy="17" r="1.5" fill="#38bdf8" />
            <path d="M10 13 L15 13 L12.5 17 Z" stroke="#38bdf8" strokeWidth="1.2" opacity="0.8" />
          </svg>
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold tracking-tight text-white ${textSize} leading-none flex items-center gap-1`}>
            MedRef <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">AI</span>
          </span>
          <span className="text-[10px] tracking-wider text-slate-400 font-medium uppercase mt-0.5">Medical Info connected</span>
        </div>
      )}
    </div>
  );
}

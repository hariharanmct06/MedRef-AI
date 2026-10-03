import React from 'react';

/**
 * MedRef AI Signature Intelligence Core / Orb
 * Clinical Futurism signature visual element.
 * 
 * Props:
 * - size: 'sm' (24px), 'md' (40px), 'lg' (64px), 'xl' (96px), 'hero' (120px)
 * - state: 'idle' | 'listening' | 'processing' | 'reasoning' | 'analyzing'
 * - interactive: boolean (adds hover / tap glow effect)
 * - label: string (optional status label below orb)
 * - onClick: function
 */
export default function MedRefOrb({
  size = 'md',
  state = 'idle',
  interactive = false,
  label = null,
  onClick = null,
  className = ''
}) {
  // Size dimensions
  const dimensions = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    hero: 'w-32 h-32'
  }[size] || 'w-10 h-10';

  // State color mapping
  const getStateColors = () => {
    switch (state) {
      case 'listening':
        return {
          core: 'from-emerald-400 via-teal-500 to-cyan-600',
          ring: 'border-emerald-400/40',
          glow: 'shadow-[0_0_30px_rgba(16,185,129,0.5)]',
          status: 'Listening...'
        };
      case 'processing':
        return {
          core: 'from-cyan-400 via-sky-500 to-blue-600',
          ring: 'border-cyan-400/50 animate-spin',
          glow: 'shadow-[0_0_35px_rgba(6,182,212,0.6)]',
          status: 'Processing...'
        };
      case 'reasoning':
        return {
          core: 'from-indigo-400 via-blue-500 to-cyan-500',
          ring: 'border-indigo-400/50 animate-pulse',
          glow: 'shadow-[0_0_40px_rgba(99,102,241,0.5)]',
          status: 'Synthesizing...'
        };
      case 'analyzing':
        return {
          core: 'from-sky-300 via-teal-400 to-cyan-600',
          ring: 'border-sky-300/60 animate-ping',
          glow: 'shadow-[0_0_35px_rgba(56,189,248,0.5)]',
          status: 'Analyzing Visuals...'
        };
      case 'idle':
      default:
        return {
          core: 'from-cyan-400 via-teal-400 to-blue-600',
          ring: 'border-cyan-500/30',
          glow: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]',
          status: 'Ready'
        };
    }
  };

  const style = getStateColors();

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      <div
        onClick={onClick}
        className={`relative ${dimensions} rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer ${
          interactive ? 'hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]' : ''
        }`}
      >
        {/* Outer Orbital Pulse Ring 1 */}
        <div
          className={`absolute inset-[-4px] rounded-full border border-dashed ${style.ring} opacity-70 transition-all duration-700`}
          style={{ animationDuration: state === 'processing' ? '6s' : '12s' }}
        />

        {/* Outer Glow Halo */}
        <div className={`absolute inset-0 rounded-full bg-cyan-500/20 blur-md transition-all duration-500 ${style.glow}`} />

        {/* Inner Rotating Medical Ring */}
        <svg
          className={`absolute inset-0 w-full h-full text-cyan-400/40 transition-transform duration-1000 ${
            state === 'processing' || state === 'analyzing' ? 'animate-spin' : ''
          }`}
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 8" />
          <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="1" strokeDasharray="12 12" />
        </svg>

        {/* Active Wave / Waveform for Listening state */}
        {state === 'listening' && (
          <div className="absolute inset-0 flex items-center justify-center gap-1 z-20">
            <span className="w-1 h-4 bg-emerald-300 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-6 bg-teal-200 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <span className="w-1 h-3 bg-cyan-300 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          </div>
        )}

        {/* Central Core Nucleus */}
        <div
          className={`relative z-10 w-3/5 h-3/5 rounded-full bg-gradient-to-tr ${style.core} p-[1px] shadow-inner flex items-center justify-center transition-all duration-500`}
        >
          {/* Inner Light Reflection Dot */}
          <div className="w-full h-full rounded-full bg-slate-950/40 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-white/60 blur-[0.5px]" />
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-300/80 shadow-[0_0_8px_#38bdf8] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Optional Status Label */}
      {(label || state !== 'idle') && (
        <span className="mt-2 text-xs font-medium tracking-wide text-cyan-300/90 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          {label || style.status}
        </span>
      )}
    </div>
  );
}

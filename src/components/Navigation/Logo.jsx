import React from 'react';
import logoImg from '../../assets/logo.png';

export default function Logo({ size = "normal", showText = true, variant = "full", className = "" }) {
  const iconDimensions = {
    small: "w-7 h-7",
    normal: "w-9 h-9",
    large: "w-12 h-12",
    hero: "w-20 h-20"
  }[size] || "w-9 h-9";

  const textStyles = {
    small: "text-sm",
    normal: "text-lg",
    large: "text-2xl",
    hero: "text-3xl"
  }[size] || "text-lg";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* MedRef AI 3D Cross Logo Icon */}
      <div className={`relative ${iconDimensions} rounded-xl bg-white/95 p-1 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-500/30 flex items-center justify-center overflow-hidden transition-all hover:scale-105`}>
        <img
          src={logoImg}
          alt="MedRef AI Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {showText && (
        <div className="flex flex-col select-none">
          <div className={`font-black tracking-tight ${textStyles} leading-tight text-slate-100 flex items-center gap-1`}>
            <span>MedRef</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 font-extrabold">
              AI
            </span>
          </div>
          <span className="text-[9px] tracking-widest text-slate-400 font-bold uppercase font-sans">
            Smarter Reference. Better Care.
          </span>
        </div>
      )}
    </div>
  );
}

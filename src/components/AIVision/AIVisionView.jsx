import React, { useState } from 'react';
import { Eye, Upload, Camera, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, FileText } from 'lucide-react';
import MedRefOrb from '../Common/MedRefOrb';
import { AI_VISION_SAMPLES } from '../../data/medrefData';

export default function AIVisionView({ onOpenSearchWithQuery }) {
  const [selectedSample, setSelectedSample] = useState(AI_VISION_SAMPLES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const steps = [
    "Scanning image geometry & optical character recognition...",
    "Detecting high-yield diagnostic markers & pattern features...",
    "Cross-referencing Harrison's & ACC/AHA image reference database...",
    "Formulating structured clinical interpretation..."
  ];

  const handleRunAnalysis = (sampleObj) => {
    setSelectedSample(sampleObj);
    setIsAnalyzing(true);
    setAnalysisStep(0);

    const step1 = setTimeout(() => setAnalysisStep(1), 500);
    const step2 = setTimeout(() => setAnalysisStep(2), 1000);
    const step3 = setTimeout(() => setAnalysisStep(3), 1500);
    const done = setTimeout(() => setIsAnalyzing(false), 2000);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(done);
    };
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-sky-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              AI Vision Diagnostic Assistant
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Analyze 12-lead ECGs, chest radiographs, histology slides, and lab report tables using vision AI models.
          </p>
        </div>
      </div>

      {/* Main Grid: Upload/Sample Selector & Analysis Output */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Image Dropzone & Samples */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-950 border-2 border-dashed border-slate-800 hover:border-sky-500/50 transition-all text-center space-y-3 cursor-pointer group">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-200">Upload Medical Image / Lab PDF</h3>
              <p className="text-xs text-slate-400 mt-1">Drag & drop or tap to browse files</p>
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-slate-900 text-[10px] text-slate-400 font-mono">
              Supports ECG, X-Ray, Pathology, Lab Tables
            </span>
          </div>

          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Pre-Loaded High-Yield Clinical Samples
          </h2>

          <div className="space-y-2.5">
            {AI_VISION_SAMPLES.map((sample) => {
              const isSelected = selectedSample.id === sample.id;
              return (
                <div
                  key={sample.id}
                  onClick={() => handleRunAnalysis(sample)}
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-sky-500/60 shadow-[0_0_20px_rgba(56,189,248,0.15)]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  <img
                    src={sample.thumbnailUrl}
                    alt={sample.title}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-800 flex-shrink-0"
                  />
                  <div>
                    <span className="text-[9px] font-bold uppercase text-sky-400 tracking-wider">
                      {sample.category}
                    </span>
                    <h3 className="text-xs font-bold text-slate-100">{sample.title}</h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{sample.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: AI Analysis Result Workspace */}
        <div className="lg:col-span-2 space-y-6">
          {isAnalyzing ? (
            <div className="p-12 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col items-center justify-center space-y-4">
              <MedRefOrb size="hero" state="analyzing" />
              <div className="text-center space-y-1">
                <p className="text-base text-sky-300 font-bold">MedRef Vision Processing Engine</p>
                <p className="text-xs text-slate-400 font-mono animate-pulse">{steps[analysisStep]}</p>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
              {/* Image Preview & Header */}
              <div className="flex flex-col sm:flex-row gap-4 items-start border-b border-slate-800 pb-5">
                <img
                  src={selectedSample.thumbnailUrl}
                  alt={selectedSample.title}
                  className="w-full sm:w-48 h-36 rounded-xl object-cover border border-slate-800 shadow-xl"
                />
                <div className="space-y-2 flex-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-950 text-sky-300 border border-sky-500/30">
                    {selectedSample.category}
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-100">{selectedSample.title}</h2>
                  <p className="text-xs text-slate-400 leading-relaxed">{selectedSample.description}</p>
                </div>
              </div>

              {/* Explicit Section 1: AI Visual Interpretation */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    AI Visual Observations & Pattern Detection
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {selectedSample.aiAnalysis.observations.map((obs, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0 mt-1.5" />
                      <span>{obs}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explicit Section 2: Referenced Medical Pathology */}
              <div className="p-4 rounded-xl bg-slate-950 border border-sky-500/30 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Referenced Medical Pathology & Diagnosis
                </h3>
                <p className="text-sm text-sky-200 font-semibold">
                  {selectedSample.aiAnalysis.pathology}
                </p>
              </div>

              {/* Clinical Recommendations */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Recommended Clinical Follow-Up & Next Steps
                </h3>
                <div className="space-y-1.5">
                  {selectedSample.aiAnalysis.recommendations.map((rec, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust & Safety Notice */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Safety Notice:</strong> AI vision analysis is strictly for educational reference & decision assistance. Always verify radiology and ECG findings with qualified specialists.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { ShieldCheck, Lock, EyeOff, UserCheck, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export default function PrivacyView() {
  const principles = [
    {
      title: "User Ownership & Data Control",
      desc: "You retain full control over all uploaded records, extraction metadata, and health timeline logs. You can permanently erase all stored data at any time.",
      icon: UserCheck
    },
    {
      title: "Responsible AI & Extraction Boundaries",
      desc: "AI document parsing extracts structure to help you organize documents. Because automated OCR can occasionally misread numbers, extracted data must always be verified against original medical documents.",
      icon: AlertTriangle
    },
    {
      title: "Informational Purpose Only",
      desc: "MedRef AI is an information management tool. It does not provide medical diagnoses, treatment recommendations, or replace consultations with licensed healthcare professionals.",
      icon: ShieldCheck
    },
    {
      title: "Secure Handling Practices",
      desc: "Uploaded records are processed locally in your workspace session and stored under strict access controls designed for personal health data management.",
      icon: Lock
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy & Governance</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Your medical information deserves careful handling.
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          Transparent data handling principles built on user control, extraction accuracy verification, and responsible AI positioning.
        </p>
      </div>

      {/* Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {principles.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div key={idx} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 w-fit">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">{p.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Accuracy Verification Policy */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          <span>Verification & Accuracy Policy</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Automated document parsing simplifies record keeping, but optical character recognition (OCR) and machine learning models can occasionally transpose digits or misinterpret handwritten notes.
        </p>
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="font-semibold text-cyan-300">MedRef AI Guidelines:</div>
          <ul className="space-y-1.5 text-slate-400 list-disc list-inside">
            <li>Always double-check extracted lab values against the original source document PDF or image.</li>
            <li>Confirm medication dosages with your prescribing physician or pharmacist.</li>
            <li>Report any parsing discrepancies to ensure records remain accurate.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

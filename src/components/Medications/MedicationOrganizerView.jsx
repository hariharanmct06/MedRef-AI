import React, { useState } from 'react';
import { Pill, Calendar, Clock, AlertCircle, FileText, CheckCircle2, ShieldCheck, ChevronRight, Sun, Moon, Sunrise, Sunset } from 'lucide-react';

export default function MedicationOrganizerView({ documents, onSelectDocument }) {
  // Aggregate medications from all documents
  const allMedications = documents.flatMap(doc => {
    if (doc.extractedData?.medications?.length > 0) {
      return doc.extractedData.medications.map(med => ({
        ...med,
        prescriptionDate: doc.date,
        doctor: doc.doctor,
        facility: doc.facility,
        sourceDoc: doc
      }));
    }
    return [];
  });

  const [takenMeds, setTakenMeds] = useState({});

  const toggleTaken = (medName) => {
    setTakenMeds(prev => ({ ...prev, [medName]: !prev[medName] }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
          <Pill className="w-3.5 h-3.5 text-emerald-400" />
          <span>Active Prescriptions & Regimens</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">My Medications</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Organized listing of current medications extracted from your verified prescriptions and clinical notes.
        </p>
      </div>

      {/* Mandatory Safety UX Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
        <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-amber-300">Safety Notice:</span> Verify medication instructions with your healthcare professional. MedRef AI does not prescribe medication, adjust dosages, or alter treatment plans.
        </div>
      </div>

      {/* Daily Schedule Tracker Grid */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" /> Today's Routine Schedule
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Morning */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs border-b border-slate-800/80 pb-2">
              <Sunrise className="w-4 h-4" /> Morning
            </div>
            {allMedications.filter(m => m.instructions.toLowerCase().includes('breakfast') || m.instructions.toLowerCase().includes('morning') || m.frequency.toLowerCase().includes('once daily')).map((med, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">{med.name}</div>
                  <div className="text-[11px] text-slate-400">{med.dosage}</div>
                </div>
                <button 
                  onClick={() => toggleTaken(`${med.name}-morning`)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    takenMeds[`${med.name}-morning`] 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Afternoon */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs border-b border-slate-800/80 pb-2">
              <Sun className="w-4 h-4" /> Afternoon
            </div>
            <div className="text-[11px] text-slate-500 italic p-2">No midday doses scheduled</div>
          </div>

          {/* Evening */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs border-b border-slate-800/80 pb-2">
              <Sunset className="w-4 h-4" /> Evening
            </div>
            <div className="text-[11px] text-slate-500 italic p-2">No evening doses scheduled</div>
          </div>

          {/* Bedtime */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs border-b border-slate-800/80 pb-2">
              <Moon className="w-4 h-4" /> Bedtime
            </div>
            {allMedications.filter(m => m.instructions.toLowerCase().includes('bedtime') || m.instructions.toLowerCase().includes('night')).map((med, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">{med.name}</div>
                  <div className="text-[11px] text-slate-400">{med.dosage}</div>
                </div>
                <button 
                  onClick={() => toggleTaken(`${med.name}-bedtime`)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    takenMeds[`${med.name}-bedtime`] 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Medication Cards List */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          All Active Prescribed Medications ({allMedications.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allMedications.map((med, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Pill className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{med.name}</h4>
                    <span className="text-xs text-cyan-300 font-semibold">{med.dosage}</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                  {med.status || 'Active'}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div><span className="text-slate-400">Frequency:</span> {med.frequency}</div>
                <div><span className="text-slate-400">Instructions:</span> {med.instructions}</div>
                <div><span className="text-slate-400">Prescription Date:</span> {med.prescriptionDate}</div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Prescribed by {med.doctor}</span>
                <button
                  onClick={() => onSelectDocument(med.sourceDoc)}
                  className="text-cyan-400 hover:underline text-[11px] font-semibold flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" /> View Source Doc
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

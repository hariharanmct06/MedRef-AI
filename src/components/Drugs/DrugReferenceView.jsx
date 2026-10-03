import React, { useState } from 'react';
import { Pill, Search, ShieldAlert, CheckCircle2, AlertTriangle, ExternalLink, Activity, Info, Plus, Trash2 } from 'lucide-react';
import { COMPREHENSIVE_DRUGS } from '../../data/medrefData';

export default function DrugReferenceView({ onOpenTopic }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrug, setSelectedDrug] = useState(COMPREHENSIVE_DRUGS[0]);
  const [interactionDrugs, setInteractionDrugs] = useState(['lisinopril', 'metformin']);

  const filteredDrugs = COMPREHENSIVE_DRUGS.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.drugClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.brandNames.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleDrugForInteraction = (drugId) => {
    if (interactionDrugs.includes(drugId)) {
      setInteractionDrugs(prev => prev.filter(id => id !== drugId));
    } else {
      if (interactionDrugs.length < 4) {
        setInteractionDrugs(prev => [...prev, drugId]);
      }
    }
  };

  // Find interactions between selected drugs in interaction tool
  const getInteractions = () => {
    const list = [];
    const selectedObjs = COMPREHENSIVE_DRUGS.filter(d => interactionDrugs.includes(d.id));

    selectedObjs.forEach(drug => {
      drug.interactions.forEach(inter => {
        // check if target drug is in selected list
        const targetMatch = selectedObjs.find(o => o.name.toLowerCase().includes(inter.drug.toLowerCase().split(' ')[0]));
        if (targetMatch) {
          list.push({
            drugA: drug.name,
            drugB: inter.drug,
            severity: inter.severity,
            details: inter.details
          });
        }
      });
    });
    return list;
  };

  const detectedInteractions = getInteractions();

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-teal-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              Pharmacology & Drug Reference
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Evidence-based pharmacotherapy monographs, mechanism of action, dosing, and drug interaction analysis.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medicine or drug class..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Main Grid: Drug List & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Drug Catalog List */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Medication Monograph Index ({filteredDrugs.length})
          </h2>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredDrugs.map((drug) => {
              const isSelected = selectedDrug.id === drug.id;
              return (
                <div
                  key={drug.id}
                  onClick={() => setSelectedDrug(drug)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-teal-500/60 shadow-[0_0_20px_rgba(20,184,166,0.15)]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 px-2 py-0.5 rounded bg-teal-950 border border-teal-500/30">
                      {drug.badgeCategory}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{drug.route}</span>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-sm font-bold text-slate-100">{drug.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Brands: {drug.brandNames.join(', ')}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {drug.overview}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Drug Detail View */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold text-teal-400">{selectedDrug.drugClass}</span>
                <h2 className="text-2xl font-extrabold text-slate-100">{selectedDrug.name}</h2>
                <p className="text-xs text-slate-400">Brand names: {selectedDrug.brandNames.join(', ')}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleDrugForInteraction(selectedDrug.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    interactionDrugs.includes(selectedDrug.id)
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800 text-slate-200 border-slate-700 hover:border-teal-500'
                  }`}
                >
                  {interactionDrugs.includes(selectedDrug.id) ? 'Added to Interaction Checker' : '+ Check Interactions'}
                </button>
              </div>
            </div>

            {/* Overview & Mechanism */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">Mechanism of Action</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                {selectedDrug.mechanism}
              </p>
            </div>

            {/* Indications & Dosing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Approved Indications</h3>
                <ul className="space-y-1.5">
                  {selectedDrug.indications.map((ind, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                      {ind}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Dosing & Administration</h3>
                <p className="text-xs text-slate-300 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  {selectedDrug.dosing}
                </p>
              </div>
            </div>

            {/* Warnings & Black Box */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 space-y-1">
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold">
                <ShieldAlert className="w-4 h-4" />
                <span>Boxed Warnings & Safety Guidance</span>
              </div>
              <p className="text-xs text-red-200 leading-normal">
                {selectedDrug.warnings}
              </p>
            </div>

            {/* Monitoring Parameters */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Required Clinical Monitoring</h3>
              <div className="flex flex-wrap gap-2">
                {selectedDrug.monitoring.map((m, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* INTERACTIVE DRUG INTERACTION CHECKER TOOL */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 border border-amber-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-slate-100">Interactive Drug Interaction Checker</h3>
              </div>
              <span className="text-xs text-amber-300 font-mono">{interactionDrugs.length} Drugs Selected</span>
            </div>

            {/* Selected Drugs Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {interactionDrugs.map(id => {
                const d = COMPREHENSIVE_DRUGS.find(o => o.id === id);
                return (
                  <span key={id} className="px-3 py-1 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-200 text-xs font-semibold flex items-center gap-1.5">
                    {d?.name || id}
                    <Trash2 className="w-3 h-3 text-amber-400 cursor-pointer hover:text-amber-200" onClick={() => toggleDrugForInteraction(id)} />
                  </span>
                );
              })}
            </div>

            {/* Interaction Results */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              {detectedInteractions.length > 0 ? (
                detectedInteractions.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/40 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-300">{item.drugA} + {item.drugB}</span>
                      <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 font-mono text-[10px] font-bold">
                        {item.severity} Severity
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{item.details}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 text-center">
                  No major interactions detected between selected drugs.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

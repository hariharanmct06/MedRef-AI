import React, { useState } from 'react';
import { Calculator, CheckSquare, RefreshCw, AlertCircle, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { CALCULATORS_DATA } from '../../data/medrefData';

export default function CalculatorsView() {
  const [selectedCalcId, setSelectedCalcId] = useState('anion-gap');
  const activeCalc = CALCULATORS_DATA.find(c => c.id === selectedCalcId) || CALCULATORS_DATA[0];

  // Input states for active calculator
  const [inputs, setInputs] = useState(() => {
    const initial = {};
    if (activeCalc.inputs) {
      activeCalc.inputs.forEach(inp => { initial[inp.id] = inp.default; });
    }
    if (activeCalc.radios) {
      activeCalc.radios.forEach(rad => { initial[rad.id] = rad.options[0].value; });
    }
    return initial;
  });

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleInputChange = (id, val) => {
    setInputs(prev => ({ ...prev, [id]: parseFloat(val) || val }));
  };

  const handleCheckboxToggle = (id) => {
    setSelectedCheckboxes(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectCalc = (calcObj) => {
    setSelectedCalcId(calcObj.id);
    const initial = {};
    if (calcObj.inputs) {
      calcObj.inputs.forEach(inp => { initial[inp.id] = inp.default; });
    }
    if (calcObj.radios) {
      calcObj.radios.forEach(rad => { initial[rad.id] = rad.options[0].value; });
    }
    setInputs(initial);
    setSelectedCheckboxes([]);
  };

  // Perform live calculation
  const calcResult = activeCalc.checkboxes
    ? activeCalc.calculate(selectedCheckboxes)
    : activeCalc.calculate(inputs);

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              Medical Calculators & Risk Workspace
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Validated clinical prediction rules, score calculators, and evidence-based interpretation engines.
          </p>
        </div>
      </div>

      {/* Main Grid: Calculator Selector & Calculator Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Selector */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Clinical Calculators ({CALCULATORS_DATA.length})
          </h2>

          <div className="space-y-2">
            {CALCULATORS_DATA.map((c) => {
              const isSelected = selectedCalcId === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => handleSelectCalc(c)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500/60 shadow-[0_0_20px_rgba(99,102,241,0.15)]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/30">
                      {c.category}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 mt-2">{c.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{c.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Calculator Interactive Workspace */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div>
              <span className="text-xs font-semibold text-indigo-400">{activeCalc.category}</span>
              <h2 className="text-2xl font-extrabold text-slate-100">{activeCalc.name}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{activeCalc.description}</p>
            </div>

            {/* Inputs / Checkboxes Form Region */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Interactive Parameters & Patient Data
              </h3>

              {/* Slider / Number Inputs */}
              {activeCalc.inputs && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeCalc.inputs.map((inp) => (
                    <div key={inp.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <label className="font-semibold">{inp.label}</label>
                        <span className="font-mono text-cyan-400 font-bold">
                          {inputs[inp.id] ?? inp.default} {inp.unit}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={inp.min}
                        max={inp.max}
                        step={inp.step}
                        value={inputs[inp.id] ?? inp.default}
                        onChange={(e) => handleInputChange(inp.id, e.target.value)}
                        className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Radio Group */}
              {activeCalc.radios && activeCalc.radios.map((rad) => (
                <div key={rad.id} className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">{rad.label}</label>
                  <div className="flex items-center gap-3">
                    {rad.options.map(opt => (
                      <label key={opt.value} className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="radio"
                          name={rad.id}
                          value={opt.value}
                          checked={inputs[rad.id] === opt.value}
                          onChange={(e) => handleInputChange(rad.id, e.target.value)}
                          className="accent-indigo-500"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {/* Checkbox Group */}
              {activeCalc.checkboxes && (
                <div className="space-y-2">
                  {activeCalc.checkboxes.map((chk) => {
                    const isChecked = selectedCheckboxes.includes(chk.id);
                    return (
                      <div
                        key={chk.id}
                        onClick={() => handleCheckboxToggle(chk.id)}
                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          isChecked
                            ? 'bg-indigo-950/70 border-indigo-500/50 text-indigo-200'
                            : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-xs font-medium">{chk.label}</span>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-indigo-400">
                          +{chk.points} pt{chk.points > 1 ? 's' : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dynamic Result Display Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 border border-indigo-500/40 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Calculation Result</span>
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                  calcResult.riskLevel.includes('High') || calcResult.riskLevel.includes('Elevated') || calcResult.riskLevel.includes('Critical')
                    ? 'bg-red-950 text-red-300 border-red-500/40'
                    : calcResult.riskLevel.includes('Moderate') || calcResult.riskLevel.includes('Mild')
                    ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                }`}>
                  {calcResult.riskLevel}
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
                  {calcResult.value}
                </span>
                <span className="text-lg font-semibold text-indigo-400 font-mono">
                  {calcResult.unit}
                </span>
                {calcResult.stage && (
                  <span className="text-sm font-bold text-slate-300">
                    • {calcResult.stage}
                  </span>
                )}
              </div>

              {/* Interpretation */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Clinical Interpretation:</h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {calcResult.interpretation}
                </p>
                {calcResult.nextStep && (
                  <p className="text-xs text-cyan-300 font-semibold pt-1">
                    Recommended Next Action: {calcResult.nextStep}
                  </p>
                )}
              </div>

              {/* Formula & Reference */}
              <div className="pt-2 text-[11px] text-slate-400 space-y-1 font-mono">
                <div>Formula: {activeCalc.formula}</div>
                <div>Reference Range: {activeCalc.normalRange}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { ArrowLeftRight, Calendar, AlertCircle, Sparkles, MessageSquare, TrendingUp, TrendingDown, Minus, ShieldCheck, ArrowRight } from 'lucide-react';

export default function CompareReportsView({ documents }) {
  // Filter for blood/lab reports with metrics
  const labReports = documents.filter(d => d.extractedData?.metrics?.length > 0);

  const [reportAId, setReportAId] = useState(labReports[0]?.id || "doc-101");
  const [reportBId, setReportBId] = useState(labReports[labReports.length - 1]?.id || "doc-105");

  const reportA = documents.find(d => d.id === reportAId) || labReports[0];
  const reportB = documents.find(d => d.id === reportBId) || labReports[labReports.length - 1];

  // Align metrics between report A & B
  const metricsA = reportA?.extractedData?.metrics || [];
  const metricsB = reportB?.extractedData?.metrics || [];

  const combinedMetrics = metricsA.map(mA => {
    const mB = metricsB.find(b => b.name.toLowerCase() === mA.name.toLowerCase());
    const valA = typeof mA.value === 'number' ? mA.value : parseFloat(mA.value) || 0;
    const valB = mB ? (typeof mB.value === 'number' ? mB.value : parseFloat(mB.value) || 0) : null;
    const diff = valB !== null ? parseFloat((valB - valA).toFixed(2)) : null;

    return {
      name: mA.name,
      unit: mA.unit,
      refRange: mA.refRange,
      earlierVal: mA.value,
      latestVal: mB ? mB.value : 'N/A',
      change: diff,
      isNumeric: valB !== null
    };
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Report Comparison Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Compare Reports</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Select two medical reports to visualize lab metric progression and shift trends side-by-side.
        </p>
      </div>

      {/* Selectors Card */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          Select Reports to Compare
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Report A */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Report A (Earlier Baseline)
            </label>
            <select
              value={reportAId}
              onChange={(e) => setReportAId(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-medium focus:border-cyan-500 focus:outline-none"
            >
              {labReports.map(d => (
                <option key={d.id} value={d.id}>
                  {d.date} — {d.title} ({d.facility})
                </option>
              ))}
            </select>
          </div>

          {/* Report B */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" /> Report B (Latest Follow-Up)
            </label>
            <select
              value={reportBId}
              onChange={(e) => setReportBId(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-medium focus:border-cyan-500 focus:outline-none"
            >
              {labReports.map(d => (
                <option key={d.id} value={d.id}>
                  {d.date} — {d.title} ({d.facility})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Comparison Table */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="text-sm font-semibold text-white">Lab Metric Comparison Table</h3>
          <div className="text-xs text-slate-400 font-medium">
            Comparing <span className="text-cyan-300 font-semibold">{reportA?.date}</span> vs <span className="text-cyan-300 font-semibold">{reportB?.date}</span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5">TEST</th>
                <th className="p-3.5">EARLIER ({reportA?.date})</th>
                <th className="p-3.5">LATEST ({reportB?.date})</th>
                <th className="p-3.5">CHANGE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
              {combinedMetrics.map((m, idx) => {
                const isPositive = m.change > 0;
                const isNegative = m.change < 0;
                return (
                  <tr key={idx} className="hover:bg-slate-900/80 transition-colors">
                    <td className="p-3.5 font-semibold text-white">
                      {m.name}
                      <span className="block text-[10px] text-slate-400 font-normal">Ref: {m.refRange}</span>
                    </td>
                    <td className="p-3.5 font-medium text-slate-300">{m.earlierVal} {m.unit}</td>
                    <td className="p-3.5 font-semibold text-cyan-300">{m.latestVal} {m.unit}</td>
                    <td className="p-3.5">
                      {m.change !== null ? (
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${
                          isPositive 
                            ? 'bg-blue-500/10 text-cyan-300 border border-cyan-500/20' 
                            : isNegative 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {isPositive && <TrendingUp className="w-3 h-3 text-cyan-400" />}
                          {isNegative && <TrendingDown className="w-3 h-3 text-emerald-400" />}
                          {m.change === 0 && <Minus className="w-3 h-3 text-slate-400" />}
                          {isPositive ? `+${m.change}` : m.change} {m.unit}
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mandatory AI Summary Box */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
            <Sparkles className="w-4 h-4" />
            <span>AI Summary</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed italic">
            “Changes detected between the selected reports are shown above. This comparison is informational and does not determine whether a change is medically significant.”
          </p>
        </div>

        {/* Discuss With Your Doctor Section */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>Discuss with your doctor</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>“What factors contributed most to the changes observed between these two reports?”</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>“Do my latest lab results indicate that current treatment or lifestyle measures are working effectively?”</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>“Are there specific target ranges we should set for my upcoming follow-up test?”</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

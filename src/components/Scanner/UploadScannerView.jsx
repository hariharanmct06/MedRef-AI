import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Loader2, 
  Eye, 
  ShieldCheck, 
  FileCheck,
  Plus,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function UploadScannerView({ onAddDocument, onSelectDocument }) {
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [extractedDoc, setExtractedDoc] = useState(null);
  const [selectedSample, setSelectedSample] = useState(null);

  const processingSteps = [
    "Uploading PDF/Image document...",
    "Reading text & OCR structure...",
    "Extracting medical metrics & medications...",
    "Organizing into your medical journey..."
  ];

  const sampleFiles = [
    {
      title: "Comprehensive Metabolic & Lipid Panel",
      type: "Blood report",
      category: "Reports",
      date: "2026-09-28",
      facility: "Metropolitan Diagnostics Center",
      doctor: "Dr. Sarah Jenkins, MD",
      metrics: [
        { name: "Hemoglobin", value: 12.4, unit: "g/dL", refRange: "12.0 - 15.5 g/dL", status: "normal", category: "Hematology" },
        { name: "Fasting Blood Glucose", value: 98, unit: "mg/dL", refRange: "70 - 99 mg/dL", status: "normal", category: "Metabolic" },
        { name: "HbA1c", value: 5.7, unit: "%", refRange: "< 5.7%", status: "normal", category: "Metabolic" },
        { name: "LDL Cholesterol", value: 98, unit: "mg/dL", refRange: "< 100 mg/dL", status: "normal", category: "Lipids" }
      ],
      medications: [],
      doctorNotes: "Lab parameters show notable normalization compared to earlier January 2026 baseline."
    },
    {
      title: "Follow-Up Cardiology Prescription",
      type: "Prescription image",
      category: "Prescriptions",
      date: "2026-10-01",
      facility: "Valley Cardiology Associates",
      doctor: "Dr. Marcus Vance, MD",
      metrics: [],
      medications: [
        { name: "Rosuvastatin", dosage: "10 mg", frequency: "Once daily", instructions: "Take oral tablet at bedtime", status: "Active" },
        { name: "Metformin", dosage: "500 mg", frequency: "Once daily", instructions: "Take oral tablet after breakfast", status: "Active" }
      ],
      doctorNotes: "Continue statin and metformin therapy. Maintain healthy low-glycemic diet."
    }
  ];

  const handleSimulateUpload = (sample) => {
    setSelectedSample(sample);
    setIsProcessing(true);
    setCurrentStepIndex(0);
    setExtractedDoc(null);

    // Step 1 -> 2 -> 3 -> 4 timeline simulation
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < processingSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsProcessing(false);
          
          const newDoc = {
            id: `doc-${Date.now()}`,
            title: sample.title,
            type: sample.type,
            category: sample.category,
            date: sample.date,
            facility: sample.facility,
            doctor: sample.doctor,
            verified: false,
            fileSize: "1.6 MB",
            fileType: "PDF",
            extractedData: {
              metrics: sample.metrics,
              medications: sample.medications,
              doctorNotes: sample.doctorNotes
            },
            summary: `Simulated OCR extraction for ${sample.title}`
          };
          
          setExtractedDoc(newDoc);
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
          return prev;
        }
      });
    }, 850);
  };

  const handleSaveToRecords = () => {
    if (extractedDoc) {
      onAddDocument({ ...extractedDoc, verified: true });
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      onSelectDocument({ ...extractedDoc, verified: true });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <UploadCloud className="w-6 h-6 text-cyan-400" />
          <span>Smart Medical Document Scanner</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Upload PDF reports, prescriptions, blood panels, or scan summaries for intelligent structured extraction.
        </p>
      </div>

      {/* Main Upload Drop Area */}
      {!isProcessing && !extractedDoc && (
        <div className="space-y-6">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              handleSimulateUpload(sampleFiles[0]);
            }}
            className={`p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-4 relative overflow-hidden ${
              dragActive 
                ? 'border-cyan-400 bg-cyan-500/10 shadow-2xl shadow-cyan-500/20' 
                : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80'
            }`}
          >
            <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-inner">
              <UploadCloud className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-1 max-w-sm">
              <h3 className="text-base font-semibold text-white">Add a medical document</h3>
              <p className="text-xs text-slate-400">
                Drag and drop your document here, or choose a file from your device.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
              <span className="px-2.5 py-1 rounded-md bg-slate-800">Supported: PDF, JPG, PNG</span>
              <span>•</span>
              <span>Max 25 MB</span>
            </div>

            <button
              onClick={() => handleSimulateUpload(sampleFiles[0])}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 mt-2"
            >
              Select Medical File
            </button>
          </div>

          {/* Quick Demo Samples */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Or Try Quick Sample Document Extraction:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sampleFiles.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSimulateUpload(sample)}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 text-left transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-800 text-cyan-400 group-hover:bg-cyan-500/10">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white group-hover:text-cyan-300">{sample.title}</h4>
                      <p className="text-[11px] text-slate-400">{sample.type} • {sample.date}</p>
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 text-cyan-400 opacity-60 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI Processing Scanning Animation */}
      {isProcessing && (
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 text-center shadow-2xl">
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-ping" />
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-8 h-8 animate-spin" />
            </div>
          </div>

          <div className="space-y-2 max-w-sm mx-auto">
            <h3 className="text-base font-semibold text-white">AI Document Analysis in Progress</h3>
            <p className="text-xs text-cyan-400 font-medium">
              {processingSteps[currentStepIndex]}
            </p>
          </div>

          {/* Progress bar */}
          <div className="max-w-md mx-auto w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${((currentStepIndex + 1) / processingSteps.length) * 100}%` }}
            />
          </div>

          <div className="flex justify-center gap-6 text-xs text-slate-400 font-medium pt-2">
            <span className={currentStepIndex >= 0 ? "text-cyan-300" : ""}>Uploading</span>
            <span className={currentStepIndex >= 1 ? "text-cyan-300" : ""}>Reading</span>
            <span className={currentStepIndex >= 2 ? "text-cyan-300" : ""}>Extracting</span>
            <span className={currentStepIndex >= 3 ? "text-cyan-300" : ""}>Organizing</span>
          </div>
        </div>
      )}

      {/* Extracted Structured Data Results View */}
      {extractedDoc && !isProcessing && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Success Banner */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3 text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Document Parsed Successfully</span>
            </div>
            <button
              onClick={() => { setExtractedDoc(null); }}
              className="text-xs text-slate-400 hover:text-white"
            >
              Scan Another Document
            </button>
          </div>

          {/* Mandatory Verification Notice */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold text-amber-300">Important Verification Notice:</span> Extracted medical information should always be verified against the original paper or official digital healthcare document before making health decisions.
            </div>
          </div>

          {/* Structured Document Content Card */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  {extractedDoc.category}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">{extractedDoc.title}</h2>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>Date: {extractedDoc.date}</span>
                  <span>•</span>
                  <span>Facility: {extractedDoc.facility}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onSelectDocument(extractedDoc)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-cyan-400" /> View Original Document
                </button>
                <button 
                  onClick={handleSaveToRecords}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" /> Save to My Records
                </button>
              </div>
            </div>

            {/* Extracted Metrics Table */}
            {extractedDoc.extractedData.metrics.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Extracted Lab Test Values ({extractedDoc.extractedData.metrics.length})
                </h3>
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-3">Test Name</th>
                        <th className="p-3">Extracted Value</th>
                        <th className="p-3">Reference Range</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                      {extractedDoc.extractedData.metrics.map((m, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/40">
                          <td className="p-3 font-medium text-white">{m.name}</td>
                          <td className="p-3 font-semibold text-cyan-300">{m.value} {m.unit}</td>
                          <td className="p-3 text-slate-400">{m.refRange}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${
                              m.status === 'normal' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              m.status === 'low' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                              'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}>
                              {m.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Extracted Medications */}
            {extractedDoc.extractedData.medications.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Extracted Medication Prescriptions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {extractedDoc.extractedData.medications.map((med, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
                      <div className="font-semibold text-white">{med.name} — {med.dosage}</div>
                      <div className="text-slate-400">Frequency: {med.frequency}</div>
                      <div className="text-cyan-400 text-[11px]">Instructions: {med.instructions}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Doctor Notes */}
            {extractedDoc.extractedData.doctorNotes && (
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1 text-xs">
                <div className="font-semibold text-slate-300">Extracted Doctor Notes:</div>
                <p className="text-slate-400 leading-relaxed italic">{extractedDoc.extractedData.doctorNotes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

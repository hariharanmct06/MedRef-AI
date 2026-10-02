import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  FileText, 
  GitCommit, 
  ArrowLeftRight, 
  Pill, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  Layers, 
  Clock, 
  HelpCircle, 
  Cpu, 
  ChevronRight,
  ExternalLink,
  Activity,
  FileCheck
} from 'lucide-react';
import Logo from '../Navigation/Logo';

export default function LandingView({ onExploreApp, onOpenDemo }) {
  const [activeStep, setActiveStep] = useState(0);

  const heroSteps = [
    { title: "Medical Reports", desc: "PDFs, Prescriptions, Blood Tests & Scans", color: "from-blue-500 to-cyan-400" },
    { title: "AI Extraction", desc: "Structured parsing of tests & medications", color: "from-cyan-400 to-emerald-400" },
    { title: "Connected Timeline", desc: "Chronological medical journey history", color: "from-emerald-400 to-indigo-400" },
    { title: "Medical Insights", desc: "Clear explanations & doctor preparation", color: "from-indigo-400 to-cyan-400" }
  ];

  const problemCards = [
    {
      icon: Layers,
      title: "Scattered Records",
      description: "Medical documents are scattered across different clinic portals, emails, physical paper folders, and lab PDFs."
    },
    {
      icon: HelpCircle,
      title: "Complex Terminology",
      description: "Lab metrics, acronyms, and medical jargon are difficult for patients to decipher without clear context."
    },
    {
      icon: Clock,
      title: "Hard to Compare Trends",
      description: "Comparing lab values from 6 months ago against today's results requires digging through separate paper pages."
    },
    {
      icon: Search,
      title: "Lost Appointment Context",
      description: "Crucial medical details and follow-up questions get forgotten during brief doctor consultations."
    }
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-navy-950 overflow-x-hidden">
      {/* Top Navbar */}
      <nav className="w-full border-b border-slate-800/80 bg-navy-950/80 backdrop-blur-xl fixed top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo size="normal" />
          <div className="flex items-center gap-4">
            <button 
              onClick={onExploreApp}
              className="text-xs font-semibold text-slate-300 hover:text-cyan-400 transition-colors hidden sm:block"
            >
              Sign In
            </button>
            <button 
              onClick={onExploreApp}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Explore MedRef AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Glow ambient background graphics */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-transparent blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>AI-Powered Medical Information Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Your Medical Information. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400">
              Clearly Connected.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            MedRef AI transforms scattered medical reports, prescriptions, and health information into one organized, understandable medical journey.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button 
              onClick={onExploreApp}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5"
            >
              <span>Explore MedRef AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a 
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>See How It Works</span>
            </a>
          </div>

          {/* Hero Visual Node Flow Stream */}
          <div className="pt-12">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/90 shadow-2xl relative">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6 flex items-center justify-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Connected Intelligence Pipeline</span>
              </div>

              {/* Node Stream Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative">
                {heroSteps.map((step, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`cursor-pointer p-5 rounded-2xl border transition-all text-left relative overflow-hidden ${
                      activeStep === idx 
                        ? 'bg-slate-900/90 border-cyan-500/50 shadow-lg shadow-cyan-500/10' 
                        : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`w-7 h-7 rounded-lg bg-gradient-to-br ${step.color} text-navy-950 font-bold text-xs flex items-center justify-center shadow-md`}>
                        0{idx + 1}
                      </span>
                      {activeStep === idx && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      )}
                    </div>
                    <h3 className="font-semibold text-sm text-white">{step.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* Data Flow Preview Widget */}
              <div className="mt-6 p-4 rounded-2xl bg-navy-950/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <FileCheck className="w-4 h-4" />
                  </span>
                  <div className="text-left">
                    <span className="font-semibold text-white block">Sample Document: Metabolic & Lipid Panel</span>
                    <span className="text-slate-400 text-[11px]">Date: 2026-09-28 | 8 Parameters Extracted</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium border border-emerald-500/20">
                    Verified Structured Data
                  </span>
                  <button 
                    onClick={onExploreApp}
                    className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    Launch Interactive Demo <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Introduction Section */}
      <section id="how-it-works" className="py-20 px-6 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Problem & Resolution</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              Healthcare information shouldn't be scattered.
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Traditional healthcare leaves patients managing disconnected PDFs, unfamiliar terminology, and lost notes between appointments.
            </p>
          </div>

          {/* 4 Problems Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problemCards.map((prob, idx) => {
              const Icon = prob.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all space-y-3">
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 w-fit">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-base text-white">{prob.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{prob.description}</p>
                </div>
              );
            })}
          </div>

          {/* Transition Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-slate-900 to-navy-900 border border-cyan-500/30 text-center space-y-4 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/5 backdrop-blur-3xl" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">The MedRef AI Solution</span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                One intelligent medical information space.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect documents into a unified, searchable timeline. Translate complex lab jargon into plain language. Compare reports across dates seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Platform Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Built for clarity, precision, and privacy.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 w-fit">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Smart Document Scanner</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload PDFs, prescription photos, blood panels, or scan summaries. Extract test values, reference ranges, dosage details, and doctor notes automatically.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 w-fit">
                <ArrowLeftRight className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Report Comparison Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Compare lab results across different dates. See side-by-side metric progression (+/- shifts) and generate neutral doctor discussion points.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 w-fit">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Ask My Records (RAG)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Search your records using natural language. Get grounded answers backed exclusively by direct document source citations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Landing Page CTA */}
      <section className="py-20 px-6 border-t border-slate-800/80 bg-gradient-to-b from-navy-950 to-slate-950 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            A clearer way to understand your medical information.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Take full control of your medical history with an intelligent, privacy-first platform.
          </p>
          <div className="pt-4">
            <button 
              onClick={onExploreApp}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-2xl shadow-cyan-500/30 transition-all inline-flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Explore MedRef AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-navy-950 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <Logo size="small" />
            <span className="text-slate-500">|</span>
            <span>Your Medical Information. Clearly Connected.</span>
          </div>
          <div>
            Built by <span className="font-semibold text-slate-200">Hari Bot & Business Solutions</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

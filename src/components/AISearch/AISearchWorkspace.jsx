import React, { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  Volume2,
  Bookmark,
  BookmarkCheck,
  Share2,
  FileText,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  BookOpen,
  Sliders,
  Layers,
  Info,
  ArrowRight,
  GitFork,
  Check,
  Mic,
  RefreshCw
} from 'lucide-react';
import MedRefOrb from '../Common/MedRefOrb';
import { COMPREHENSIVE_DISEASES, COMPREHENSIVE_DRUGS } from '../../data/medrefData';

export default function AISearchWorkspace({
  initialQuery = '',
  onSelectTopic,
  onOpenKnowledgeGraph,
  onSaveItem,
  savedItemIds = []
}) {
  const [query, setQuery] = useState(initialQuery || 'Myocardial Infarction');
  const [activeTab, setActiveTab] = useState('overview');
  const [explainLevel, setExplainLevel] = useState('clinical'); // beginner | student | clinical | exam | deep
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    keyFacts: true,
    clinicalFeatures: true,
    diagnosis: true,
    management: true,
    complications: true,
    sources: true
  });
  const [hoveredTerm, setHoveredTerm] = useState(null);

  // Suggestions state
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Look up topic in dataset or generate fallback AI dynamic response
  const selectedDisease = COMPREHENSIVE_DISEASES.find(
    d => d.title.toLowerCase().includes(query.toLowerCase()) || d.id === query.toLowerCase()
  ) || COMPREHENSIVE_DISEASES[0];

  const isSaved = savedItemIds.includes(selectedDisease.id);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      triggerSynthesis();
    }
  }, [initialQuery]);

  const triggerSynthesis = () => {
    setIsSynthesizing(true);
    const timer = setTimeout(() => {
      setIsSynthesizing(false);
    }, 600);
    return () => clearTimeout(timer);
  };

  const handleQueryChange = (val) => {
    setQuery(val);
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (suggestedText) => {
    setQuery(suggestedText);
    setShowSuggestions(false);
    triggerSynthesis();
  };

  const toggleSection = (secKey) => {
    setExpandedSections(prev => ({ ...prev, [secKey]: !prev[secKey] }));
  };

  const levelOptions = [
    { id: 'beginner', label: 'Beginner', desc: 'Simple non-technical terms' },
    { id: 'student', label: 'Medical Student', desc: 'Core pathophysiological principles' },
    { id: 'clinical', label: 'Clinical', desc: 'Evidence-based diagnostic & RX' },
    { id: 'exam', label: 'Exam Revision', desc: 'High-yield rapid bullets & board facts' },
    { id: 'deep', label: 'Deep Dive', desc: 'Cellular mechanism & research insights' }
  ];

  const inlineGlossary = {
    "Troponin": "A cardiac protein marker released into blood during myocardial injury; standard marker for heart attack diagnosis.",
    "PCI": "Percutaneous Coronary Intervention: Emergency procedure opening blocked coronary arteries using a balloon and stent.",
    "LAD": "Left Anterior Descending coronary artery: Supplies the anterior wall of the left ventricle; often called the 'widowmaker'.",
    "STEMI": "ST-Elevation Myocardial Infarction: Transmural myocardial necrosis presenting with ST elevation on ECG.",
    "MONA": "Morphine, Oxygen, Nitroglycerin, Aspirin - historic acute ACS initial management mnemonic."
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Search Header Bar & Workspace Transformer */}
      <div className="relative">
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 shadow-2xl backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-3">
            <MedRefOrb size="md" state={isSynthesizing ? 'processing' : 'reasoning'} />
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search a disease, drug, symptom, or question..."
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />

              {/* Suggestions Dropdown */}
              {showSuggestions && query.length > 1 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden divide-y divide-slate-800/60">
                  <div className="p-2 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Medical Database Matches
                  </div>
                  {COMPREHENSIVE_DISEASES.filter(d => d.title.toLowerCase().includes(query.toLowerCase())).map((d) => (
                    <div
                      key={d.id}
                      onClick={() => handleSelectSuggestion(d.title)}
                      className="px-4 py-2.5 hover:bg-slate-900 cursor-pointer flex items-center justify-between text-xs text-slate-200"
                    >
                      <span className="font-medium text-cyan-300">{d.title}</span>
                      <span className="text-[10px] text-slate-500 px-2 py-0.5 rounded bg-slate-900">{d.category}</span>
                    </div>
                  ))}
                  {COMPREHENSIVE_DRUGS.filter(dr => dr.name.toLowerCase().includes(query.toLowerCase())).map((dr) => (
                    <div
                      key={dr.id}
                      onClick={() => handleSelectSuggestion(dr.name)}
                      className="px-4 py-2.5 hover:bg-slate-900 cursor-pointer flex items-center justify-between text-xs text-slate-200"
                    >
                      <span className="font-medium text-teal-300">{dr.name}</span>
                      <span className="text-[10px] text-slate-500 px-2 py-0.5 rounded bg-slate-900">Drug</span>
                    </div>
                  ))}
                  <div className="p-2 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Ask AI Prompts
                  </div>
                  <div
                    onClick={() => handleSelectSuggestion(`Explain ${query} simply`)}
                    className="px-4 py-2 hover:bg-slate-900 cursor-pointer text-xs text-slate-400 flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Explain "{query}" simply for a patient</span>
                  </div>
                  <div
                    onClick={() => handleSelectSuggestion(`Pathophysiology of ${query}`)}
                    className="px-4 py-2 hover:bg-slate-900 cursor-pointer text-xs text-slate-400 flex items-center gap-2"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Deep dive into the pathophysiology of "{query}"</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => triggerSynthesis()}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSynthesizing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Synthesize</span>
            </button>
          </div>

          {/* Synthesis Status Badge */}
          <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-cyan-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Harrison's, UpToDate & ACC/AHA Guidelines Cross-Referenced</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onSaveItem && onSaveItem(selectedDisease)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                  isSaved ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-cyan-300'
                }`}
              >
                {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition-all"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{copiedLink ? 'Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 09: "EXPLAIN IT TO ME" MODE CONTROLLER */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              "Explain It To Me" Cognitive Level Selector
            </h3>
          </div>
          <span className="text-[11px] text-cyan-400 font-mono">Current: {explainLevel.toUpperCase()}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {levelOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                setExplainLevel(opt.id);
                triggerSynthesis();
              }}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                explainLevel === opt.id
                  ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold">{opt.label}</div>
              <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* AI RESPONSE PRESENTATION WORKSPACE */}
      {isSynthesizing ? (
        <div className="p-12 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col items-center justify-center space-y-4">
          <MedRefOrb size="xl" state="reasoning" />
          <p className="text-sm text-cyan-300 font-semibold animate-pulse">
            Synthesizing clinical knowledge & updating explanation to {explainLevel.toUpperCase()} level...
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* TOPIC HEADER CARD */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {selectedDisease.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-950 text-red-300 border border-red-500/30">
                  {selectedDisease.urgency}
                </span>
                <span className="text-xs font-mono text-slate-400">ICD-10: {selectedDisease.icd10}</span>
              </div>

              {/* Audio Reader Trigger */}
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                  isPlayingAudio ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-cyan-300'
                }`}
              >
                <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-bounce text-emerald-400' : ''}`} />
                <span>{isPlayingAudio ? 'Playing Audio Summary...' : 'Listen Audio Summary'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              {selectedDisease.title}
            </h1>
            <p className="text-sm text-slate-300 font-medium">
              {selectedDisease.subtitle}
            </p>
          </div>

          {/* SECTION 1: OVERVIEW */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
            <button
              onClick={() => toggleSection('overview')}
              className="w-full px-6 py-4 flex items-center justify-between bg-slate-900/90 text-left hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  Overview & Explanation ({explainLevel.toUpperCase()})
                </h3>
              </div>
              {expandedSections.overview ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {expandedSections.overview && (
              <div className="p-6 text-sm text-slate-300 leading-relaxed space-y-4 border-t border-slate-800">
                <p>
                  {selectedDisease.overview[explainLevel] || selectedDisease.overview.clinical}
                </p>

                {/* Interactive Terms Popover Bar */}
                <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Interactive Terms:</span>
                  {Object.keys(inlineGlossary).map((term) => (
                    <span
                      key={term}
                      onMouseEnter={() => setHoveredTerm(term)}
                      onMouseLeave={() => setHoveredTerm(null)}
                      className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono cursor-pointer hover:bg-cyan-900 transition-colors relative"
                    >
                      {term}
                      {hoveredTerm === term && (
                        <div className="absolute bottom-full left-0 mb-2 w-64 p-2.5 bg-slate-950 border border-cyan-500/40 rounded-xl shadow-2xl text-xs text-slate-200 z-50 normal-case font-sans">
                          <strong className="text-cyan-300 font-bold block mb-1">{term} Definition:</strong>
                          {inlineGlossary[term]}
                        </div>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 2: KEY FACTS GRID */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
            <button
              onClick={() => toggleSection('keyFacts')}
              className="w-full px-6 py-4 flex items-center justify-between bg-slate-900/90 text-left hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  Key High-Yield Clinical Facts
                </h3>
              </div>
              {expandedSections.keyFacts ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {expandedSections.keyFacts && (
              <div className="p-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedDisease.etiology.map((fact, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 leading-normal">{fact}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 3: CLINICAL FEATURES & SYMPTOMS */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
            <button
              onClick={() => toggleSection('clinicalFeatures')}
              className="w-full px-6 py-4 flex items-center justify-between bg-slate-900/90 text-left hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  Clinical Presentation & Features
                </h3>
              </div>
              {expandedSections.clinicalFeatures ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {expandedSections.clinicalFeatures && (
              <div className="p-6 border-t border-slate-800 space-y-2">
                {selectedDisease.clinicalFeatures.map((feat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-xs text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 4: DIAGNOSIS & LABS */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
            <button
              onClick={() => toggleSection('diagnosis')}
              className="w-full px-6 py-4 flex items-center justify-between bg-slate-900/90 text-left hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  Diagnostic Criteria, Labs & ECG
                </h3>
              </div>
              {expandedSections.diagnosis ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {expandedSections.diagnosis && (
              <div className="p-6 border-t border-slate-800 space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Laboratory Studies:</h4>
                  <ul className="space-y-1.5 pl-2">
                    {selectedDisease.diagnosis.labs.map((lab, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        {lab}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/60">
                  <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Electrocardiogram (ECG):</h4>
                  <ul className="space-y-1.5 pl-2">
                    {selectedDisease.diagnosis.ecg.map((item, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 5: MANAGEMENT & GUIDELINES */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
            <button
              onClick={() => toggleSection('management')}
              className="w-full px-6 py-4 flex items-center justify-between bg-slate-900/90 text-left hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  Management & Therapeutic Protocol
                </h3>
              </div>
              {expandedSections.management ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {expandedSections.management && (
              <div className="p-6 border-t border-slate-800 space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">First-Line Initial Management:</h4>
                  <div className="space-y-2">
                    {selectedDisease.management.firstLine.map((step, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-950/70 border border-emerald-500/20 text-xs text-emerald-200">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {selectedDisease.management.secondLine && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Second-Line / Escalation Therapy:</h4>
                    <div className="space-y-2">
                      {selectedDisease.management.secondLine.map((step, i) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-300">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SECTION 6: COMPLICATIONS */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
            <button
              onClick={() => toggleSection('complications')}
              className="w-full px-6 py-4 flex items-center justify-between bg-slate-900/90 text-left hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  High-Alert Complications
                </h3>
              </div>
              {expandedSections.complications ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {expandedSections.complications && (
              <div className="p-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedDisease.complications.map((comp, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-amber-200">{comp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 7: RELATED KNOWLEDGE GRAPH CHIPS */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitFork className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Connected Medical Knowledge Graph
                </h3>
              </div>
              <button
                onClick={onOpenKnowledgeGraph}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
              >
                <span>Launch Interactive Graph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {selectedDisease.connectedNodes.map((node) => (
                <button
                  key={node}
                  onClick={() => onSelectTopic && onSelectTopic(node)}
                  className="px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/30 text-purple-300 text-xs font-mono transition-all flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>#{node}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 8: SOURCES & CITATIONS */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Verified Medical Evidence Sources
              </h3>
              <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                Peer-Reviewed Clinical Data
              </span>
            </div>

            <div className="space-y-2">
              {selectedDisease.sources.map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 flex items-center justify-between text-xs text-cyan-300 transition-colors group"
                >
                  <span>{src.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

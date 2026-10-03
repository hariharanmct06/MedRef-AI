import React, { useState } from 'react';
import { BookOpen, Flame, CheckCircle2, RotateCw, Award, Clock, ArrowRight, Zap, Play, Check } from 'lucide-react';
import { LEARNING_PATHS, FLASHCARDS_DECK, QUIZ_QUESTIONS } from '../../data/medrefData';

export default function LearnView({ onOpenSearchWithQuery }) {
  const [activeTab, setActiveTab] = useState('paths'); // paths | flashcards | quiz | revision
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [revisionTime, setRevisionTime] = useState(10); // 5 | 10 | 20 | 30 min
  const [revisionActive, setRevisionActive] = useState(false);

  const currentFlashcard = FLASHCARDS_DECK[cardIndex] || FLASHCARDS_DECK[0];
  const currentQuiz = QUIZ_QUESTIONS[quizIndex] || QUIZ_QUESTIONS[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % FLASHCARDS_DECK.length);
  };

  const handleQuizAnswer = (idx) => {
    setSelectedAnswerIndex(idx);
  };

  const handleNextQuiz = () => {
    setSelectedAnswerIndex(null);
    setQuizIndex((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
  };

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              Medical Learning & Exam Ecosystem
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Structured curriculum paths, active recall flashcards, clinical question bank, and rapid exam revision mode.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('paths')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'paths' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Learning Paths
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'flashcards' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Active Flashcards
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'quiz' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Clinical Quiz
          </button>
          <button
            onClick={() => setActiveTab('revision')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
              activeTab === 'revision' ? 'bg-amber-400 text-slate-950 shadow font-bold' : 'text-amber-400 hover:text-amber-300'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Rapid Revision
          </button>
        </div>
      </div>

      {/* TAB 1: LEARNING PATHS */}
      {activeTab === 'paths' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LEARNING_PATHS.map((path) => (
            <div key={path.id} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                    Curriculum Path
                  </span>
                  <span className="text-xs font-bold text-slate-300">{path.progress}%</span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-100">{path.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{path.description}</p>

                {/* Progress Bar */}
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${path.progress}%` }} />
                </div>

                {/* Topics Checklist */}
                <div className="space-y-1.5 pt-2">
                  {path.topics.map((top, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/40">
                      <span className={top.completed ? 'text-slate-300 line-through opacity-70' : 'text-slate-200'}>
                        {top.title}
                      </span>
                      {top.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <span className="w-2 h-2 rounded-full border border-slate-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenSearchWithQuery(path.title)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 text-xs font-bold transition-all"
              >
                Continue {path.title}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: ACTIVE RECALL FLASHCARDS */}
      {activeTab === 'flashcards' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Card {cardIndex + 1} of {FLASHCARDS_DECK.length}</span>
            <span className="text-cyan-400 font-semibold">{currentFlashcard.category}</span>
          </div>

          {/* Interactive Flashcard */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-700 shadow-2xl min-h-[260px] flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:scale-[1.01]"
          >
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-4">
              {isFlipped ? 'Answer & Explanation' : 'Tap Card to Flip'}
            </span>

            <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-relaxed">
              {isFlipped ? currentFlashcard.answer : currentFlashcard.question}
            </h3>

            {isFlipped && (
              <p className="text-xs text-slate-400 mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 max-w-lg">
                {currentFlashcard.explanation}
              </p>
            )}
          </div>

          {/* Self-Rating Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleNextCard}
              className="px-4 py-2.5 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/30 text-xs font-bold transition-all"
            >
              Need Review
            </button>
            <button
              onClick={handleNextCard}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all"
            >
              Good
            </button>
            <button
              onClick={handleNextCard}
              className="px-4 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all"
            >
              Mastered!
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: CLINICAL QUIZ */}
      {activeTab === 'quiz' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-cyan-400 uppercase tracking-wider">{currentQuiz.category}</span>
              <span className="text-slate-400">Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
              {currentQuiz.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5 pt-2">
              {currentQuiz.options.map((opt, idx) => {
                const isSelected = selectedAnswerIndex === idx;
                const isCorrect = idx === currentQuiz.correctIndex;
                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                if (selectedAnswerIndex !== null) {
                  if (isCorrect) btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200';
                  else if (isSelected && !isCorrect) btnStyle = 'bg-red-950 border-red-500 text-red-200';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(idx)}
                    disabled={selectedAnswerIndex !== null}
                    className={`w-full p-3.5 rounded-xl border text-xs text-left font-medium transition-all ${btnStyle}`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation */}
            {selectedAnswerIndex !== null && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-in fade-in">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Clinical Rationale & Explanation:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentQuiz.explanation}
                </p>
                <button
                  onClick={handleNextQuiz}
                  className="mt-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all"
                >
                  Next Question
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: SECTION 16 - RAPID EXAM REVISION MODE */}
      {activeTab === 'revision' && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/40 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-400">
                <Zap className="w-5 h-5" />
                <h2 className="text-xl font-extrabold text-slate-100">Rapid Exam Revision Sprint</h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Distraction-free high-yield board revision session tuned to your selected time window.
              </p>
            </div>

            {/* Time Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Sprint Duration:</span>
              {[5, 10, 20, 30].map((t) => (
                <button
                  key={t}
                  onClick={() => setRevisionTime(t)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                    revisionTime === t
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.4)]'
                      : 'bg-slate-950 text-slate-300 border-slate-800'
                  }`}
                >
                  {t} min
                </button>
              ))}
            </div>
          </div>

          {/* Revision High-Yield Feed */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              High-Yield Revision Digest ({revisionTime} Minute Sprint)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase">Cardiology Key Fact</span>
                <h4 className="text-xs font-bold text-slate-100">STEMI 90-Min PCI Rule</h4>
                <p className="text-xs text-slate-300">Door-to-balloon time ≤90 mins; MONA protocol; Aspirin 325mg chewed immediately.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase">Pharmacology Pearl</span>
                <h4 className="text-xs font-bold text-slate-100">ACEi 36-Hr Entresto Washout</h4>
                <p className="text-xs text-slate-300">36-hour required gap when switching Lisinopril to Sacubitril/Valsartan to avoid angioedema.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase">Emergency Protocol</span>
                <h4 className="text-xs font-bold text-slate-100">DKA Potassium Safety Rule</h4>
                <p className="text-xs text-slate-300">Never start IV insulin drip if K+ &lt; 3.3 mEq/L. Replete K+ first to avoid fatal arrhythmia.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase">Pulmonology Criteria</span>
                <h4 className="text-xs font-bold text-slate-100">Wells' PE Rule &amp; D-Dimer</h4>
                <p className="text-xs text-slate-300">Wells score &le;1.5 = PE unlikely; check D-dimer. Score &gt;6 = PE likely; proceed straight to CTPA.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

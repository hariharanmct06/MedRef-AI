import React, { useState, useEffect } from 'react';
import { Mic, X, Sparkles, Check } from 'lucide-react';
import MedRefOrb from '../Common/MedRefOrb';

export default function VoiceSearchModal({ isOpen, onClose, onVoiceQuery }) {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsListening(true);
      setTranscript('');

      const t1 = setTimeout(() => setTranscript('Explain myocardial infarction...'), 800);
      const t2 = setTimeout(() => setTranscript('Explain myocardial infarction guidelines and PCI timing'), 1800);
      const t3 = setTimeout(() => {
        setIsListening(false);
      }, 2500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (transcript) {
      onVoiceQuery(transcript);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-2xl space-y-6 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-100"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="pt-4 flex flex-col items-center justify-center space-y-4">
          <MedRefOrb size="xl" state={isListening ? 'listening' : 'reasoning'} />
          <div>
            <h3 className="text-lg font-bold text-slate-100">
              {isListening ? 'Listening to Clinical Query...' : 'Speech Processed'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Speak clearly into your microphone</p>
          </div>
        </div>

        {/* Live Transcript Display Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 min-h-[70px] flex items-center justify-center text-sm font-mono text-cyan-300">
          {transcript || <span className="text-slate-600 animate-pulse">Say something like "Explain STEMI guidelines..."</span>}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsListening(true);
              setTranscript('');
            }}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Retry Speech
          </button>
          <button
            onClick={handleSubmit}
            disabled={!transcript}
            className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all disabled:opacity-50"
          >
            Search Voice Query
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Sparkles, Send, FileText, ArrowRight, ShieldCheck, AlertCircle, Bot, User, CornerDownRight, ExternalLink } from 'lucide-react';
import { MOCK_RAG_QUESTIONS } from '../../data/demoData';

export default function AskRecordsView({ documents, onSelectDocument }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello Alex! I am MedRef AI. I can search across all your uploaded medical documents, blood panels, and prescriptions to answer questions grounded strictly in your personal records.",
      sources: []
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSendQuery = (queryText) => {
    const text = queryText || inputQuery;
    if (!text.trim()) return;

    // Add user message
    const userMsg = { id: `user-${Date.now()}`, sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsSearching(true);

    setTimeout(() => {
      const qLower = text.toLowerCase();
      let responseText = "";
      let matchedSources = [];

      if (qLower.includes('blood test') || qLower.includes('laboratory') || qLower.includes('recent lab')) {
        const bloodDocs = documents.filter(d => d.type.includes('Blood') || d.category === 'Reports');
        if (bloodDocs.length > 0) {
          responseText = `Based on your records, you have taken ${bloodDocs.length} blood test panels:\n\n` +
            bloodDocs.map(d => `• **${d.title}** (${d.date}) at ${d.facility}. Key extracted results include ${d.extractedData.metrics.slice(0, 2).map(m => `${m.name}: ${m.value} ${m.unit}`).join(', ')}.`).join('\n\n');
          matchedSources = bloodDocs;
        } else {
          responseText = "I couldn't find that information in your uploaded records.";
        }
      } else if (qLower.includes('hba1c') || qLower.includes('a1c') || qLower.includes('sugar')) {
        const hba1cDocs = documents.filter(d => d.extractedData?.metrics?.some(m => m.name.toLowerCase().includes('hba1c')));
        if (hba1cDocs.length > 0) {
          const latest = hba1cDocs[hba1cDocs.length - 1];
          const earlier = hba1cDocs[0];
          const latestVal = latest.extractedData.metrics.find(m => m.name.toLowerCase().includes('hba1c'));
          const earlierVal = earlier.extractedData.metrics.find(m => m.name.toLowerCase().includes('hba1c'));

          responseText = `Your most recent HbA1c test was recorded on **${latest.date}** in the *${latest.title}*. Value: **${latestVal.value}%** (${latestVal.status}).\n\nFor comparison, your earlier test on **${earlier.date}** recorded **${earlierVal.value}%**.`;
          matchedSources = hba1cDocs;
        } else {
          responseText = "I couldn't find that information in your uploaded records.";
        }
      } else if (qLower.includes('medication') || qLower.includes('prescription') || qLower.includes('drugs')) {
        const rxDocs = documents.filter(d => d.extractedData?.medications?.length > 0);
        if (rxDocs.length > 0) {
          const allMeds = rxDocs.flatMap(d => d.extractedData.medications);
          responseText = `Your records show the following active prescribed medications:\n\n` +
            allMeds.map(m => `• **${m.name} ${m.dosage}**: ${m.frequency} (${m.instructions}).`).join('\n');
          matchedSources = rxDocs;
        } else {
          responseText = "I couldn't find that information in your uploaded records.";
        }
      } else if (qLower.includes('blood pressure') || qLower.includes('bp') || qLower.includes('hypertension')) {
        const bpDocs = documents.filter(d => 
          d.extractedData?.metrics?.some(m => m.name.toLowerCase().includes('blood pressure')) ||
          d.summary?.toLowerCase().includes('blood pressure')
        );
        if (bpDocs.length > 0) {
          responseText = `Blood pressure readings were recorded in **${bpDocs.length}** document(s):\n\n` +
            bpDocs.map(d => {
              const bp = d.extractedData.metrics.find(m => m.name.toLowerCase().includes('blood pressure'));
              return `• **${d.date} (${d.facility})**: ${bp ? `${bp.value} mmHg (${bp.status})` : 'Mentioned in clinical notes'}.`;
            }).join('\n');
          matchedSources = bpDocs;
        } else {
          responseText = "I couldn't find that information in your uploaded records.";
        }
      } else {
        // Fallback RAG search across summary and notes
        const matched = documents.filter(d => 
          d.title.toLowerCase().includes(qLower) || 
          d.summary?.toLowerCase().includes(qLower) ||
          d.extractedData?.doctorNotes?.toLowerCase().includes(qLower)
        );
        if (matched.length > 0) {
          responseText = `I found **${matched.length}** document(s) matching your query:\n\n` +
            matched.map(d => `• **${d.title}** (${d.date}): ${d.summary}`).join('\n');
          matchedSources = matched;
        } else {
          responseText = "I couldn't find that information in your uploaded records.";
        }
      }

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: responseText,
          sources: matchedSources
        }
      ]);
      setIsSearching(false);
    }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Grounded RAG Retrieval</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Ask My Medical Records</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Find information across your uploaded medical documents. Answers are derived strictly from your files.
        </p>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Suggested Questions:</span>
        <div className="flex flex-wrap gap-2">
          {MOCK_RAG_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(q)}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-cyan-300 transition-all flex items-center gap-1.5"
            >
              <CornerDownRight className="w-3 h-3 text-cyan-400" />
              <span>{q}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Feed Container */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 min-h-[400px] max-h-[550px] overflow-y-auto shadow-2xl flex flex-col justify-between">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs sm:text-sm ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl max-w-2xl space-y-3 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-tr-none'
                    : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Sources list */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider flex items-center gap-1">
                      <FileText className="w-3 h-3" /> Grounded Sources ({msg.sources.length}):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.map((srcDoc) => (
                        <button
                          key={srcDoc.id}
                          onClick={() => onSelectDocument(srcDoc)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold hover:bg-cyan-500/20 transition-colors flex items-center gap-1.5"
                        >
                          <span>Source: {srcDoc.title} ({srcDoc.date})</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                  A
                </div>
              )}
            </div>
          ))}

          {isSearching && (
            <div className="flex gap-3 text-xs text-slate-400 items-center">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 italic">
                Searching uploaded records and compiling citations...
              </div>
            </div>
          )}
        </div>

        {/* Input Text Form */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSendQuery(); }}
          className="pt-4 border-t border-slate-800 flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="Ask anything about your uploaded medical records..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isSearching}
            className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

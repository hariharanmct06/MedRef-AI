import React, { useState } from 'react';
import { GitFork, Search, Sparkles, ArrowRight, Activity, Pill, Eye, Info } from 'lucide-react';
import MedRefOrb from '../Common/MedRefOrb';

export default function KnowledgeGraphView({ onSelectTopic }) {
  const [selectedNode, setSelectedNode] = useState('myocardial-infarction');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Node database
  const nodes = [
    { id: 'myocardial-infarction', label: 'Myocardial Infarction', type: 'disease', category: 'Cardiology', x: 400, y: 250, size: 28 },
    { id: 'chest-pain', label: 'Substernal Chest Pain', type: 'symptom', category: 'Cardiology', x: 200, y: 140, size: 20 },
    { id: 'troponin', label: 'Cardiac Troponin I', type: 'biomarker', category: 'Labs', x: 220, y: 360, size: 22 },
    { id: 'ecg-stemi', label: 'ST Elevation (STEMI)', type: 'ecg', category: 'Cardiology', x: 400, y: 100, size: 22 },
    { id: 'lisinopril', label: 'Lisinopril (ACEi)', type: 'drug', category: 'Pharmacology', x: 600, y: 150, size: 22 },
    { id: 'aspirin', label: 'Aspirin (Antiplatelet)', type: 'drug', category: 'Pharmacology', x: 620, y: 350, size: 22 },
    { id: 'heart-failure', label: 'Congestive Heart Failure', type: 'disease', category: 'Cardiology', x: 580, y: 260, size: 24 },
    { id: 'cardiogenic-shock', label: 'Cardiogenic Shock', type: 'complication', category: 'Emergency', x: 400, y: 400, size: 22 },
    { id: 'metformin', label: 'Metformin', type: 'drug', category: 'Pharmacology', x: 150, y: 250, size: 18 }
  ];

  // Connections / Links
  const links = [
    { source: 'myocardial-infarction', target: 'chest-pain', label: 'Presents with' },
    { source: 'myocardial-infarction', target: 'troponin', label: 'Elevates' },
    { source: 'myocardial-infarction', target: 'ecg-stemi', label: 'Manifests on ECG' },
    { source: 'myocardial-infarction', target: 'lisinopril', label: 'Treated with (GDMT)' },
    { source: 'myocardial-infarction', target: 'aspirin', label: 'Preventative antiplatelet' },
    { source: 'myocardial-infarction', target: 'heart-failure', label: 'Leads to remodeling' },
    { source: 'myocardial-infarction', target: 'cardiogenic-shock', label: 'Severe complication' },
    { source: 'troponin', target: 'cardiogenic-shock', label: 'Correlates with severity' }
  ];

  const activeNodeData = nodes.find(n => n.id === selectedNode) || nodes[0];

  const filteredNodes = nodes.filter(n => {
    const matchesCat = categoryFilter === 'all' || n.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch = n.label.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              Medical Knowledge Graph
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Interactive relationship map linking clinical pathologies, biomarkers, drugs, and ECG findings.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter nodes..."
              className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Pharmacology">Pharmacology</option>
            <option value="Labs">Labs & Biomarkers</option>
            <option value="Emergency">Emergency</option>
          </select>
        </div>
      </div>

      {/* Main Graph Canvas & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive SVG Canvas */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-950/90 border border-slate-800 relative overflow-hidden min-h-[420px] flex items-center justify-center">
          {/* Background Grid Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

          {/* SVG Graph Visualization */}
          <svg className="w-full h-[400px] z-10 select-none" viewBox="0 0 800 500">
            {/* Draw Links */}
            {links.map((link, idx) => {
              const sourceNode = nodes.find(n => n.id === link.source);
              const targetNode = nodes.find(n => n.id === link.target);
              if (!sourceNode || !targetNode) return null;

              const isConnected = selectedNode === link.source || selectedNode === link.target;

              return (
                <g key={idx}>
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={isConnected ? '#c084fc' : '#334155'}
                    strokeWidth={isConnected ? 2.5 : 1}
                    strokeDasharray={isConnected ? 'none' : '4 4'}
                    className="transition-all duration-300"
                  />
                  {/* Midpoint Label */}
                  {isConnected && (
                    <text
                      x={(sourceNode.x + targetNode.x) / 2}
                      y={(sourceNode.y + targetNode.y) / 2 - 6}
                      fill="#e9d5ff"
                      fontSize="9"
                      textAnchor="middle"
                      className="font-mono font-bold"
                    >
                      {link.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Draw Nodes */}
            {filteredNodes.map((node) => {
              const isSelected = selectedNode === node.id;
              let fill = '#0284c7';
              if (node.type === 'drug') fill = '#0d9488';
              if (node.type === 'biomarker') fill = '#6366f1';
              if (node.type === 'complication') fill = '#d97706';
              if (node.type === 'ecg') fill = '#06b6d4';

              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedNode(node.id)}
                  className="cursor-pointer group"
                >
                  {/* Selection Ripple Circle */}
                  {isSelected && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.size + 10}
                      fill="none"
                      stroke="#c084fc"
                      strokeWidth="2"
                      className="animate-ping opacity-75"
                    />
                  )}

                  {/* Main Node Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size}
                    fill={fill}
                    stroke={isSelected ? '#ffffff' : '#0f172a'}
                    strokeWidth={isSelected ? 3 : 2}
                    className="transition-all duration-300 hover:scale-110 shadow-xl"
                  />

                  {/* Inner Icon / Text */}
                  <text
                    x={node.x}
                    y={node.y + node.size + 14}
                    fill={isSelected ? '#c084fc' : '#e2e8f0'}
                    fontSize="11"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    textAnchor="middle"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Node Focus Detail Panel */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 px-2.5 py-1 rounded-full bg-purple-950 border border-purple-500/30">
                {activeNodeData.category} • {activeNodeData.type.toUpperCase()}
              </span>
              <MedRefOrb size="sm" state="idle" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-100">{activeNodeData.label}</h3>
              <p className="text-xs text-slate-400 mt-1">
                Connected topic in MedRef AI Knowledge Matrix.
              </p>
            </div>

            {/* Direct Connections List */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Direct Connected Relationships:</h4>
              <div className="space-y-1.5">
                {links.filter(l => l.source === selectedNode || l.target === selectedNode).map((l, i) => {
                  const targetId = l.source === selectedNode ? l.target : l.source;
                  const targetObj = nodes.find(n => n.id === targetId);
                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedNode(targetId)}
                      className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 cursor-pointer border border-slate-800 flex items-center justify-between text-xs text-slate-300 transition-colors"
                    >
                      <span className="text-purple-300 font-medium">{targetObj?.label}</span>
                      <span className="text-[10px] text-slate-500 italic">{l.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectTopic && onSelectTopic(activeNodeData.label)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <span>Open Full Reference for {activeNodeData.label}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

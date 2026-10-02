import React from 'react';
import { 
  FileText, 
  GitCommit, 
  ArrowLeftRight, 
  Pill, 
  Sparkles, 
  Calendar, 
  BookOpen, 
  UploadCloud, 
  ChevronRight, 
  CheckCircle2, 
  Activity,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Eye,
  ShieldCheck
} from 'lucide-react';

export default function DashboardView({ 
  documents, 
  setCurrentView, 
  onSelectDocument,
  onOpenUpload 
}) {
  const reportsCount = documents.filter(d => d.category === 'Reports' || d.type.includes('report') || d.type.includes('Blood')).length;
  const prescriptionsCount = documents.filter(d => d.category === 'Prescriptions' || d.type.includes('Prescription')).length;
  const eventsCount = documents.length * 3 + 3; // timeline events calculation

  const quickActions = [
    { title: "Upload Document", desc: "Scan reports & prescriptions", icon: UploadCloud, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20", view: "upload" },
    { title: "Compare Reports", desc: "Side-by-side metric shifts", icon: ArrowLeftRight, color: "text-blue-400 bg-blue-500/10 border-blue-500/20", view: "compare" },
    { title: "Ask My Records", desc: "Natural language search", icon: Sparkles, color: "text-purple-400 bg-purple-500/10 border-purple-500/20", view: "ask-ai" },
    { title: "My Medications", desc: "Schedules & dosages", icon: Pill, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", view: "medications" },
    { title: "Prepare Visit", desc: "Doctor brief generator", icon: Calendar, color: "text-amber-400 bg-amber-500/10 border-amber-500/20", view: "appointments" },
    { title: "Medical Reference", desc: "Search terms & ranges", icon: BookOpen, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20", view: "reference" }
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Good morning, Alex</span>
            <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Your Medical Information. Clearly Connected.
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 self-start md:self-auto"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload New Document</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Documents</span>
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">{documents.length}</div>
          <div className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3" /> Indexed & Organized
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Reports</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">{reportsCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Lab & Blood Panels</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Prescriptions</span>
            <Pill className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">{prescriptionsCount}</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-medium">Active Regimens Recorded</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Timeline Events</span>
            <GitCommit className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">{eventsCount}</div>
          <div className="text-[11px] text-purple-300 mt-1">Chronological Entries</div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <span>Quick Actions</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                onClick={() => setCurrentView(action.view)}
                className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:bg-slate-900/80 hover:border-cyan-500/40 transition-all text-left flex items-start justify-between group shadow-sm"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`p-2.5 rounded-xl border ${action.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{action.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors mt-1" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Recent Activity & Medical Journey Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Recent Activity & Documents</span>
            </h2>
            <button
              onClick={() => setCurrentView('records')}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-medium"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {documents.slice(0, 4).map((doc) => (
              <div 
                key={doc.id}
                onClick={() => onSelectDocument(doc)}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/60 text-cyan-400 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {doc.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span>{doc.date}</span>
                      <span>•</span>
                      <span>{doc.facility}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium hidden sm:inline-flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Extracted & Verified
                  </span>
                  <button className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compact Medical Journey Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-purple-400" />
              <span>Medical Journey</span>
            </h2>
            <button
              onClick={() => setCurrentView('journey')}
              className="text-xs text-cyan-400 hover:underline font-medium"
            >
              Full Timeline
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="text-xs font-semibold text-cyan-400">2026 Timeline Highlights</div>
            
            <div className="relative pl-4 space-y-4 border-l border-slate-800">
              {documents.slice(0, 4).map((doc, idx) => (
                <div key={doc.id} className="relative group">
                  <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-navy-950" />
                  <div className="text-[11px] text-slate-400 font-medium">{doc.date}</div>
                  <div className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition-colors mt-0.5">
                    {doc.title}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 truncate">{doc.summary}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

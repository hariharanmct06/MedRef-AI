import React, { useState } from 'react';
import { Settings, User, ShieldCheck, Database, Bell, Cpu, Trash2, AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SettingsView({ demoMode, setDemoMode, onResetAllData }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmedText, setConfirmedText] = useState('');
  
  // State preferences
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [reminderNotifs, setReminderNotifs] = useState(true);
  const [strictGroundedAI, setStrictGroundedAI] = useState(true);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'privacy', label: 'Privacy', icon: ShieldCheck },
    { id: 'data', label: 'Data Management', icon: Database },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'ai', label: 'AI Preferences', icon: Cpu }
  ];

  const handleDeleteAllConfirm = () => {
    if (confirmedText === 'DELETE') {
      onResetAllData();
      setShowDeleteModal(false);
      setConfirmedText('');
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold mb-2">
          <Settings className="w-3.5 h-3.5 text-cyan-400" />
          <span>System Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your account profile, privacy parameters, AI configurations, and medical data.
        </p>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-800 pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20' 
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">User Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  defaultValue="Alex Vance"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-medium focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  defaultValue="alex.vance@example.com"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-medium focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Data Management Tab */}
        {(activeTab === 'data' || activeTab === 'privacy') && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Demo Data Toggle</h3>
              <p className="text-xs text-slate-400">
                Pre-load 5 fictional medical documents (blood reports, doctor notes, prescriptions) to demonstrate dashboard features.
              </p>
              <button
                onClick={() => setDemoMode(!demoMode)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                  demoMode 
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>{demoMode ? 'Demo Mode Active (Reset Demo Data)' : 'Enable Demo Mode'}</span>
              </button>
            </div>

            <div className="pt-6 border-t border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <Trash2 className="w-4 h-4" /> Danger Zone: Delete Medical Data
              </h3>
              <p className="text-xs text-slate-400">
                Permanently purge all uploaded medical records, parsed lab values, medication schedules, and chat history.
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Delete All Medical Data
              </button>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Notification Preferences</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer">
                <div>
                  <span className="font-semibold text-white block">Medication Reminders</span>
                  <span className="text-slate-400 text-[11px]">Receive notifications for scheduled medication doses.</span>
                </div>
                <input
                  type="checkbox"
                  checked={reminderNotifs}
                  onChange={(e) => setReminderNotifs(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer">
                <div>
                  <span className="font-semibold text-white block">Report Processing Updates</span>
                  <span className="text-slate-400 text-[11px]">Notify when document extraction completes.</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifs}
                  onChange={(e) => setEmailNotifs(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500"
                />
              </label>
            </div>
          </div>
        )}

        {/* AI Preferences Tab */}
        {activeTab === 'ai' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Grounding & RAG Preferences</h3>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-semibold text-white block">Strict Grounded Answers Only</span>
                  <span className="text-slate-400 text-[11px]">Restrict AI replies strictly to verified document contents without external hallucinations.</span>
                </div>
                <input
                  type="checkbox"
                  checked={strictGroundedAI}
                  onChange={(e) => setStrictGroundedAI(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500"
                />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Delete Data Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-navy-900 border border-rose-500/40 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-white">Delete All Medical Data?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This action will permanently remove all documents, extracted lab metrics, medications, and timeline history. Type <span className="font-mono font-bold text-rose-400">DELETE</span> to confirm.
            </p>
            <input
              type="text"
              placeholder="Type DELETE to confirm"
              value={confirmedText}
              onChange={(e) => setConfirmedText(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-rose-300 text-xs font-mono font-bold focus:border-rose-500 focus:outline-none"
            />
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                disabled={confirmedText !== 'DELETE'}
                onClick={handleDeleteAllConfirm}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold disabled:opacity-40 transition-colors"
              >
                Permanently Delete Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

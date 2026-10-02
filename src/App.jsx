import React, { useState } from 'react';
import LandingView from './components/LandingPage/LandingView';
import Sidebar from './components/Navigation/Sidebar';
import BottomNav from './components/Navigation/BottomNav';
import Header from './components/Navigation/Header';
import SafetyBanner from './components/Navigation/SafetyBanner';
import DashboardView from './components/Dashboard/DashboardView';
import UploadScannerView from './components/Scanner/UploadScannerView';
import ReportViewerModal from './components/ReportViewer/ReportViewerModal';
import CompareReportsView from './components/Comparison/CompareReportsView';
import MedicalJourneyView from './components/Journey/MedicalJourneyView';
import AskRecordsView from './components/AskRecords/AskRecordsView';
import MedicationOrganizerView from './components/Medications/MedicationOrganizerView';
import DoctorVisitView from './components/DoctorVisit/DoctorVisitView';
import MedicalReferenceView from './components/Reference/MedicalReferenceView';
import PrivacyView from './components/Privacy/PrivacyView';
import SettingsView from './components/Settings/SettingsView';
import GlobalSearchModal from './components/Navigation/GlobalSearchModal';

import { DEMO_DOCUMENTS } from './data/demoData';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [demoMode, setDemoMode] = useState(true);
  const [documents, setDocuments] = useState(DEMO_DOCUMENTS);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [referenceInitialQuery, setReferenceInitialQuery] = useState('');

  // Add newly uploaded document
  const handleAddDocument = (newDoc) => {
    setDocuments(prev => [newDoc, ...prev]);
  };

  // Reset data callback
  const handleResetAllData = () => {
    setDocuments([]);
    setSelectedDocument(null);
  };

  const handleOpenReferenceWithQuery = (queryStr) => {
    setReferenceInitialQuery(queryStr);
    setCurrentView('reference');
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 font-sans flex flex-col antialiased selection:bg-cyan-500 selection:text-navy-950">
      {/* Universal Top Safety Disclaimer Banner (Shown across medical portal pages) */}
      {currentView !== 'landing' && <SafetyBanner />}

      {currentView === 'landing' ? (
        <LandingView 
          onExploreApp={() => setCurrentView('dashboard')}
          onOpenDemo={() => { setDemoMode(true); setCurrentView('dashboard'); }}
        />
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Desktop Left Sidebar Navigation */}
          <Sidebar 
            currentView={currentView}
            setCurrentView={setCurrentView}
            demoMode={demoMode}
            setDemoMode={setDemoMode}
            documentCount={documents.length}
          />

          {/* Main App Workspace */}
          <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto">
            {/* Top Workspace Header */}
            <Header 
              currentView={currentView}
              setCurrentView={setCurrentView}
              demoMode={demoMode}
              setDemoMode={setDemoMode}
              onOpenSearch={() => setIsSearchOpen(true)}
            />

            {/* Main Content Area Container */}
            <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full">
              {currentView === 'dashboard' && (
                <DashboardView
                  documents={documents}
                  setCurrentView={setCurrentView}
                  onSelectDocument={(doc) => setSelectedDocument(doc)}
                  onOpenUpload={() => setCurrentView('upload')}
                />
              )}

              {(currentView === 'records' || currentView === 'upload') && (
                <UploadScannerView
                  onAddDocument={handleAddDocument}
                  onSelectDocument={(doc) => setSelectedDocument(doc)}
                />
              )}

              {currentView === 'journey' && (
                <MedicalJourneyView
                  documents={documents}
                  onSelectDocument={(doc) => setSelectedDocument(doc)}
                />
              )}

              {currentView === 'compare' && (
                <CompareReportsView documents={documents} />
              )}

              {currentView === 'ask-ai' && (
                <AskRecordsView
                  documents={documents}
                  onSelectDocument={(doc) => setSelectedDocument(doc)}
                />
              )}

              {currentView === 'medications' && (
                <MedicationOrganizerView
                  documents={documents}
                  onSelectDocument={(doc) => setSelectedDocument(doc)}
                />
              )}

              {currentView === 'appointments' && (
                <DoctorVisitView documents={documents} />
              )}

              {currentView === 'reference' && (
                <MedicalReferenceView initialQuery={referenceInitialQuery} />
              )}

              {currentView === 'privacy' && <PrivacyView />}

              {currentView === 'settings' && (
                <SettingsView
                  demoMode={demoMode}
                  setDemoMode={(val) => {
                    setDemoMode(val);
                    if (val) setDocuments(DEMO_DOCUMENTS);
                  }}
                  onResetAllData={handleResetAllData}
                />
              )}
            </main>
          </div>

          {/* Mobile Bottom Navigation Bar */}
          <BottomNav 
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        </div>
      )}

      {/* Interactive Report Inspector / Modal */}
      {selectedDocument && (
        <ReportViewerModal
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
          onOpenReference={handleOpenReferenceWithQuery}
        />
      )}

      {/* Global Quick Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        documents={documents}
        onSelectDocument={(doc) => setSelectedDocument(doc)}
        onSelectReference={handleOpenReferenceWithQuery}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Navigation/Sidebar';
import BottomNav from './components/Navigation/BottomNav';
import Header from './components/Navigation/Header';
import SafetyBanner from './components/Navigation/SafetyBanner';

import HomeView from './components/Home/HomeView';
import AISearchWorkspace from './components/AISearch/AISearchWorkspace';
import DiseaseReferenceView from './components/Diseases/DiseaseReferenceView';
import DrugReferenceView from './components/Drugs/DrugReferenceView';
import CalculatorsView from './components/Calculators/CalculatorsView';
import AIVisionView from './components/AIVision/AIVisionView';
import KnowledgeGraphView from './components/KnowledgeGraph/KnowledgeGraphView';
import LearnView from './components/Learn/LearnView';
import LibraryView from './components/Library/LibraryView';
import ProfileView from './components/Profile/ProfileView';
import SettingsView from './components/Settings/SettingsView';

import VoiceSearchModal from './components/Modals/VoiceSearchModal';
import CommandMenuModal from './components/Modals/CommandMenuModal';

import { COMPREHENSIVE_DISEASES } from './data/medrefData';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [themeMode, setThemeMode] = useState('dark'); // dark | light
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Saved library state
  const [savedItems, setSavedItems] = useState([COMPREHENSIVE_DISEASES[0]]);

  // Listen for global Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenSearchWithQuery = (queryStr) => {
    setSearchQuery(queryStr);
    setCurrentView('ai-search');
  };

  const handleSaveItem = (itemObj) => {
    if (!savedItems.some(i => i.id === itemObj.id)) {
      setSavedItems(prev => [...prev, itemObj]);
    }
  };

  const handleRemoveSavedItem = (id) => {
    setSavedItems(prev => prev.filter(i => i.id !== id));
  };

  const handleResetAllData = () => {
    setSavedItems([]);
    setSearchQuery('');
    setCurrentView('home');
  };

  return (
    <div className={`min-h-screen flex flex-col antialiased font-sans ${
      themeMode === 'dark' 
        ? 'bg-[#050814] text-slate-100 selection:bg-cyan-500 selection:text-slate-950' 
        : 'bg-slate-50 text-slate-900 selection:bg-cyan-500 selection:text-slate-950'
    }`}>
      {/* Top Universal Safety Disclaimer Banner */}
      <SafetyBanner />

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar Navigation */}
        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          themeMode={themeMode}
          setThemeMode={setThemeMode}
          onOpenCommandMenu={() => setIsCommandOpen(true)}
        />

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto">
          {/* Header Bar */}
          <Header
            currentView={currentView}
            setCurrentView={setCurrentView}
            themeMode={themeMode}
            setThemeMode={setThemeMode}
            onOpenCommandMenu={() => setIsCommandOpen(true)}
            onOpenVoiceModal={() => setIsVoiceOpen(true)}
          />

          {/* View Container */}
          <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full">
            {currentView === 'home' && (
              <HomeView
                setCurrentView={setCurrentView}
                onOpenSearchWithQuery={handleOpenSearchWithQuery}
                onOpenVoiceModal={() => setIsVoiceOpen(true)}
                onOpenVisionWithUpload={() => setCurrentView('vision')}
                savedItemsCount={savedItems.length}
              />
            )}

            {currentView === 'ai-search' && (
              <AISearchWorkspace
                initialQuery={searchQuery}
                onSelectTopic={handleOpenSearchWithQuery}
                onOpenKnowledgeGraph={() => setCurrentView('knowledge-graph')}
                onSaveItem={handleSaveItem}
                savedItemIds={savedItems.map(i => i.id)}
              />
            )}

            {currentView === 'diseases' && (
              <DiseaseReferenceView
                onOpenSearchWithQuery={handleOpenSearchWithQuery}
              />
            )}

            {currentView === 'drugs' && (
              <DrugReferenceView
                onOpenTopic={handleOpenSearchWithQuery}
              />
            )}

            {currentView === 'calculators' && (
              <CalculatorsView />
            )}

            {currentView === 'vision' && (
              <AIVisionView
                onOpenSearchWithQuery={handleOpenSearchWithQuery}
              />
            )}

            {currentView === 'knowledge-graph' && (
              <KnowledgeGraphView
                onSelectTopic={handleOpenSearchWithQuery}
              />
            )}

            {currentView === 'learn' && (
              <LearnView
                onOpenSearchWithQuery={handleOpenSearchWithQuery}
              />
            )}

            {currentView === 'library' && (
              <LibraryView
                savedItems={savedItems}
                onOpenTopic={handleOpenSearchWithQuery}
                onRemoveSavedItem={handleRemoveSavedItem}
              />
            )}

            {currentView === 'profile' && (
              <ProfileView
                themeMode={themeMode}
                setThemeMode={setThemeMode}
                setCurrentView={setCurrentView}
              />
            )}

            {currentView === 'settings' && (
              <SettingsView
                themeMode={themeMode}
                setThemeMode={setThemeMode}
                onResetAllData={handleResetAllData}
              />
            )}
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <BottomNav
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      </div>

      {/* Voice Search Modal */}
      <VoiceSearchModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onVoiceQuery={handleOpenSearchWithQuery}
      />

      {/* Quick Command Menu Modal */}
      <CommandMenuModal
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigate={setCurrentView}
        onSelectQuery={handleOpenSearchWithQuery}
      />
    </div>
  );
}

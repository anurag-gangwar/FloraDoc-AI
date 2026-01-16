
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Scanner from './components/Scanner';
import ResultDisplay from './components/ResultDisplay';
import HistoryList from './components/HistoryList';
import PlantsLibrary from './components/PlantsLibrary';
import CollectionList from './components/CollectionList';
import { PlantAnalysis, ViewState } from './types';
import { analyzePlantImage } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('scanner');
  const [currentAnalysis, setCurrentAnalysis] = useState<PlantAnalysis | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<PlantAnalysis[]>([]);
  const [collection, setCollection] = useState<PlantAnalysis[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load history and collection on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('plant_history');
    const savedCollection = localStorage.getItem('plant_collection');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
    if (savedCollection) {
      try {
        setCollection(JSON.parse(savedCollection));
      } catch (e) {
        console.error("Failed to parse collection", e);
      }
    }
  }, []);

  const handleScan = useCallback(async (base64: string) => {
    setIsProcessing(true);
    setError(null);
    try {
      const result = await analyzePlantImage(base64);
      setCurrentAnalysis(result);
      
      const newHistory = [result, ...history].slice(0, 20); // Keep last 20
      setHistory(newHistory);
      localStorage.setItem('plant_history', JSON.stringify(newHistory));
    } catch (err: any) {
      console.error(err);
      setError("We couldn't analyze the image. Please try again with a clearer photo.");
    } finally {
      setIsProcessing(false);
    }
  }, [history]);

  const handleSaveToCollection = (analysis: PlantAnalysis) => {
    if (collection.some(item => item.id === analysis.id)) return;
    
    const newCollection = [analysis, ...collection];
    setCollection(newCollection);
    localStorage.setItem('plant_collection', JSON.stringify(newCollection));
  };

  const handleRemoveFromCollection = (id: string) => {
    const newCollection = collection.filter(item => item.id !== id);
    setCollection(newCollection);
    localStorage.setItem('plant_collection', JSON.stringify(newCollection));
  };

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your scan history?")) {
      setHistory([]);
      localStorage.removeItem('plant_history');
    }
  };

  const handleSelectHistoryItem = (item: PlantAnalysis) => {
    setCurrentAnalysis(item);
    setView('scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToView = (newView: ViewState) => {
    setView(newView);
    if (newView !== 'scanner') {
      setCurrentAnalysis(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCurrentSaved = currentAnalysis ? collection.some(item => item.id === currentAnalysis.id) : false;

  return (
    <div className="min-h-screen pb-20">
      <Header currentView={view} onViewChange={navigateToView} />
      
      <main className="max-w-5xl mx-auto px-4 pt-8 md:pt-12">
        {view === 'scanner' && (
          <>
            <div className="mb-12 text-center md:text-left animate-in fade-in duration-700">
              <h1 className="text-4xl md:text-5xl font-extrabold text-green-950 mb-4 tracking-tight">
                Keep your plants <span className="text-green-600">thriving.</span>
              </h1>
              <p className="text-lg text-green-800/70 max-w-2xl">
                Identify diseases, pests, and nutrient deficiencies in seconds. 
                Get expert recommendations tailored to your plant's specific needs.
              </p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-700 flex items-center gap-3 animate-in fade-in duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="font-medium text-sm">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-12">
              {!currentAnalysis || isProcessing ? (
                <Scanner onScan={handleScan} isProcessing={isProcessing} />
              ) : (
                <ResultDisplay 
                  analysis={currentAnalysis} 
                  onReset={() => setCurrentAnalysis(null)}
                  onSaveToCollection={handleSaveToCollection}
                  isSaved={isCurrentSaved}
                />
              )}

              <HistoryList 
                history={history} 
                onSelectItem={handleSelectHistoryItem}
                onClear={clearHistory}
              />
            </div>
          </>
        )}

        {view === 'library' && (
          <PlantsLibrary />
        )}

        {view === 'collection' && (
          <CollectionList 
            collection={collection} 
            onSelectItem={handleSelectHistoryItem}
            onRemoveItem={handleRemoveFromCollection}
          />
        )}
      </main>

      {/* Floating Action Button for mobile mobile scan */}
      {(currentAnalysis || view !== 'scanner') && !isProcessing && (
        <button 
          onClick={() => navigateToView('scanner')}
          className="md:hidden fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-2xl z-40"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default App;

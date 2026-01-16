
import React from 'react';
import { ViewState } from '../types';

interface HeaderProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  return (
    <header className="bg-white border-b border-green-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onViewChange('scanner')}
        >
          <div className="bg-green-600 p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z"/>
              <path d="M7 12c0-2.761 2.239-5 5-5s5 2.239 5 5"/>
              <path d="M12 7v10"/>
              <path d="M7 12h10"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-green-900 tracking-tight hidden sm:inline">FloraDoc AI</span>
        </div>
        <nav className="flex items-center gap-3 sm:gap-6">
          <button 
            onClick={() => onViewChange('scanner')}
            className={`text-sm font-semibold transition-colors px-2 py-1 rounded-md ${
              currentView === 'scanner' ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-green-600'
            }`}
          >
            Scanner
          </button>
          <button 
            onClick={() => onViewChange('library')}
            className={`text-sm font-semibold transition-colors px-2 py-1 rounded-md ${
              currentView === 'library' ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-green-600'
            }`}
          >
            Library
          </button>
          <button 
            onClick={() => onViewChange('collection')}
            className={`text-sm font-semibold transition-colors px-2 py-1 rounded-md ${
              currentView === 'collection' ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-green-600'
            }`}
          >
            My Garden
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

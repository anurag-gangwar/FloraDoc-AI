
import React, { useState } from 'react';
import { PLANTS_LIBRARY } from '../data/libraryData';
import { LibraryPlant } from '../types';

const PlantsLibrary: React.FC = () => {
  const [selectedPlant, setSelectedPlant] = useState<LibraryPlant | null>(null);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-green-950 mb-2">Plant Encyclopedia</h2>
        <p className="text-green-800/70">Explore common household plants and learn how to help them thrive.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLANTS_LIBRARY.map((plant) => (
          <div 
            key={plant.id}
            onClick={() => setSelectedPlant(plant)}
            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-green-50 cursor-pointer group"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={plant.image} 
                alt={plant.name} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{plant.name}</h3>
                  <p className="text-xs text-gray-500 italic">{plant.scientificName}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                  plant.careLevel === 'Easy' ? 'bg-green-100 text-green-700' :
                  plant.careLevel === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {plant.careLevel}
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {plant.description}
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                  <span>{plant.category}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedPlant && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative h-64">
              <img src={selectedPlant.image} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedPlant(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">{selectedPlant.name}</h3>
                  <p className="text-lg text-gray-500 italic">{selectedPlant.scientificName}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Care Level</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    selectedPlant.careLevel === 'Easy' ? 'bg-green-100 text-green-700' :
                    selectedPlant.careLevel === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {selectedPlant.careLevel}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <p className="text-[10px] font-bold text-amber-800 uppercase tracking-widest mb-1">Light</p>
                  <p className="text-sm text-amber-900 font-medium">{selectedPlant.light}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-[10px] font-bold text-blue-800 uppercase tracking-widest mb-1">Water</p>
                  <p className="text-sm text-blue-900 font-medium">{selectedPlant.water}</p>
                </div>
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                  <p className="text-[10px] font-bold text-stone-800 uppercase tracking-widest mb-1">Soil</p>
                  <p className="text-sm text-stone-900 font-medium">{selectedPlant.soil}</p>
                </div>
              </div>

              <div className="space-y-6">
                <section>
                  <h4 className="font-bold text-gray-900 mb-2">About</h4>
                  <p className="text-gray-600 leading-relaxed">{selectedPlant.description}</p>
                </section>

                <section>
                  <h4 className="font-bold text-red-900 mb-2">Common Issues</h4>
                  <ul className="space-y-2">
                    {selectedPlant.commonIssues.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-red-800 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantsLibrary;


import React from 'react';
import { PlantAnalysis } from '../types';

interface ResultDisplayProps {
  analysis: PlantAnalysis;
  onReset: () => void;
  onSaveToCollection: (analysis: PlantAnalysis) => void;
  isSaved?: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ analysis, onReset, onSaveToCollection, isSaved }) => {
  const isHealthy = analysis.healthStatus === 'Healthy';
  const statusColor = isHealthy ? 'text-green-600 bg-green-50' : analysis.severity === 'High' ? 'text-red-600 bg-red-50' : 'text-amber-600 bg-amber-50';

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative h-64 md:h-80">
        <img src={analysis.imageUrl} alt={analysis.plantName} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block ${statusColor}`}>
              {analysis.healthStatus}
            </span>
            <h2 className="text-3xl font-bold text-white">{analysis.plantName}</h2>
            {analysis.diseaseName && (
              <p className="text-green-100 text-lg">{analysis.diseaseName}</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Assessment
              </h3>
              <p className="text-gray-600 leading-relaxed">{analysis.description}</p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Treatment Plan
              </h3>
              <ul className="space-y-3">
                {analysis.treatmentSteps.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-600">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                    {step}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Preventive Care
              </h3>
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                <ul className="space-y-2">
                  {analysis.preventiveTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-emerald-800 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Metrics</p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">AI Confidence</span>
                    <span className="font-bold text-gray-900">{Math.round(analysis.confidence * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full transition-all duration-1000" style={{ width: `${analysis.confidence * 100}%` }}></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Severity Level</p>
                  <p className={`font-bold ${analysis.severity === 'High' ? 'text-red-600' : analysis.severity === 'Medium' ? 'text-amber-600' : 'text-green-600'}`}>
                    {analysis.severity}
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => onSaveToCollection(analysis)}
              disabled={isSaved}
              className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                isSaved 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                : 'bg-green-600 text-white hover:bg-green-700 shadow-green-100'
              }`}
            >
              <svg className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {isSaved ? 'Saved to Collection' : 'Save to My Garden'}
            </button>

            <button 
              onClick={onReset}
              className="w-full bg-white border-2 border-green-600 text-green-600 font-bold py-4 rounded-xl hover:bg-green-50 transition-colors"
            >
              Scan Another Plant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;

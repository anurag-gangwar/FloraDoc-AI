
import React from 'react';
import { PlantAnalysis } from '../types';

interface HistoryListProps {
  history: PlantAnalysis[];
  onSelectItem: (item: PlantAnalysis) => void;
  onClear: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelectItem, onClear }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Recent Scans</h3>
        <button onClick={onClear} className="text-sm text-red-500 hover:text-red-600 font-medium">Clear History</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {history.map((item) => (
          <div 
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <img src={item.imageUrl} alt={item.plantName} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
              <p className="text-xs font-medium text-white/70">{new Date(item.timestamp).toLocaleDateString()}</p>
              <h4 className="text-sm font-bold text-white truncate">{item.plantName}</h4>
              <p className={`text-[10px] font-bold uppercase ${item.healthStatus === 'Healthy' ? 'text-green-400' : 'text-amber-400'}`}>
                {item.healthStatus}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;

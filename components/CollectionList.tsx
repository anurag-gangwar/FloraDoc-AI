
import React from 'react';
import { PlantAnalysis } from '../types';

interface CollectionListProps {
  collection: PlantAnalysis[];
  onSelectItem: (item: PlantAnalysis) => void;
  onRemoveItem: (id: string) => void;
}

const CollectionList: React.FC<CollectionListProps> = ({ collection, onSelectItem, onRemoveItem }) => {
  if (collection.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-green-200">
        <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-green-950 mb-2">Your Garden is Empty</h3>
        <p className="text-green-800/60 max-w-sm mx-auto">
          Scan your plants and save the results to build your personal care collection.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-green-950 mb-2">My Garden Collection</h2>
        <p className="text-green-800/70">A record of your personal plants and their diagnosis history.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collection.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-green-50 group"
          >
            <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => onSelectItem(item)}>
              <img 
                src={item.imageUrl} 
                alt={item.plantName} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm ${
                  item.healthStatus === 'Healthy' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'
                }`}>
                  {item.healthStatus}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="cursor-pointer" onClick={() => onSelectItem(item)}>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.plantName}</h3>
                  <p className="text-xs text-gray-400">{new Date(item.timestamp).toLocaleDateString()}</p>
                </div>
                <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors p-1"
                  title="Remove from collection"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {item.description}
              </p>
              <button 
                onClick={() => onSelectItem(item)}
                className="w-full text-center py-2 text-xs font-bold text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionList;


import React, { useState, useRef } from 'react';

interface ScannerProps {
  onScan: (base64Image: string) => void;
  isProcessing: boolean;
}

const Scanner: React.FC<ScannerProps> = ({ onScan, isProcessing }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        setPreview(reader.result as string);
        onScan(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-green-900/5 p-6 md:p-10 border border-green-50">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Diagnose Your Plant</h2>
        <p className="text-gray-500 mb-6">Upload a clear photo of the affected leaf or plant for instant diagnosis and care steps.</p>

        {/* Diagnostic Tips Section */}
        <div className="mb-8 bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-left">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-1.5 rounded-lg text-blue-600 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-blue-900 mb-1">For Best Results:</p>
              <ul className="text-xs text-blue-800/80 space-y-1 list-disc list-inside">
                <li>Ensure bright, natural lighting</li>
                <li>Focus clearly on the affected area</li>
                <li>Avoid blurry or distant shots</li>
              </ul>
            </div>
          </div>
        </div>

        <div 
          onClick={!isProcessing ? triggerUpload : undefined}
          className={`
            relative aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer
            ${isProcessing ? 'bg-gray-50 border-gray-200 cursor-not-allowed' : 'bg-green-50 border-green-200 hover:border-green-400 hover:bg-green-100/50'}
          `}
        >
          {preview && !isProcessing ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
          ) : (
            <>
              {isProcessing ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="font-medium text-green-700 animate-pulse">Analyzing health markers...</p>
                </div>
              ) : (
                <>
                  <div className="bg-white p-4 rounded-full shadow-md mb-4 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="font-semibold text-green-900">Take or Upload Photo</p>
                  <p className="text-sm text-green-600/70 mt-1">Supports JPG, PNG</p>
                </>
              )}
            </>
          )}
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
          capture="environment"
        />

        <div className="mt-8 flex flex-col gap-3">
          <button 
            disabled={isProcessing}
            onClick={triggerUpload}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? 'Processing...' : 'Start Scan'}
          </button>
          <p className="text-xs text-gray-400">Powered by Gemini Vision Intelligence</p>
        </div>
      </div>
    </div>
  );
};

export default Scanner;

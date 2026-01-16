
export interface PlantAnalysis {
  id: string;
  timestamp: number;
  imageUrl: string;
  plantName: string;
  healthStatus: 'Healthy' | 'Disease Detected' | 'Warning';
  diseaseName?: string;
  confidence: number;
  description: string;
  treatmentSteps: string[];
  preventiveTips: string[];
  severity: 'Low' | 'Medium' | 'High' | 'None';
}

export interface ScanHistoryItem {
  id: string;
  timestamp: number;
  imageUrl: string;
  plantName: string;
  healthStatus: string;
  diseaseName?: string;
}

export interface LibraryPlant {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  careLevel: 'Easy' | 'Moderate' | 'Challenging';
  light: string;
  water: string;
  soil: string;
  commonIssues: string[];
  description: string;
  image: string;
}

export type ViewState = 'scanner' | 'library' | 'collection';

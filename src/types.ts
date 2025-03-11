export interface SensorData {
  id: string;
  type: 'flow' | 'turbidity' | 'ph';
  value: number;
  timestamp: string;
  location: string;
  status: 'normal' | 'warning' | 'critical';
}

export interface Alert {
  id: string;
  type: 'leak' | 'quality' | 'usage';
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  isRead: boolean;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  potentialSavings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  implemented: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface WaterUsageStats {
  daily: number;
  weekly: number;
  monthly: number;
  yearlyAverage: number;
  previousDay: number;
  change: number;
}

export interface WaterQuality {
  ph: number;
  turbidity: number;
  chlorine: number;
  temperature: number;
  lastUpdated: string;
}

export interface UsageByDevice {
  device: string;
  usage: number;
  percentage: number;
}
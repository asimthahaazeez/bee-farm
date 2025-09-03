// TypeScript interfaces for beekeeping data structures

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'beekeeper' | 'buyer';
  createdAt: Date;
  updatedAt: Date;
}

export interface Hive {
  id: string;
  name: string;
  location: string;
  installDate: Date;
  status: 'healthy' | 'attention' | 'warning';
  queenStatus: 'present' | 'missing' | 'unknown';
  temperament: 'calm' | 'moderate' | 'aggressive';
  lastInspection?: Date;
  ownerId: string;
}

export interface InspectionLog {
  id: string;
  hiveId: string;
  date: Date;
  temperament: 'calm' | 'moderate' | 'aggressive';
  queenStatus: 'present' | 'missing' | 'unknown';
  notes: string;
  weather: WeatherCondition;
  inspectorId: string;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: WeatherForecast[];
  hourly: HourlyWeather[];
}

export interface CurrentWeather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  condition: WeatherCondition;
  pressure: number;
  uvIndex: number;
}

export interface WeatherForecast {
  date: Date;
  high: number;
  low: number;
  condition: WeatherCondition;
  precipitation: number;
  windSpeed: number;
}

export interface HourlyWeather {
  time: Date;
  temperature: number;
  condition: WeatherCondition;
  precipitation: number;
}

export type WeatherCondition = 
  | 'sunny' 
  | 'partly-cloudy' 
  | 'cloudy' 
  | 'rain' 
  | 'storm' 
  | 'snow' 
  | 'fog' 
  | 'windy';

export interface AIRecommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action: string;
  weatherBased: boolean;
  createdAt: Date;
  hiveId?: string;
}

export interface BeekeepingActivity {
  id: string;
  type: 'inspection' | 'feeding' | 'treatment' | 'harvest' | 'maintenance';
  hiveId: string;
  date: Date;
  notes: string;
  userId: string;
}

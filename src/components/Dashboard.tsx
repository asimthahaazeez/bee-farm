import { useState } from "react";
import { Cloud, Sun, CloudRain, Eye, Calendar, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WeatherCard } from "@/components/WeatherCard";
import { HiveOverview } from "@/components/HiveOverview";
import { AIRecommendations } from "@/components/AIRecommendations";
import { QuickActions } from "@/components/QuickActions";
import type { AIRecommendation, Hive, WeatherData } from "@/types/beekeeping";
import heroImage from "@/assets/beekeeping-hero.jpg";

// Mock data for development
const mockWeatherData: WeatherData = {
  current: {
    temperature: 24,
    humidity: 65,
    windSpeed: 8,
    windDirection: "NW",
    condition: "partly-cloudy",
    pressure: 1013,
    uvIndex: 6
  },
  forecast: [
    { date: new Date(), high: 26, low: 18, condition: "sunny", precipitation: 0, windSpeed: 5 },
    { date: new Date(Date.now() + 86400000), high: 28, low: 20, condition: "partly-cloudy", precipitation: 10, windSpeed: 7 },
    { date: new Date(Date.now() + 172800000), high: 22, low: 16, condition: "rain", precipitation: 80, windSpeed: 12 },
    { date: new Date(Date.now() + 259200000), high: 25, low: 17, condition: "cloudy", precipitation: 20, windSpeed: 8 },
    { date: new Date(Date.now() + 345600000), high: 27, low: 19, condition: "sunny", precipitation: 0, windSpeed: 6 }
  ],
  hourly: []
};

const mockHives: Hive[] = [
  {
    id: "1",
    name: "Queen Anne",
    location: "South Field",
    installDate: new Date("2024-04-15"),
    status: "healthy",
    queenStatus: "present",
    temperament: "calm",
    lastInspection: new Date("2024-08-28"),
    ownerId: "user1"
  },
  {
    id: "2", 
    name: "Golden Hive",
    location: "North Meadow",
    installDate: new Date("2024-05-20"),
    status: "attention",
    queenStatus: "unknown",
    temperament: "moderate",
    lastInspection: new Date("2024-08-25"),
    ownerId: "user1"
  }
];

const mockRecommendations: AIRecommendation[] = [
  {
    id: "1",
    priority: "high",
    title: "Rain Expected Tomorrow",
    description: "Heavy rain forecast for tomorrow afternoon. Your hives need protection from moisture.",
    action: "Install rain covers and check hive ventilation",
    weatherBased: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    priority: "medium", 
    title: "Inspection Due",
    description: "Golden Hive hasn't been inspected for 8 days during peak season.",
    action: "Schedule inspection within next 2 days",
    weatherBased: false,
    createdAt: new Date(),
    hiveId: "2"
  }
];

export function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | '5day'>('5day');

  return (
    <div className="min-h-screen bg-gradient-field">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Beautiful beekeeping scene with hives in a meadow"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            BeeKeeper Pro
          </h1>
          <p className="text-lg opacity-90">
            Smart insights for successful beekeeping
          </p>
        </div>
        
        {/* Floating bee animation for desktop */}
        <div className="hidden md:block absolute top-20 right-20 animate-float">
          <div className="w-8 h-8 bg-honey rounded-full opacity-80 animate-pulse-soft" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        
        {/* AI Recommendations Banner */}
        <AIRecommendations recommendations={mockRecommendations} />

        {/* Weather & Quick Actions Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WeatherCard 
              weather={mockWeatherData}
              selectedTimeframe={selectedTimeframe}
              onTimeframeChange={setSelectedTimeframe}
            />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Hive Overview */}
        <HiveOverview hives={mockHives} />

        {/* Recent Activity */}
        <Card className="weather-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Eye className="w-4 h-4 text-accent" />
                  <span className="font-medium">Queen Anne Inspected</span>
                </div>
                <span className="text-sm text-muted-foreground">2 days ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber" />
                  <span className="font-medium">Weather Alert Created</span>
                </div>
                <span className="text-sm text-muted-foreground">5 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Cloud, Sun, CloudRain, Eye, Calendar, AlertTriangle, MapPin, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WeatherCard } from "@/components/WeatherCard";
import { HiveOverview } from "@/components/HiveOverview";
import { AIRecommendations } from "@/components/AIRecommendations";
import { QuickActions } from "@/components/QuickActions";
import { BeeAnimation, PollenParticle, BeeTrail } from "./BeeAnimation";
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
    <div className="min-h-screen bg-gradient-sunset bee-cursor">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <PollenParticle className="top-1/4 left-1/4" />
        <PollenParticle className="top-3/4 right-1/4" />
        <BeeTrail className="top-1/2" />
      </div>

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden floating-element">
        <img 
          src={heroImage} 
          alt="Beekeeping operations in golden sunlight" 
          className="absolute inset-0 w-full h-full object-cover animate-weather-transition"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div className="max-w-4xl">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              BeeKeeper Pro
              <BeeAnimation className="inline-block ml-4" size="lg" />
            </h1>
            <p className="font-body text-xl md:text-2xl mb-8 font-light">
              AI-Powered Beekeeping Toolkit for Modern Apiaries
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2 btn-organic">
                🌤️ Weather Insights
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2 btn-organic">
                🐝 Hive Management
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2 btn-organic">
                🤖 AI Recommendations
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="lovable-card">
          <AIRecommendations recommendations={mockRecommendations} />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="lovable-card">
            <WeatherCard 
              weather={mockWeatherData} 
              selectedTimeframe={selectedTimeframe}
              onTimeframeChange={setSelectedTimeframe}
            />
          </div>
          <div className="lovable-card">
            <QuickActions />
          </div>
        </div>
        
        <div className="lovable-card">
          <HiveOverview hives={mockHives} />
        </div>

        {/* Recent Activity */}
        <div className="lovable-card">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recent Activity
                <BeeAnimation size="sm" className="ml-2" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg floating-element bee-hover-target">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Hive Alpha inspected</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="btn-organic">✅ Healthy</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg floating-element bee-hover-target">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Weather alert issued</p>
                      <p className="text-sm text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="btn-organic">⚠️ Rain Expected</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg floating-element bee-hover-target">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Hive Beta relocated</p>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="btn-organic">📍 New Location</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
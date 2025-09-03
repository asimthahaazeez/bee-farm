import { useState } from "react";
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { WeatherData, WeatherCondition } from "@/types/beekeeping";

interface WeatherCardProps {
  weather: WeatherData;
  selectedTimeframe: 'today' | '5day';
  onTimeframeChange: (timeframe: 'today' | '5day') => void;
}

const weatherIcons: Record<WeatherCondition, React.ComponentType<any>> = {
  sunny: Sun,
  'partly-cloudy': Cloud,
  cloudy: Cloud,
  rain: CloudRain,
  storm: CloudRain,
  snow: Cloud,
  fog: Cloud,
  windy: Wind
};

const weatherColors: Record<WeatherCondition, string> = {
  sunny: "text-yellow-500",
  'partly-cloudy': "text-gray-400",
  cloudy: "text-gray-500",
  rain: "text-blue-500",
  storm: "text-blue-700",
  snow: "text-gray-300",
  fog: "text-gray-400",
  windy: "text-green-500"
};

export function WeatherCard({ weather, selectedTimeframe, onTimeframeChange }: WeatherCardProps) {
  const CurrentIcon = weatherIcons[weather.current.condition];
  
  return (
    <Card className="weather-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CurrentIcon className={`w-6 h-6 ${weatherColors[weather.current.condition]}`} />
            Weather Forecast
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={selectedTimeframe === 'today' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onTimeframeChange('today')}
            >
              Today
            </Button>
            <Button
              variant={selectedTimeframe === '5day' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onTimeframeChange('5day')}
            >
              5 Days
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Current Weather */}
        <div className="mb-6 p-4 bg-gradient-sunset rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Current Conditions</h3>
              <p className="text-3xl font-bold">{weather.current.temperature}°C</p>
              <p className="capitalize opacity-90">{weather.current.condition.replace('-', ' ')}</p>
            </div>
            <CurrentIcon className="w-16 h-16 animate-pulse-soft" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              <span>{weather.current.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4" />
              <span>{weather.current.windSpeed} km/h</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>UV {weather.current.uvIndex}</span>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4" />
              <span>{weather.current.pressure} hPa</span>
            </div>
          </div>
        </div>

        {/* Forecast */}
        {selectedTimeframe === '5day' && (
          <div className="space-y-3">
            <h4 className="font-semibold text-lg">5-Day Forecast</h4>
            <div className="grid gap-3">
              {weather.forecast.map((day, index) => {
                const DayIcon = weatherIcons[day.condition];
                const isToday = index === 0;
                
                return (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <DayIcon className={`w-5 h-5 ${weatherColors[day.condition]}`} />
                      <div>
                        <p className="font-medium">
                          {isToday ? 'Today' : day.date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {day.condition.replace('-', ' ')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-blue-500" />
                        <span>{day.precipitation}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wind className="w-3 h-3 text-gray-500" />
                        <span>{day.windSpeed}</span>
                      </div>
                      <div className="font-medium">
                        <span className="text-foreground">{day.high}°</span>
                        <span className="text-muted-foreground">/{day.low}°</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {selectedTimeframe === 'today' && (
          <div className="space-y-3">
            <h4 className="font-semibold text-lg">Today's Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">High</p>
                <p className="text-xl font-bold text-primary">{weather.forecast[0].high}°C</p>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Low</p>
                <p className="text-xl font-bold text-blue-600">{weather.forecast[0].low}°C</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
import { Eye, MapPin, Crown, Heart, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Hive } from "@/types/beekeeping";

interface HiveOverviewProps {
  hives: Hive[];
}

const statusConfig = {
  healthy: {
    label: "Healthy",
    className: "hive-status-healthy",
    icon: "💚"
  },
  attention: {
    label: "Needs Attention", 
    className: "hive-status-attention",
    icon: "⚠️"
  },
  warning: {
    label: "Warning",
    className: "hive-status-warning", 
    icon: "🚨"
  }
};

const temperamentConfig = {
  calm: { label: "Calm", color: "bg-accent/20 text-accent-foreground border-accent/30" },
  moderate: { label: "Moderate", color: "hive-status-attention" },
  aggressive: { label: "Aggressive", color: "bg-destructive/20 text-destructive-foreground border-destructive/30" }
};

const queenConfig = {
  present: { label: "Present", icon: "👑", color: "text-amber" },
  missing: { label: "Missing", icon: "❌", color: "text-destructive" },
  unknown: { label: "Unknown", icon: "❓", color: "text-muted-foreground" }
};

export function HiveOverview({ hives }: HiveOverviewProps) {
  const formatDate = (date: Date) => {
    const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    return days === 0 ? "Today" : `${days} days ago`;
  };

  return (
    <Card className="weather-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-honey rounded flex items-center justify-center">
              🏠
            </div>
            My Hives ({hives.length})
          </CardTitle>
          <Button variant="outline" size="sm">
            Add New Hive
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {hives.map((hive) => {
            const status = statusConfig[hive.status];
            const temperament = temperamentConfig[hive.temperament];
            const queen = queenConfig[hive.queenStatus];
            
            return (
              <div 
                key={hive.id}
                className="p-4 border rounded-xl hover:shadow-md transition-all duration-300 bg-card/50 bee-hover-target"
              >
                {/* Hive Header */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{hive.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {hive.location}
                    </div>
                  </div>
                  <Badge className={status.className}>
                    {status.icon} {status.label}
                  </Badge>
                </div>

                {/* Hive Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Crown className={`w-4 h-4 ${queen.color}`} />
                    <span>Queen: {queen.label}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Heart className="w-4 h-4 text-destructive" />
                    <Badge variant="outline" className={temperament.color}>
                      {temperament.label}
                    </Badge>
                  </div>
                </div>

                {/* Last Inspection */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Last inspected: {formatDate(hive.lastInspection || new Date())}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 btn-primary">
                    <Eye className="w-3 h-3 mr-1" />
                    Inspect
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View History
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {hives.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              🐝
            </div>
            <h3 className="text-lg font-medium mb-2">No Hives Yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first hive to start tracking inspections and get AI recommendations.
            </p>
            <Button className="btn-primary">
              Add Your First Hive
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
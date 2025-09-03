import { AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AIRecommendation } from "@/types/beekeeping";

interface AIRecommendationsProps {
  recommendations: AIRecommendation[];
}

const priorityConfig = {
  high: {
    icon: AlertTriangle,
    className: "border-destructive/50 bg-destructive/5 text-destructive-foreground",
    badgeClassName: "bg-destructive text-destructive-foreground",
    iconColor: "text-destructive"
  },
  medium: {
    icon: Info,
    className: "hive-status-attention border-2",
    badgeClassName: "hive-status-attention",
    iconColor: "text-amber"
  },
  low: {
    icon: CheckCircle,
    className: "border-accent/50 bg-accent/5 text-accent-foreground",
    badgeClassName: "bg-accent/20 text-accent-foreground",
    iconColor: "text-accent"
  }
};

export function AIRecommendations({ recommendations }: AIRecommendationsProps) {
  if (recommendations.length === 0) {
    return (
      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-accent" />
            <div>
              <h3 className="font-semibold text-accent-foreground">All Clear!</h3>
              <p className="text-sm text-accent-foreground/80">
                No urgent recommendations at this time. Keep up the great work!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show the highest priority recommendation prominently
  const topRecommendation = recommendations.sort((a, b) => {
    const priority = { high: 3, medium: 2, low: 1 };
    return priority[b.priority] - priority[a.priority];
  })[0];

  const config = priorityConfig[topRecommendation.priority];
  const Icon = config.icon;

  return (
    <div className="space-y-3">
      {/* Top Priority Recommendation */}
      <Card className={`${config.className} border-2 animate-pulse-soft`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <Icon className={`w-6 h-6 mt-0.5 ${config.iconColor}`} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{topRecommendation.title}</h3>
                  <Badge className={config.badgeClassName}>
                    {topRecommendation.priority.toUpperCase()}
                  </Badge>
                  {topRecommendation.weatherBased && (
                    <Badge variant="outline" className="text-xs">
                      🌤️ Weather
                    </Badge>
                  )}
                </div>
                <p className="text-sm mb-3 opacity-90">
                  {topRecommendation.description}
                </p>
                <div className="bg-background/50 p-3 rounded-lg">
                  <p className="text-sm font-medium">Action Required:</p>
                  <p className="text-sm">{topRecommendation.action}</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button size="sm" className="btn-primary">
              Take Action
            </Button>
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button variant="ghost" size="sm">
              Remind Later
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Recommendations */}
      {recommendations.length > 1 && (
        <Card className="weather-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-sm">Other Recommendations ({recommendations.length - 1})</h4>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-2">
              {recommendations.slice(1, 3).map((rec) => {
                const recConfig = priorityConfig[rec.priority];
                const RecIcon = recConfig.icon;
                
                return (
                  <div key={rec.id} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
                    <RecIcon className={`w-4 h-4 ${recConfig.iconColor}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{rec.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{rec.description}</p>
                    </div>
                    <Badge className={`${recConfig.badgeClassName} text-xs`}>
                      {rec.priority}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
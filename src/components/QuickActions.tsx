import { Plus, Eye, FileText, Cloud, Settings, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BeeAnimation } from "./BeeAnimation";

const quickActions = [
  {
    id: "inspect",
    icon: Eye,
    label: "Quick Inspection",
    description: "Log a hive inspection",
    className: "btn-primary"
  },
  {
    id: "add-hive",
    icon: Plus,
    label: "Add Hive",
    description: "Register new hive",
    className: "btn-secondary"
  },
  {
    id: "weather-check",
    icon: Cloud,
    label: "Weather Alert",
    description: "Check conditions",
    className: "btn-secondary"
  },
  {
    id: "reports",
    icon: FileText,
    label: "View Reports",
    description: "Activity summary",
    className: "btn-secondary"
  }
];

export function QuickActions() {
  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="font-display flex items-center gap-2">
          Quick Actions
          <BeeAnimation size="sm" className="ml-2" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          
          return (
            <Button
              key={action.id}
              className={`w-full justify-start gap-3 btn-organic bee-hover-target`}
              variant="outline"
            >
              <Icon className="w-4 h-4" />
              <div className="text-left">
                <p className="font-medium">{action.label}</p>
                <p className="text-xs opacity-80">{action.description}</p>
              </div>
            </Button>
          );
        })}
        
        <div className="pt-3 border-t space-y-2">
          <Button variant="ghost" className="w-full justify-start btn-organic bee-hover-target" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start btn-organic bee-hover-target" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
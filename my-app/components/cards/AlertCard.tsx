import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { AlertCircle, Bell, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../ui/button";

export function AlertCard() {
  const alerts = [
    {
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      title: "Pic de commentaires négatifs sur LinkedIn",
      time: "Il y a 3 heures",
      type: "error",
      count: 12,
    },
    {
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
      title: "Augmentation des mentions négatives sur Twitter",
      time: "Il y a 2 heures",
      type: "warning",
      count: 8,
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      title: "Article positif publié dans un journal majeur",
      time: "Il y a 1 jour",
      type: "success",
      count: 3,
    },
  ];

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Alertes récentes
            </CardTitle>
            <CardDescription className="text-sm">
              {alerts.length} notifications importantes à traiter
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            Tout voir
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">{alert.icon}</div>
              <div className="flex-1">
                <p className="font-medium text-sm">{alert.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium">
                    {alert.count} mentions
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

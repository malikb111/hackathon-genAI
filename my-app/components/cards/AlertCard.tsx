import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { AlertCircle, Bell, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useFetchNotifications } from "@/hooks/use-fetch-notifications";

export function AlertCard() {
  const { notifications, loading } = useFetchNotifications();

  const getIcon = (type: "error" | "warning" | "success") => {
    switch (type) {
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

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
              {notifications.length} notifications importantes à traiter
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            Tout voir
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{notification.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium">
                    {notification.count} mentions
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

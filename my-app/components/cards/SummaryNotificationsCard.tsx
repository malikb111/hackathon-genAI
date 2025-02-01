import { Bell, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { useFetchNotifications } from "@/hooks/use-fetch-notifications";

export const SummaryNotificationsCard = () => {
  const { notifications, loading } = useFetchNotifications();

  const getCountByType = (type: "error" | "warning" | "success") => {
    return notifications
      .filter((notif) => notif.type === type)
      .reduce((acc, notif) => acc + notif.count, 0);
  };

  const getStatusColor = (type: "error" | "warning" | "success") => {
    const colors = {
      error: "text-red-600",
      warning: "text-orange-500",
      success: "text-green-500",
    };
    return colors[type];
  };

  const getStatusIcon = (type: "error" | "warning" | "success") => {
    const icons = {
      error: <AlertCircle className="w-4 h-4" />,
      warning: <AlertTriangle className="w-4 h-4" />,
      success: <CheckCircle className="w-4 h-4" />,
    };
    return icons[type];
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 animate-pulse w-80">
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 w-80 space-y-4">
      {/* En-tête compact */}
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-1.5 rounded-lg">
            <Bell className="text-blue-600 w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold">Notifications</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">24h</span>
        </div>
      </div>

      {/* Mini statistiques */}
      <div className="flex justify-between px-2">
        <div className="text-center">
          <div className="flex items-center gap-1 text-red-600">
            <AlertCircle className="w-3 h-3" />
            <span className="text-sm font-bold">{getCountByType("error")}</span>
          </div>
          <p className="text-xs text-gray-500">Critiques</p>
        </div>
        <div className="text-center">
          <div className="flex items-center gap-1 text-orange-500">
            <AlertTriangle className="w-3 h-3" />
            <span className="text-sm font-bold">
              {getCountByType("warning")}
            </span>
          </div>
          <p className="text-xs text-gray-500">Alertes</p>
        </div>
        <div className="text-center">
          <div className="flex items-center gap-1 text-green-500">
            <CheckCircle className="w-3 h-3" />
            <span className="text-sm font-bold">
              {getCountByType("success")}
            </span>
          </div>
          <p className="text-xs text-gray-500">Positifs</p>
        </div>
      </div>

      {/* Liste compacte */}
      <div className="space-y-2 max-h-[280px] overflow-y-auto">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <div className={`mt-0.5 ${getStatusColor(notification.type)}`}>
              {getStatusIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-800 line-clamp-2">
                {notification.title}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[11px] text-gray-500">
                  {notification.time}
                </span>
                <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-full bg-gray-100">
                  {notification.count}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

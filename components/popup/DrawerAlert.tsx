import {
  Bell,
  AlertCircle,
  XCircle,
  CheckCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useFetchNotifications } from "@/hooks/use-fetch-notifications";

export function DrawerAlert() {
  const { notifications, loading } = useFetchNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  const totalNotifications = notifications.reduce(
    (acc, curr) => acc + curr.count,
    0
  );

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {totalNotifications > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
              {totalNotifications}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold">
            Centre de Notifications
          </DrawerTitle>
          <DrawerDescription className="text-gray-500">
            Restez informé des dernières alertes et mises à jour importantes
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.time}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.count}{" "}
                      {notification.count > 1 ? "mentions" : "mention"}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Marquer comme lu
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        <DrawerFooter className="border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between w-full">
            <Button variant="outline">Tout marquer comme lu</Button>
            <DrawerClose asChild>
              <Button variant="ghost">Fermer</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

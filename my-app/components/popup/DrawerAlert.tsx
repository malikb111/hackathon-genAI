import {
  Bell,
  AlertCircle,
  XCircle,
  CheckCircle,
  AlertTriangle,
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

export function DrawerAlert() {
  const alerts = [
    {
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
      title: "Augmentation des mentions négatives sur Twitter",
      time: "Il y a 2 heures",
      type: "warning",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      title: "Article positif publié dans un journal majeur",
      time: "Il y a 1 jour",
      type: "success",
    },
    {
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      title: "Pic de commentaires négatifs sur LinkedIn",
      time: "Il y a 3 heures",
      type: "error",
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
      title: "Nouvelle tendance émergente à surveiller",
      time: "Il y a 5 heures",
      type: "info",
    },
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
            4
          </span>
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
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex-shrink-0 mt-1">{alert.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">
                    {alert.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  Marquer comme lu
                </Button>
              </div>
            ))}
          </div>
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

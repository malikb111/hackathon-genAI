import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { AlertCircle } from "lucide-react";

export function AlertCard() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Alertes récentes</CardTitle>
        <CardDescription>
          Notifications importantes concernant la perception de
          l&apos;entreprise
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <AlertCircle className="h-6 w-6 text-yellow-500" />
            <div>
              <p className="font-medium">
                Augmentation des mentions négatives sur Twitter
              </p>
              <p className="text-sm text-muted-foreground">Il y a 2 heures</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <AlertCircle className="h-6 w-6 text-green-500" />
            <div>
              <p className="font-medium">
                Article positif publié dans un journal majeur
              </p>
              <p className="text-sm text-muted-foreground">Il y a 1 jour</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

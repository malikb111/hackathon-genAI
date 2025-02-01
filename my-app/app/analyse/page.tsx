import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/Card";

export default function Perception() {
  return (
    <div className="pr-6">
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card
          title="Score global"
          value="78%"
          icon={TrendingUp}
          description="+2% par rapport au mois dernier"
        />
        <Card
          title="Mentions positives"
          value={1234}
          icon={TrendingUp}
          iconColor="text-green-600"
          description="+15% par rapport au mois dernier"
        />
        <Card
          title="Mentions négatives"
          value={432}
          icon={TrendingDown}
          iconColor="text-red-600"
          description="-5% par rapport au mois dernier"
        />
      </div>
    </div>
  );
}

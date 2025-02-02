import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CardChartProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function CardChart({ title, children, className }: CardChartProps) {
  return (
    <div 
      className={cn("p-6 rounded-lg border bg-card text-card-foreground shadow-sm", className)}
      data-chart
      data-chart-title={title}
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CardChartProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export function CardChart({ title, className, children }: CardChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

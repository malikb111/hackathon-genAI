export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Analytics</h1>
      {children}
    </div>
  );
}

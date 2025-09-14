import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { EngagementChart } from "@/components/engagement-chart";

export default function ProgressPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Progress Tracking</CardTitle>
          <CardDescription>
            Monitor overall student and class performance. Student progress is updated when a Class Teacher scans their QR code.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <EngagementChart />
        </CardContent>
      </Card>
    </main>
  );
}

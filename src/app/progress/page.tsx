import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { EngagementChart } from "@/components/engagement-chart";
import { ScanQrCodeDialog } from "@/components/scan-qr-code-dialog";

export default function ProgressPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <div>
          <h1 className="text-2xl font-bold">Progress Tracking</h1>
          <p className="text-muted-foreground">
            Monitor student engagement and sync their lesson progress.
          </p>
        </div>
        <div className="ml-auto">
            <ScanQrCodeDialog />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Weekly Student Engagement</CardTitle>
          <CardDescription>
            This chart shows the number of active students and lessons completed over the past week.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <EngagementChart />
        </CardContent>
      </Card>
    </main>
  );
}

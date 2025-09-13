import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ProgressPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Progress Tracking</CardTitle>
          <CardDescription>
            Monitor overall student and class performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This area will provide a comprehensive overview of student progress, class-wide performance metrics, and attendance records. It's designed to give educators the insights they need to support their students effectively.</p>
        </CardContent>
      </Card>
    </main>
  );
}

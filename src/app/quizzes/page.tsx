import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function QuizzesPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Quizzes</CardTitle>
          <CardDescription>
            Create and track gamified quizzes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section will feature tools for creating interactive and gamified quizzes. Teachers can track student performance, and leaderboards will help drive engagement.</p>
        </CardContent>
      </Card>
    </main>
  );
}

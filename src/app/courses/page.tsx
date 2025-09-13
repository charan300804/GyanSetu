import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function CoursesPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Courses</CardTitle>
          <CardDescription>
            Manage and assign learning modules.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section will allow teachers and administrators to view, create, and assign courses to students. It will include modules for digital literacy, core subjects, and more, available in multiple languages.</p>
        </CardContent>
      </Card>
    </main>
  );
}

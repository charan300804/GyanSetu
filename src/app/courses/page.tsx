import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function CoursesPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Manage Courses</CardTitle>
            <CardDescription>
              View, create, and assign learning modules.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">This section will allow teachers to manage courses and modules for their students.</p>
            <Button>Create New Course</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upload Content</CardTitle>
            <CardDescription>
              Share timetables and notes with your class.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Timetable
            </Button>
             <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Notes
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function CoursesPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Manage Courses & Modules</CardTitle>
            <CardDescription>
              Create, view, and edit learning modules for your subjects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">This section allows faculty to manage courses and modules. You can create new courses and upload lesson materials.</p>
            <Button>Create New Course</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upload Content</CardTitle>
            <CardDescription>
              Upload video lessons, notes, and other materials for your modules.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Video Lesson
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

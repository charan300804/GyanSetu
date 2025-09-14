import { getAssignments, getTimetable } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, BookOpen, CheckCircle, Clock } from "lucide-react";

export default async function StudentDashboardPage() {
  const timetable = await getTimetable();
  const assignments = await getAssignments();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaysClasses = timetable.find(t => t.day === today);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h1 className="text-2xl font-bold">Welcome back, Ravi!</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Timetable ({today})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todaysClasses ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Teacher</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todaysClasses.periods.map(period => (
                    <TableRow key={period.time}>
                      <TableCell>{period.time}</TableCell>
                      <TableCell>{period.subject}</TableCell>
                      <TableCell>{period.teacher}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground">No classes scheduled for today.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Pending Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {assignments.filter(a => !a.completed).map(assignment => (
                <li key={assignment.id} className="flex items-start gap-4">
                  <Checkbox id={`assign-${assignment.id}`} className="mt-1" />
                  <div className="grid gap-1">
                    <label htmlFor={`assign-${assignment.id}`} className="font-medium">{assignment.title}</label>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{assignment.subject}</span>
                      <Badge variant="outline">Due: {assignment.dueDate}</Badge>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
       <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Completed Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {assignments.filter(a => a.completed).map(assignment => (
                <li key={assignment.id} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{assignment.title} - {assignment.subject}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
    </main>
  );
}


import { getStudents, getSummaryStats } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, BookOpenText, Users, AreaChart, UserCheck } from "lucide-react";
import { ClassAttendanceChart } from "@/components/class-attendance-chart";

// This is the default dashboard for a logged-in teacher.
export default async function TeacherDashboard() {
  const students = await getStudents();
  const {
    activeStudents,
    coursesCompleted,
    averageScore,
    totalCourses,
  } = await getSummaryStats();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h1 className="text-2xl font-bold">Class 10A Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStudents}</div>
            <p className="text-xs text-muted-foreground">
              Total students in class
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Class Average Score
            </CardTitle>
            <AreaChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              Across all subjects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpenText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              Assigned to this class
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Role</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Class Teacher</div>
            <p className="text-xs text-muted-foreground">
              Mentor for Class 10A
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Student Overview</CardTitle>
            <CardDescription>
              Performance summary of all students in Class 10A.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Attendance
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Overall Score
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.length > 0 ? (
                  students
                    .sort((a, b) => b.overallScore - a.overallScore)
                    .map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                              <AvatarImage
                                src={student.avatar}
                                alt={student.name}
                              />
                              <AvatarFallback>
                                {student.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="grid gap-0.5">
                              <div className="font-medium">{student.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {student.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            variant={
                              student.attendance > 90 ? 'default' : 'secondary'
                            }
                            className={
                              student.attendance < 80
                                ? 'bg-red-100 text-red-800'
                                : ''
                            }
                          >
                            {student.attendance}%
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {student.overallScore}%
                        </TableCell>
                        <TableCell>
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/student/${student.id}`}>
                              View Profile
                              <ArrowUpRight className="h-4 w-4 ml-2" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No student data available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Class Attendance</CardTitle>
            <CardDescription>
              An overview of student attendance percentages.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ClassAttendanceChart />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

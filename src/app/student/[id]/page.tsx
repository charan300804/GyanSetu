import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, CalendarCheck, Star, Users } from 'lucide-react';
import { getStudentById, getCourses, getPerformanceByStudentId } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PerformanceSummary } from './performance-summary';

export default async function StudentProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const student = await getStudentById(params.id);
  if (!student) {
    notFound();
  }

  const allCourses = await getCourses();
  const studentPerformances = await getPerformanceByStudentId(student.id);

  const enrolledCourses = studentPerformances.map((p) => {
    const course = allCourses.find((c) => c.id === p.courseId);
    return { ...course, ...p };
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {student.name}'s Profile
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16 border">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <CardTitle className="text-2xl">{student.name}</CardTitle>
                <CardDescription>{student.email}</CardDescription>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Class: {student.class}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-secondary p-4">
                <CalendarCheck className="h-6 w-6 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Attendance</div>
                  <div className="text-2xl font-bold">{student.attendance}%</div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-secondary p-4">
                <Star className="h-6 w-6 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Overall Score</div>
                  <div className="text-2xl font-bold">{student.overallScore}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Courses</CardTitle>
              <CardDescription>
                Courses the student is currently participating in.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead className="w-[150px]">Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrolledCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>{course.language}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={course.progress} className="h-2" />
                          <span className="text-xs text-muted-foreground">
                            {course.progress}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4">
          <PerformanceSummary
            studentName={student.name}
            moduleResults={studentPerformances.flatMap((p) => p.modules)}
          />
        </div>
      </div>
    </main>
  );
}

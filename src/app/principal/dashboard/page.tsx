import Link from 'next/link';
import {
  ArrowUpRight,
  BookOpenText,
  Users,
  UserCheck,
  UserPlus,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getStudents, getSummaryStats } from '@/lib/data';
import { StudentPerformanceChart } from '@/components/student-performance-chart';

export default async function PrincipalDashboard() {
  const students = await getStudents();
  const {
    activeStudents,
    averageScore,
  } = await getSummaryStats();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
       <h1 className="text-2xl font-bold">Principal's Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStudents}</div>
            <p className="text-xs text-muted-foreground">
              Across all classes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              School Average Score
            </CardTitle>
            <BookOpenText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              Average across all classes
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Teachers
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
             <p className="text-xs text-muted-foreground">
              Class and Subject Teachers
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              User Management
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-2">
              Create & manage teacher accounts.
            </p>
            <Button size="sm">Manage Users</Button>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="lg:col-span-4">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Class 10A Overview</CardTitle>
            <CardDescription>
              Class Teacher: Mr. Sharma
            </CardDescription>
          </div>
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
                          <Avatar className="h-9 w-9">
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
      <div className="lg:col-span-3 grid auto-rows-max gap-4">
        <Card>
            <CardHeader>
              <CardTitle>Class 10A Performance</CardTitle>
              <CardDescription>
                Distribution of student scores in Class 10A.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StudentPerformanceChart />
            </CardContent>
          </Card>
      </div>
      </div>
    </main>
  );
}
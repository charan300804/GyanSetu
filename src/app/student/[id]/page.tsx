
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, CalendarCheck, Star, Users, QrCode } from 'lucide-react';
import { getStudentById, getCourses, getPerformanceByStudentId, getLessonVideos } from '@/lib/data';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Student, Course, Performance as PerformanceType, LessonVideo } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function StudentProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [student, setStudent] = useState<Student | undefined | null>(undefined);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    setUserType(sessionStorage.getItem('userType'));

    async function fetchData() {
        const studentData = await getStudentById(params.id);
        if (!studentData) {
            setStudent(null);
            return;
        }
        setStudent(studentData);
        
        const allCourses = await getCourses();
        const studentPerformances = await getPerformanceByStudentId(studentData.id);
        const videos = await getLessonVideos();

        const courses = studentPerformances.map((p) => {
            const course = allCourses.find((c) => c.id === p.courseId);
            return { ...course, ...p };
        });
        setEnrolledCourses(courses);

        const watchedVideos = videos.filter(v => v.watched);
        
        const fullProgressData = {
            student: studentData,
            performance: courses,
            watchedVideoIds: watchedVideos.map(v => v.id),
        };

        const qrData = encodeURIComponent(JSON.stringify(fullProgressData));
        setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}`);
    }

    fetchData();

  }, [params.id]);


  const getBackPath = () => {
    switch (userType) {
        case 'parent':
            return '/parent/dashboard';
        case 'student':
            return '/student/dashboard';
        case 'principal':
        case 'teacher':
        case 'faculty':
        default:
            return '/';
    }
  }

  if (student === undefined) {
    return (
         <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center gap-4">
                <Skeleton className="h-7 w-7 rounded-full" />
                <Skeleton className="h-6 w-48" />
            </div>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
                    <Card><CardHeader><Skeleton className="h-32 w-full" /></CardHeader></Card>
                    <Card><CardHeader><Skeleton className="h-48 w-full" /></CardHeader></Card>
                </div>
                <div className="grid auto-rows-max items-start gap-4">
                     <Card><CardHeader><Skeleton className="h-64 w-full" /></CardHeader></Card>
                </div>
            </div>
         </main>
    );
  }

  if (student === null) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href={getBackPath()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {student.name}'s Profile
        </h1>
        <Dialog>
          <DialogTrigger asChild>
             {qrCodeUrl && (
                <Button variant="outline" size="icon" className="h-8 w-8">
                    <QrCode className="h-4 w-4" />
                    <span className="sr-only">Show Progress QR Code</span>
                </Button>
             )}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Progress QR Code</DialogTitle>
              <DialogDescription>
                Scan this code to sync your video lesson progress with your teacher's device.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center p-4">
              {qrCodeUrl ? (
                <Image src={qrCodeUrl} alt="Progress QR Code" width={200} height={200} />
              ) : (
                <Skeleton className="h-[200px] w-[200px]" />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16 border">
                <AvatarImage src={student.avatar} alt={student.name} data-ai-hint={student.imageHint} />
                <AvatarFallback>{student.name ? student.name.charAt(0) : '?'}</AvatarFallback>
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
              {enrolledCourses.length > 0 ? (
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
              ) : (
                <div className="text-center text-sm text-muted-foreground py-8">
                  No courses enrolled yet.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4">
          <PerformanceSummary
            studentName={student.name}
            moduleResults={enrolledCourses.flatMap((p) => p.modules)}
          />
        </div>
      </div>
    </main>
  );
}

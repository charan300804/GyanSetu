
import { PlaceHolderImages } from './placeholder-images';
import type { Student, Course, Performance, ModuleResult, TimetableEntry, Assignment, LessonVideo, Teacher } from './types';

const students: Student[] = [];

const teachers: Teacher[] = [];

const courses: Course[] = [];

const performances: Performance[] = [];

const timetable: TimetableEntry[] = [];

const assignments: Assignment[] = [];

const lessonVideos: LessonVideo[] = [];


// Data access functions
export async function getStudents(): Promise<Student[]> {
  return students;
}

export async function getStudentById(id: string): Promise<Student | undefined> {
  return students.find(s => s.id === id);
}

export async function getTeachers(): Promise<Teacher[]> {
    return teachers;
}

export async function getCourses(): Promise<Course[]> {
  return courses;
}

export async function getPerformanceByStudentId(studentId: string): Promise<Performance[]> {
  return performances.filter(p => p.studentId === studentId);
}

export async function getSummaryStats() {
    const totalStudents = students.length;
    const averageScoreValue = totalStudents > 0 ? Math.round(students.reduce((acc, s) => acc + s.overallScore, 0) / totalStudents) : 0;
    return {
        activeStudents: totalStudents,
        coursesCompleted: performances.filter(p => p.progress === 100).length,
        averageScore: averageScoreValue,
        totalCourses: courses.length,
    }
}

export async function getEngagementData() {
    return [];
}

export async function getTimetable(): Promise<TimetableEntry[]> {
    const today = new Date().getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[today];
    
    // Check if it's a weekday
    if (today > 0 && today < 6) {
        // Find today's schedule
        const todaySchedule = timetable.find(t => t.day === currentDay);
        // If today's schedule exists and is not already first, move it to the front
        if (todaySchedule && timetable.length > 0 && timetable[0].day !== currentDay) {
            const otherDays = timetable.filter(t => t.day !== currentDay);
            return [todaySchedule, ...otherDays];
        }
    }
    return timetable;
}

export async function getAssignments(): Promise<Assignment[]> {
    return assignments;
}

export async function getLessonVideos(): Promise<LessonVideo[]> {
    return lessonVideos;
}

import { PlaceHolderImages } from './placeholder-images';
import type { Student, Course, Performance, ModuleResult, TimetableEntry, Assignment, LessonVideo } from './types';

const students: Student[] = [
    { id: '1', name: 'Ravi Kumar', avatar: 'https://picsum.photos/seed/1/100/100', email: 'ravi@example.com', class: '10A', attendance: 95, overallScore: 88 },
];

const courses: Course[] = [];

const performances: Performance[] = [];

const timetable: TimetableEntry[] = [
    { day: 'Monday', periods: [
        { time: '09:00-10:00', subject: 'Maths', teacher: 'Mr. Sharma' },
        { time: '10:00-11:00', subject: 'Science', teacher: 'Ms. Gupta' },
        { time: '11:00-12:00', subject: 'English', teacher: 'Mr. Singh' },
    ]},
    { day: 'Tuesday', periods: [
        { time: '09:00-10:00', subject: 'Social Studies', teacher: 'Mrs. Devi' },
        { time: '10:00-11:00', subject: 'Hindi', teacher: 'Mr. Verma' },
        { time: '11:00-12:00', subject: 'Maths', teacher: 'Mr. Sharma' },
    ]},
];

const assignments: Assignment[] = [
    { id: '1', subject: 'Maths', title: 'Algebra Homework', dueDate: '2024-08-15', completed: false },
    { id: '2', subject: 'Science', title: 'Biology Project', dueDate: '2024-08-20', completed: false },
    { id: '3', subject: 'English', title: 'Essay on "My Village"', dueDate: '2024-08-12', completed: true },
];

const lessonVideos: LessonVideo[] = [
    { id: '1', title: 'Introduction to Algebra', subject: 'Maths', teacher: 'Mr. Sharma', thumbnailUrl: 'https://picsum.photos/seed/lv1/400/225', videoUrl: '#', watched: true },
    { id: '2', title: 'The Solar System', subject: 'Science', teacher: 'Ms. Gupta', thumbnailUrl: 'https://picsum.photos/seed/lv2/400/225', videoUrl: '#', watched: false },
    { id: '3', title: 'Understanding Tenses', subject: 'English', teacher: 'Mr. Singh', thumbnailUrl: 'https://picsum.photos/seed/lv3/400/225', videoUrl: '#', watched: false },
    { id: '4', title: 'The Mughal Empire', subject: 'Social Studies', teacher: 'Mrs. Devi', thumbnailUrl: 'https://picsum.photos/seed/lv4/400/225', videoUrl: '#', watched: false },
];


// Data access functions
export async function getStudents(): Promise<Student[]> {
  return students;
}

export async function getStudentById(id: string): Promise<Student | undefined> {
  return students.find(s => s.id === id);
}

export async function getCourses(): Promise<Course[]> {
  return courses;
}

export async function getPerformanceByStudentId(studentId: string): Promise<Performance[]> {
  return performances.filter(p => p.studentId === studentId);
}

export async function getSummaryStats() {
    return {
        activeStudents: students.length > 0 ? 1 : 0,
        coursesCompleted: 0,
        averageScore: students.length > 0 ? 88 : 0,
        totalCourses: courses.length,
    }
}

export async function getEngagementData() {
    if (students.length === 0) return [];
    return [
        { date: 'Mon', active: 10, completed: 5 },
        { date: 'Tue', active: 12, completed: 6 },
        { date: 'Wed', active: 11, completed: 7 },
        { date: 'Thu', active: 15, completed: 8 },
        { date: 'Fri', active: 14, completed: 9 },
        { date: 'Sat', active: 16, completed: 10 },
      ];
}

export async function getTimetable(): Promise<TimetableEntry[]> {
    return timetable;
}

export async function getAssignments(): Promise<Assignment[]> {
    return assignments;
}

export async function getLessonVideos(): Promise<LessonVideo[]> {
    return lessonVideos;
}

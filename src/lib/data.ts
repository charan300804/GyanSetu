import { PlaceHolderImages } from './placeholder-images';
import type { Student, Course, Performance, ModuleResult } from './types';

const students: Student[] = [
  { id: '1', name: 'Aarav Sharma', email: 'aarav.sharma@example.com', class: '5th', attendance: 95, overallScore: 88, avatar: PlaceHolderImages.find(p => p.id === 'student-1')?.imageUrl ?? '' },
  { id: '2', name: 'Priya Kaur', email: 'priya.kaur@example.com', class: '5th', attendance: 98, overallScore: 92, avatar: PlaceHolderImages.find(p => p.id === 'student-2')?.imageUrl ?? '' },
  { id: '3', name: 'Rohan Singh', email: 'rohan.singh@example.com', class: '6th', attendance: 85, overallScore: 76, avatar: PlaceHolderImages.find(p => p.id === 'student-3')?.imageUrl ?? '' },
  { id: '4', name: 'Anika Gupta', email: 'anika.gupta@example.com', class: '6th', attendance: 91, overallScore: 85, avatar: PlaceHolderImages.find(p => p.id === 'student-4')?.imageUrl ?? '' },
  { id: '5', name: 'Ishaan Verma', email: 'ishaan.verma@example.com', class: '5th', attendance: 82, overallScore: 79, avatar: PlaceHolderImages.find(p => p.id === 'student-5')?.imageUrl ?? '' },
  { id: '6', name: 'Diya Patel', email: 'diya.patel@example.com', class: '7th', attendance: 96, overallScore: 90, avatar: PlaceHolderImages.find(p => p.id === 'student-6')?.imageUrl ?? '' },
  { id: '7', name: 'Kabir Yadav', email: 'kabir.yadav@example.com', class: '7th', attendance: 88, overallScore: 81, avatar: PlaceHolderImages.find(p => p.id === 'student-7')?.imageUrl ?? '' },
  { id: '8', name: 'Zara Khan', email: 'zara.khan@example.com', class: '6th', attendance: 93, overallScore: 89, avatar: PlaceHolderImages.find(p => p.id === 'student-8')?.imageUrl ?? '' },
];

const courses: Course[] = [
  { id: 'C01', name: 'Basic Computer Skills', language: 'Punjabi' },
  { id: 'C02', name: 'Mathematics Grade 5', language: 'English' },
  { id: 'C03', name: 'Safe Internet Practices', language: 'Hindi' },
  { id: 'C04', name: 'Typing Skills', language: 'English' },
  { id: 'C05', name: 'Science Grade 6', language: 'English' },
];

const performances: Performance[] = [
  { studentId: '1', courseId: 'C02', progress: 100, modules: [
    { moduleName: 'Algebra Basics', score: 90, completionTime: 1800, attendancePercentage: 100 },
    { moduleName: 'Geometry Intro', score: 85, completionTime: 2200, attendancePercentage: 95 },
  ] },
  { studentId: '1', courseId: 'C01', progress: 80, modules: [
    { moduleName: 'Using a Mouse', score: 95, completionTime: 600, attendancePercentage: 100 },
    { moduleName: 'Keyboard Fundamentals', score: 80, completionTime: 1500, attendancePercentage: 90 },
  ] },
  { studentId: '2', courseId: 'C02', progress: 100, modules: [
    { moduleName: 'Algebra Basics', score: 95, completionTime: 1600, attendancePercentage: 100 },
    { moduleName: 'Geometry Intro', score: 90, completionTime: 2000, attendancePercentage: 98 },
  ] },
  { studentId: '3', courseId: 'C05', progress: 60, modules: [
    { moduleName: 'The Solar System', score: 75, completionTime: 2500, attendancePercentage: 90 },
    { moduleName: 'Living Organisms', score: 78, completionTime: 3000, attendancePercentage: 80 },
  ] },
  { studentId: '4', courseId: 'C05', progress: 90, modules: [
    { moduleName: 'The Solar System', score: 88, completionTime: 2200, attendancePercentage: 95 },
    { moduleName: 'Living Organisms', score: 82, completionTime: 2800, attendancePercentage: 90 },
  ] },
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
        activeStudents: 7,
        coursesCompleted: 12,
        averageScore: 86,
        totalCourses: courses.length,
    }
}

export async function getEngagementData() {
    return [
        { date: 'Mon', completed: 5, active: 8 },
        { date: 'Tue', completed: 7, active: 10 },
        { date: 'Wed', completed: 6, active: 9 },
        { date: 'Thu', completed: 9, active: 12 },
        { date: 'Fri', completed: 8, active: 11 },
        { date: 'Sat', completed: 12, active: 15 },
        { date: 'Sun', completed: 10, active: 13 },
      ];
}

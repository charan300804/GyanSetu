import { PlaceHolderImages } from './placeholder-images';
import type { Student, Course, Performance, ModuleResult } from './types';

const students: Student[] = [];

const courses: Course[] = [];

const performances: Performance[] = [];

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
        activeStudents: 0,
        coursesCompleted: 0,
        averageScore: 0,
        totalCourses: courses.length,
    }
}

export async function getEngagementData() {
    return [];
}

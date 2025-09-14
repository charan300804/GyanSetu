
import { PlaceHolderImages } from './placeholder-images';
import type { Student, Course, Performance, ModuleResult, TimetableEntry, Assignment, LessonVideo } from './types';

const students: Student[] = [];

const courses: Course[] = [];

const performances: Performance[] = [];

const timetable: TimetableEntry[] = [];

const assignments: Assignment[] = [];

const lessonVideos: LessonVideo[] = [];


// Data access functions
export async function getStudents(): Promise<Student[]> {
    if (students.length > 0) return students;
    
    // If students is empty, create a default student
    const defaultStudent: Student = {
        id: '1',
        name: 'Ravi Kumar',
        avatar: 'https://picsum.photos/seed/1/100/100',
        email: 'ravi@example.com',
        class: '10A',
        attendance: 95,
        overallScore: 88,
    };
    const defaultStudents: Student[] = [
        defaultStudent,
        { id: '2', name: 'Sunita Sharma', avatar: 'https://picsum.photos/seed/2/100/100', email: 'sunita@example.com', class: '10A', attendance: 98, overallScore: 92 },
        { id: '3', name: 'Amit Singh', avatar: 'https://picsum.photos/seed/3/100/100', email: 'amit@example.com', class: '10A', attendance: 92, overallScore: 85 },
        { id: '4', name: 'Priya Patel', avatar: 'https://picsum.photos/seed/4/100/100', email: 'priya@example.com', class: '10A', attendance: 99, overallScore: 95 },
        { id: '5', name: 'Vikram Reddy', avatar: 'https://picsum.photos/seed/5/100/100', email: 'vikram@example.com', class: '10A', attendance: 90, overallScore: 81 },
    ];
    students.push(...defaultStudents);

    if (courses.length === 0) {
        courses.push(
            { id: 'c1', name: 'Mathematics 101', language: 'English' },
            { id: 'c2', name: 'Science 101', language: 'English' }
        );
    }

    if (performances.length === 0) {
        performances.push(
            {
                studentId: '1',
                courseId: 'c1',
                progress: 75,
                modules: [
                    { moduleName: 'Algebra Basics', score: 85, completionTime: 3600, attendancePercentage: 95 },
                    { moduleName: 'Geometry Fundamentals', score: 70, completionTime: 4500, attendancePercentage: 90 },
                ],
            },
            {
                studentId: '1',
                courseId: 'c2',
                progress: 60,
                modules: [
                    { moduleName: 'Physics: Laws of Motion', score: 65, completionTime: 4000, attendancePercentage: 100 },
                ],
            }
        );
    }
    
    if (timetable.length === 0) {
        timetable.push(
            { day: 'Monday', periods: [
                { time: '09:00-10:00', subject: 'Maths', teacher: 'Mr. Sharma' },
                { time: '10:00-11:00', subject: 'Science', teacher: 'Ms. Gupta' },
                { time: '11:00-12:00', subject: 'English', teacher: 'Mr. Singh' },
            ]}
        );
    }

    if (assignments.length === 0) {
        assignments.push(
            { id: '1', subject: 'Maths', title: 'Algebra Homework', dueDate: '2024-08-15', completed: false },
            { id: '2', subject: 'Science', title: 'Biology Project', dueDate: '2024-08-20', completed: false },
            { id: '3', subject: 'English', title: 'Essay on "My Village"', dueDate: '2024-08-12', completed: true },
        );
    }

    if (lessonVideos.length === 0) {
        lessonVideos.push(
            { id: '1', title: 'Introduction to Algebra', subject: 'Maths', teacher: 'Mr. Sharma', thumbnailUrl: 'https://picsum.photos/seed/lv1/400/225', videoUrl: '#', watched: true },
            { id: '2', title: 'The Solar System', subject: 'Science', teacher: 'Ms. Gupta', thumbnailUrl: 'https://picsum.photos/seed/lv2/400/225', videoUrl: '#', watched: false },
        );
    }


  return students;
}

export async function getStudentById(id: string): Promise<Student | undefined> {
  const allStudents = await getStudents();
  return allStudents.find(s => s.id === id);
}

export async function getCourses(): Promise<Course[]> {
  await getStudents(); // Ensure data is populated
  return courses;
}

export async function getPerformanceByStudentId(studentId: string): Promise<Performance[]> {
  await getStudents(); // Ensure data is populated
  return performances.filter(p => p.studentId === studentId);
}

export async function getSummaryStats() {
    const allStudents = await getStudents();
    return {
        activeStudents: allStudents.length,
        coursesCompleted: performances.filter(p => p.progress === 100).length,
        averageScore: Math.round(allStudents.reduce((acc, s) => acc + s.overallScore, 0) / allStudents.length),
        totalCourses: courses.length,
    }
}

export async function getEngagementData() {
    const allStudents = await getStudents();
    if (allStudents.length === 0) return [];
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
    await getStudents(); // Ensure data is populated
    const today = new Date().getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[today];
    
    // Add today's schedule if it's a weekday and not already in the list
    if (today > 0 && today < 6 && !timetable.find(t => t.day === currentDay)) {
        const baseSchedule = timetable.find(t => t.day === 'Monday'); // Use Monday as a template
        if (baseSchedule) {
            return [{ day: currentDay, periods: baseSchedule.periods }, ...timetable];
        }
    }
    return timetable;
}

export async function getAssignments(): Promise<Assignment[]> {
    await getStudents(); // Ensure data is populated
    return assignments;
}

export async function getLessonVideos(): Promise<LessonVideo[]> {
    await getStudents(); // Ensure data is populated
    return lessonVideos;
}


import { PlaceHolderImages } from './placeholder-images';
import type { Student, Course, Performance, ModuleResult, TimetableEntry, Assignment, LessonVideo } from './types';

const students: Student[] = [
    { id: '1', name: 'Ravi Kumar', avatar: 'https://picsum.photos/seed/1/100/100', email: 'ravi@example.com', class: '10A', attendance: 95, overallScore: 88 },
    { id: '2', name: 'Sunita Sharma', avatar: 'https://picsum.photos/seed/2/100/100', email: 'sunita@example.com', class: '10A', attendance: 98, overallScore: 92 },
    { id: '3', name: 'Amit Singh', avatar: 'https://picsum.photos/seed/3/100/100', email: 'amit@example.com', class: '10A', attendance: 92, overallScore: 85 },
    { id: '4', name: 'Priya Patel', avatar: 'https://picsum.photos/seed/4/100/100', email: 'priya@example.com', class: '10A', attendance: 99, overallScore: 95 },
    { id: '5', name: 'Vikram Reddy', avatar: 'https://picsum.photos/seed/5/100/100', email: 'vikram@example.com', class: '10A', attendance: 90, overallScore: 81 },
];

const courses: Course[] = [
    { id: 'c1', name: 'Mathematics 101', language: 'English' },
    { id: 'c2', name: 'Science 101', language: 'English' },
];

const performances: Performance[] = [
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
    },
    {
        studentId: '2',
        courseId: 'c1',
        progress: 90,
        modules: [
            { moduleName: 'Algebra Basics', score: 95, completionTime: 3200, attendancePercentage: 100 },
            { moduleName: 'Geometry Fundamentals', score: 88, completionTime: 4000, attendancePercentage: 95 },
        ],
    },
    {
        studentId: '3',
        courseId: 'c1',
        progress: 80,
         modules: [
            { moduleName: 'Algebra Basics', score: 88, completionTime: 3400, attendancePercentage: 92 },
            { moduleName: 'Geometry Fundamentals', score: 78, completionTime: 4600, attendancePercentage: 90 },
        ],
    },
    {
        studentId: '4',
        courseId: 'c1',
        progress: 95,
         modules: [
            { moduleName: 'Algebra Basics', score: 98, completionTime: 3100, attendancePercentage: 98 },
            { moduleName: 'Geometry Fundamentals', score: 92, completionTime: 3900, attendancePercentage: 95 },
        ],
    },
    {
        studentId: '5',
        courseId: 'c1',
        progress: 70,
        modules: [
            { moduleName: 'Algebra Basics', score: 75, completionTime: 3800, attendancePercentage: 90 },
            { moduleName: 'Geometry Fundamentals', score: 68, completionTime: 4800, attendancePercentage: 85 },
        ],
    },
];

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
    { day: 'Wednesday', periods: [
        { time: '09:00-10:00', subject: 'Maths', teacher: 'Mr. Sharma' },
        { time: '10:00-11:00', subject: 'Science', teacher: 'Ms. Gupta' },
        { time: '11:00-12:00', subject: 'English', teacher: 'Mr. Singh' },
    ]},
    { day: 'Thursday', periods: [
        { time: '09:00-10:00', subject: 'Social Studies', teacher: 'Mrs. Devi' },
        { time: '10:00-11:00', subject: 'Hindi', teacher: 'Mr. Verma' },
        { time: '11:00-12:00', subject: 'Maths', teacher: 'Mr. Sharma' },
    ]},
    { day: 'Friday', periods: [
        { time: '09:00-10:00', subject: 'Maths', teacher: 'Mr. Sharma' },
        { time: '10:00-11:00', subject: 'Science', teacher: 'Ms. Gupta' },
        { time: '11:00-12:00', subject: 'English', teacher: 'Mr. Singh' },
    ]},
    { day: 'Saturday', periods: [
        { time: '09:00-10:00', subject: 'Art', teacher: 'Mr. Khan' },
        { time: '10:00-11:00', subject: 'Music', teacher: 'Ms. Rao' },
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
        activeStudents: students.length,
        coursesCompleted: performances.filter(p => p.progress === 100).length,
        averageScore: Math.round(students.reduce((acc, s) => acc + s.overallScore, 0) / students.length),
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
    return assignments;
}

export async function getLessonVideos(): Promise<LessonVideo[]> {
    return lessonVideos;
}

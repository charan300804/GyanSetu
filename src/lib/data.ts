import { PlaceHolderImages } from './placeholder-images';
import type { Student, Course, Performance, ModuleResult, TimetableEntry, Assignment, LessonVideo, Teacher } from './types';

const students: Student[] = [
    { id: '1', name: 'Ravi Kumar', avatar: 'https://picsum.photos/seed/1/100/100', email: 'ravi@example.com', class: '10A', attendance: 95, overallScore: 88 },
    { id: '2', name: 'Sunita Sharma', avatar: 'https://picsum.photos/seed/2/100/100', email: 'sunita@example.com', class: '10A', attendance: 98, overallScore: 92 },
    { id: '3', name: 'Amit Singh', avatar: 'https://picsum.photos/seed/3/100/100', email: 'amit@example.com', class: '10A', attendance: 78, overallScore: 75 },
    { id: '4', name: 'Priya Patel', avatar: 'https://picsum.photos/seed/4/100/100', email: 'priya@example.com', class: '10A', attendance: 99, overallScore: 95 },
    { id: '5', name: 'Vikram Reddy', avatar: 'https://picsum.photos/seed/5/100/100', email: 'vikram@example.com', class: '10A', attendance: 90, overallScore: 81 },
    { id: '6', name: 'Anjali Gupta', avatar: 'https://picsum.photos/seed/6/100/100', email: 'anjali@example.com', class: '10A', attendance: 85, overallScore: 89 },
    { id: '7', name: 'Rohan Mehra', avatar: 'https://picsum.photos/seed/7/100/100', email: 'rohan@example.com', class: '10A', attendance: 65, overallScore: 68 },
];

const teachers: Teacher[] = [
    { id: 't1', name: 'Mr. Sharma', avatar: 'https://picsum.photos/seed/teacher1/100/100', email: 'sharma@example.com', role: 'Class Teacher' },
    { id: 't2', name: 'Ms. Gupta', avatar: 'https://picsum.photos/seed/teacher2/100/100', email: 'gupta@example.com', role: 'Subject Teacher' },
    { id: 't3', name: 'Mr. Singh', avatar: 'https://picsum.photos/seed/teacher3/100/100', email: 'singh@example.com', role: 'Subject Teacher' },
    { id: 't4', name: 'Mrs. Devi', avatar: 'https://picsum.photos/seed/teacher4/100/100', email: 'devi@example.com', role: 'Subject Teacher' },
];

const courses: Course[] = [
    { id: 'c1', name: 'Mathematics 101', language: 'English' },
    { id: 'c2', name: 'Science 101', language: 'English' },
    { id: 'c3', name: 'Social Studies 101', language: 'Hindi' },
    { id: 'c4', name: 'English Literature', language: 'English' },
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
            { moduleName: 'Algebra Basics', score: 95, completionTime: 3200, attendancePercentage: 98 },
            { moduleName: 'Geometry Fundamentals', score: 88, completionTime: 4000, attendancePercentage: 95 },
        ],
    }
];

const timetable: TimetableEntry[] = [
    { day: 'Monday', periods: [
        { time: '09:00-10:00', subject: 'Maths', teacher: 'Mr. Sharma' },
        { time: '10:00-11:00', subject: 'Science', teacher: 'Ms. Gupta' },
        { time: '11:00-12:00', subject: 'English', teacher: 'Mr. Singh' },
    ]},
    { day: 'Tuesday', periods: [
        { time: '09:00-10:00', subject: 'Social Studies', teacher: 'Mrs. Devi' },
        { time: '10:00-11:00', subject: 'Maths', teacher: 'Mr. Sharma' },
        { time: '11:00-12:00', subject: 'Science', teacher: 'Ms. Gupta' },
    ]},
    { day: 'Wednesday', periods: [
        { time: '09:00-10:00', subject: 'English', teacher: 'Mr. Singh' },
        { time: '10:00-11:00', subject: 'Social Studies', teacher: 'Mrs. Devi' },
        { time: '11:00-12:00', subject: 'Maths', teacher: 'Mr. Sharma' },
    ]},
    { day: 'Thursday', periods: [
        { time: '09:00-10:00', subject: 'Science', teacher: 'Ms. Gupta' },
        { time: '10:00-11:00', subject: 'English', teacher: 'Mr. Singh' },
        { time: '11:00-12:00', subject: 'Social Studies', teacher: 'Mrs. Devi' },
    ]},
    { day: 'Friday', periods: [
        { time: '09:00-10:00', subject: 'Maths', teacher: 'Mr. Sharma' },
        { time: '10:00-11:00', subject: 'Science', teacher: 'Ms. Gupta' },
        { time: '11:00-12:00', subject: 'English', teacher: 'Mr. Singh' },
    ]},
];

const assignments: Assignment[] = [
    { id: '1', subject: 'Maths', title: 'Algebra Homework Chapter 5', dueDate: 'Tomorrow', completed: false },
    { id: '2', subject: 'Science', title: 'Biology Project: Plant Cells', dueDate: 'Next week', completed: false },
    { id: '3', subject: 'English', title: 'Essay on "A day in the village"', dueDate: 'Yesterday', completed: true },
    { id: '4', subject: 'Social Studies', title: 'Map of India - Rivers', dueDate: 'Yesterday', completed: true },
];

const lessonVideos: LessonVideo[] = [
    { id: '1', title: 'Introduction to Algebra', subject: 'Maths', teacher: 'Mr. Sharma', thumbnailUrl: 'https://picsum.photos/seed/lv1/400/225', videoUrl: '#', watched: true },
    { id: '2', title: 'The Solar System & Planets', subject: 'Science', teacher: 'Ms. Gupta', thumbnailUrl: 'https://picsum.photos/seed/lv2/400/225', videoUrl: '#', watched: false },
    { id: '3', title: 'Understanding Nouns and Verbs', subject: 'English', teacher: 'Mr. Singh', thumbnailUrl: 'https://picsum.photos/seed/lv3/400/225', videoUrl: '#', watched: true },
    { id: '4', title: 'The Mughal Empire in India', subject: 'Social Studies', teacher: 'Mrs. Devi', thumbnailUrl: 'https://picsum.photos/seed/lv4/400/225', videoUrl: '#', watched: false },
    { id: '5', title: 'Advanced Geometry: Triangles', subject: 'Maths', teacher: 'Mr. Sharma', thumbnailUrl: 'https://picsum.photos/seed/lv5/400/225', videoUrl: '#', watched: false },
    { id: '6', title: 'Chemical Reactions', subject: 'Science', teacher: 'Ms. Gupta', thumbnailUrl: 'https://picsum.photos/seed/lv6/400/225', videoUrl: '#', watched: false },
];


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
    return {
        activeStudents: students.length,
        coursesCompleted: performances.filter(p => p.progress === 100).length,
        averageScore: Math.round(students.reduce((acc, s) => acc + s.overallScore, 0) / students.length),
        totalCourses: courses.length,
    }
}

export async function getEngagementData() {
    return [
        { date: 'Mon', active: 18, completed: 8 },
        { date: 'Tue', active: 20, completed: 12 },
        { date: 'Wed', active: 19, completed: 10 },
        { date: 'Thu', active: 22, completed: 15 },
        { date: 'Fri', active: 21, completed: 18 },
        { date: 'Sat', active: 23, completed: 20 },
      ];
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
        if (todaySchedule && timetable[0].day !== currentDay) {
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

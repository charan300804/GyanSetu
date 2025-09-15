
import type { Student, Course, Performance, ModuleResult, TimetableEntry, Assignment, LessonVideo, Teacher, Quiz } from './types';

const students: Student[] = [
  { id: '1', name: 'Ravi Kumar', avatar: 'https://picsum.photos/seed/1/100/100', imageHint: 'student portrait', email: 'ravi.kumar@example.com', class: '10A', attendance: 92, overallScore: 88 },
  { id: '2', name: 'Priya Sharma', avatar: 'https://picsum.photos/seed/2/100/100', imageHint: 'student portrait', email: 'priya.sharma@example.com', class: '10A', attendance: 95, overallScore: 94 },
  { id: '3', name: 'Amit Singh', avatar: 'https://picsum.photos/seed/3/100/100', imageHint: 'student portrait', email: 'amit.singh@example.com', class: '10A', attendance: 88, overallScore: 76 },
  { id: '4', name: 'Sneha Patel', avatar: 'https://picsum.photos/seed/4/100/100', imageHint: 'student portrait', email: 'sneha.patel@example.com', class: '10A', attendance: 98, overallScore: 91 },
  { id: '5', name: 'Mohit Verma', avatar: 'https://picsum.photos/seed/5/100/100', imageHint: 'student portrait', email: 'mohit.verma@example.com', class: '10A', attendance: 75, overallScore: 65 },
];

const teachers: Teacher[] = [
    { id: 't-1', name: 'Mr. Sharma', email: 'sharma@example.com', avatar: 'https://picsum.photos/seed/teacher/100/100', imageHint: 'teacher portrait', role: 'Class Teacher' },
    { id: 't-2', name: 'Ms. Gupta', email: 'gupta@example.com', avatar: 'https://picsum.photos/seed/faculty1/100/100', imageHint: 'teacher portrait', role: 'Subject Teacher' },
    { id: 't-3', name: 'Mr. Khan', email: 'khan@example.com', avatar: 'https://picsum.photos/seed/faculty2/100/100', imageHint: 'teacher portrait', role: 'Subject Teacher' },
    { id: 'p-1', name: 'Principal Singh', email: 'principal@example.com', avatar: 'https://picsum.photos/seed/principal/100/100', imageHint: 'principal portrait', role: 'Principal' },
];

const courses: Course[] = [
    { id: 'C001', name: 'Science 10', language: 'English' },
    { id: 'C002', name: 'Mathematics 10', language: 'English' },
    { id: 'C003', name: 'Vigyan 10', language: 'Hindi' },
];

const performances: Performance[] = [
    { studentId: '1', courseId: 'C001', progress: 75, modules: [
        { moduleName: 'Physics - Light', score: 85, completionTime: 3600, attendancePercentage: 90 },
        { moduleName: 'Chemistry - Acids', score: 90, completionTime: 4200, attendancePercentage: 95 },
    ]},
    { studentId: '1', courseId: 'C002', progress: 60, modules: [
        { moduleName: 'Algebra', score: 70, completionTime: 5000, attendancePercentage: 85 },
    ]},
    { studentId: '2', courseId: 'C001', progress: 90, modules: [
        { moduleName: 'Physics - Light', score: 95, completionTime: 3200, attendancePercentage: 100 },
        { moduleName: 'Chemistry - Acids', score: 92, completionTime: 4000, attendancePercentage: 98 },
    ]},
];

const timetable: TimetableEntry[] = [
    { day: 'Monday', periods: [
        { time: '09:00 - 10:00', subject: 'Mathematics', teacher: 'Ms. Gupta' },
        { time: '10:00 - 11:00', subject: 'Science', teacher: 'Mr. Khan' },
        { time: '11:00 - 12:00', subject: 'English', teacher: 'Mr. Sharma' },
    ]},
    { day: 'Tuesday', periods: [
        { time: '09:00 - 10:00', subject: 'History', teacher: 'Mr. Sharma' },
        { time: '10:00 - 11:00', subject: 'Mathematics', teacher: 'Ms. Gupta' },
        { time: '11:00 - 12:00', subject: 'Science', teacher: 'Mr. Khan' },
    ]},
     { day: 'Wednesday', periods: [
        { time: '09:00 - 10:00', subject: 'Science', teacher: 'Mr. Khan' },
        { time: '10:00 - 11:00', subject: 'English', teacher: 'Mr. Sharma' },
        { time: '11:00 - 12:00', subject: 'Mathematics', teacher: 'Ms. Gupta' },
    ]},
];

const assignments: Assignment[] = [
    { id: 'A001', subject: 'Science', title: 'Chapter 5 Exercise', dueDate: '2024-08-10', completed: false },
    { id: 'A002', subject: 'Mathematics', title: 'Algebra Worksheet', dueDate: '2024-08-12', completed: false },
    { id: 'A003', subject: 'History', title: 'Essay on Ancient Rome', dueDate: '2024-08-05', completed: true },
];

const lessonVideos: LessonVideo[] = [
    { id: '1', title: 'Introduction to Photosynthesis', subject: 'Science', teacher: 'Mr. Khan', thumbnailUrl: 'https://picsum.photos/seed/v1/400/225', videoUrl: '#', watched: true, imageHint: 'science education' },
    { id: '2', title: 'The Laws of Motion', subject: 'Science', teacher: 'Mr. Khan', thumbnailUrl: 'https://picsum.photos/seed/v2/400/225', videoUrl: '#', watched: false, imageHint: 'physics diagram' },
    { id: '3', title: 'Solving Linear Equations', subject: 'Mathematics', teacher: 'Ms. Gupta', thumbnailUrl: 'https://picsum.photos/seed/v3/400/225', videoUrl: '#', watched: true, imageHint: 'math equations' },
    { id: '4', title: 'Introduction to Trigonometry', subject: 'Mathematics', teacher: 'Ms. Gupta', thumbnailUrl: 'https://picsum.photos/seed/v4/400/225', videoUrl: '#', watched: false, imageHint: 'math geometry' },
    { id: '5', title: 'Shakespeare\'s Sonnets', subject: 'English', teacher: 'Mr. Sharma', thumbnailUrl: 'https://picsum.photos/seed/v5/400/225', videoUrl: '#', watched: false, imageHint: 'literature book' },
];

const quizzes: Quiz[] = [
    { id: 'QZ001', title: 'Science - Chapter 1', subject: 'Science', questions: [
        { id: 'q1', text: 'What is the chemical formula for water?', options: [ {id: 'o1', text: 'H2O'}, {id: 'o2', text: 'CO2'}, {id: 'o3', text: 'NaCl'} ], correctOptionId: 'o1' }
    ]}
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

export async function getQuizzes(): Promise<Quiz[]> {
    return quizzes;
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
    // Generate sample data for the last 7 days
    const data = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            active: Math.floor(Math.random() * (i + 1) * 3) + 5, // Random active students
            completed: Math.floor(Math.random() * (i + 1) * 2) + 2, // Random completed lessons
        });
    }
    return data;
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

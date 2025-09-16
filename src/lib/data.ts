
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import type { Student, Course, Performance, TimetableEntry, Assignment, LessonVideo, Teacher, Quiz, ModuleResult } from './types';

// Data access functions
export async function getStudents(): Promise<Student[]> {
  const studentsCol = collection(db, 'students');
  const studentSnapshot = await getDocs(studentsCol);
  const studentList = studentSnapshot.docs.map(doc => doc.data() as Student);
  return studentList;
}

export async function getStudentById(id: string): Promise<Student | undefined> {
  const studentDocRef = doc(db, 'students', id);
  const studentSnap = await getDoc(studentDocRef);
  if (studentSnap.exists()) {
    return studentSnap.data() as Student;
  }
  return undefined;
}

export async function getTeachers(): Promise<Teacher[]> {
    const teachersCol = collection(db, 'teachers');
    const teacherSnapshot = await getDocs(teachersCol);
    const teacherList = teacherSnapshot.docs.map(doc => doc.data() as Teacher);
    return teacherList;
}

export async function getCourses(): Promise<Course[]> {
  const coursesCol = collection(db, 'courses');
  const courseSnapshot = await getDocs(coursesCol);
  const courseList = courseSnapshot.docs.map(doc => doc.data() as Course);
  return courseList;
}

export async function getQuizzes(): Promise<Quiz[]> {
    const quizzesCol = collection(db, 'quizzes');
    const quizSnapshot = await getDocs(quizzesCol);
    const quizList = quizSnapshot.docs.map(doc => doc.data() as Quiz);
    return quizList;
}

export async function getPerformanceByStudentId(studentId: string): Promise<Performance[]> {
  const performancesCol = collection(db, 'performances');
  const q = query(performancesCol, where('studentId', '==', studentId));
  const performanceSnapshot = await getDocs(q);
  const performanceList = performanceSnapshot.docs.map(doc => doc.data() as Performance);
  return performanceList;
}

export async function getSummaryStats() {
    const students = await getStudents();
    const performances = (await getDocs(collection(db, 'performances'))).docs.map(d => d.data() as Performance);
    const courses = await getCourses();

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
    const timetableCol = collection(db, 'timetable');
    const timetableSnapshot = await getDocs(timetableCol);
    const timetableList = timetableSnapshot.docs.map(doc => doc.data() as TimetableEntry);

    const today = new Date().getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[today];
    
    if (today > 0 && today < 6) {
        const todaySchedule = timetableList.find(t => t.day === currentDay);
        if (todaySchedule && timetableList.length > 0 && timetableList[0].day !== currentDay) {
            const otherDays = timetableList.filter(t => t.day !== currentDay);
            return [todaySchedule, ...otherDays];
        }
    }
    return timetableList;
}

export async function getAssignments(): Promise<Assignment[]> {
    const assignmentsCol = collection(db, 'assignments');
    const assignmentSnapshot = await getDocs(assignmentsCol);
    const assignmentList = assignmentSnapshot.docs.map(doc => doc.data() as Assignment);
    return assignmentList;
}

export async function getLessonVideos(): Promise<LessonVideo[]> {
    const lessonVideosCol = collection(db, 'lessonVideos');
    const videoSnapshot = await getDocs(lessonVideosCol);
    const videoList = videoSnapshot.docs.map(doc => doc.data() as LessonVideo);
    return videoList;
}

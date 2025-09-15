
import { getFirebaseAdmin } from './firebase-admin';
import { Student, Teacher, Course, Performance, TimetableEntry, Assignment, LessonVideo, Quiz } from './types';

// Mock data to be seeded
const students: (Student & { tempPassword?: string })[] = [
  { id: '1', name: 'Ravi Kumar', avatar: 'https://picsum.photos/seed/1/100/100', imageHint: 'student portrait', email: 'ravi.kumar@example.com', class: '10A', attendance: 92, overallScore: 88, tempPassword: 'password' },
  { id: '2', name: 'Priya Sharma', avatar: 'https://picsum.photos/seed/2/100/100', imageHint: 'student portrait', email: 'priya.sharma@example.com', class: '10A', attendance: 95, overallScore: 94, tempPassword: 'password' },
  { id: '3', name: 'Amit Singh', avatar: 'https://picsum.photos/seed/3/100/100', imageHint: 'student portrait', email: 'amit.singh@example.com', class: '10A', attendance: 88, overallScore: 76, tempPassword: 'password' },
  { id: '4', name: 'Sneha Patel', avatar: 'https://picsum.photos/seed/4/100/100', imageHint: 'student portrait', email: 'sneha.patel@example.com', class: '10A', attendance: 98, overallScore: 91, tempPassword: 'password' },
  { id: '5', name: 'Mohit Verma', avatar: 'https://picsum.photos/seed/5/100/100', imageHint: 'student portrait', email: 'mohit.verma@example.com', class: '10A', attendance: 75, overallScore: 65, tempPassword: 'password' },
];

const teachers: Teacher[] = [
    { id: 't-1', name: 'Mr. Sharma', email: 'teacher@example.com', avatar: 'https://picsum.photos/seed/teacher/100/100', imageHint: 'teacher portrait', role: 'Class Teacher' },
    { id: 't-2', name: 'Ms. Gupta', email: 'faculty@example.com', avatar: 'https://picsum.photos/seed/faculty1/100/100', imageHint: 'teacher portrait', role: 'Subject Teacher' },
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


async function seedDatabase() {
  const admin = await getFirebaseAdmin();
  const db = admin.firestore();
  const auth = admin.auth();

  const collections = {
    students,
    teachers,
    courses,
    performances,
    timetable,
    assignments,
    lessonVideos,
    quizzes,
  };

  // Create auth users for teachers
  for (const teacher of teachers) {
      try {
          await auth.createUser({
              uid: teacher.id,
              email: teacher.email,
              displayName: teacher.name,
              password: 'password' // Set a default password
          })
      } catch (e: any) {
          if (e.code !== 'auth/uid-already-exists' && e.code !== 'auth/email-already-exists') throw e;
      }
  }


  for (const [name, data] of Object.entries(collections)) {
    console.log(`Seeding ${name}...`);
    const collectionRef = db.collection(name);
    const batch = db.batch();

    for (const item of data) {
      const docRef = collectionRef.doc(item.id);
      batch.set(docRef, item);
    }

    await batch.commit();
    console.log(`${name} seeded successfully.`);
  }

  console.log('Database seeding complete!');
  process.exit(0);
}

seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});

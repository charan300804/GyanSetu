
import { config } from 'dotenv';
config();

import { getFirebaseAdmin } from './firebase-admin';
import { Student, Teacher, Course, Performance, TimetableEntry, Assignment, LessonVideo, Quiz } from './types';

// Mock data to be seeded
const students: (Student & { tempPassword?: string })[] = [];

const teachers: Teacher[] = [];

const courses: Course[] = [];

const performances: Performance[] = [];

const timetable: TimetableEntry[] = [];

const assignments: Assignment[] = [];

const lessonVideos: LessonVideo[] = [];

const quizzes: Quiz[] = [];


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
    
    if (data.length === 0) {
        console.log(`No data to seed for ${name}. Skipping.`);
        continue;
    }

    const batch = db.batch();

    for (const item of data) {
      let docId;
      if ('id' in item && item.id) {
          docId = item.id;
      } else if (name === 'performances') {
          const perf = item as Performance;
          docId = `${perf.studentId}_${perf.courseId}`;
      } else if (name === 'timetable') {
          const tt = item as TimetableEntry;
          docId = tt.day;
      } else {
          // For collections without a predefined ID, Firestore can auto-generate one.
          // However, for this script, we'll enforce IDs for consistency.
          // If we hit this, we should add a case above.
          console.warn(`No ID found for item in ${name}, skipping:`, item);
          continue;
      }

      const docRef = collectionRef.doc(docId);
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

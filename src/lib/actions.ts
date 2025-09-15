
"use server";

import { summarizeStudentPerformance } from "@/ai/flows/summarize-student-performance";
import type { SummarizeStudentPerformanceInput } from "@/ai/flows/summarize-student-performance";
import { getFirebaseAdmin } from "./firebase-admin";
import type { Quiz, Teacher } from "./types";
import { FieldValue } from "firebase-admin/firestore";

type Role = "student" | "parent" | "teacher" | "faculty" | "principal";
export type UserRole = 'Class Teacher' | 'Subject Teacher' | 'Principal';


export async function generateStudentSummary(input: SummarizeStudentPerformanceInput) {
  try {
    const result = await summarizeStudentPerformance(input);
    return { success: true, summary: result.summary };
  } catch (error) {
    return { success: false, error: "Failed to generate summary. Please try again." };
  }
}

// NOTE: The following are placeholder functions for a real authentication system.
// In a production app, you would use Firebase Admin SDK to create/manage users,
// verify passwords (e.g., with Firebase Auth REST API or a custom system),
// and generate JWTs with custom claims for roles.

export async function login(identifier: string, password?: string, role?: Role) {
    const admin = await getFirebaseAdmin();
    const auth = admin.auth();
    // In this prototype, we'll use the identifier to find a user document.
    // The password is not checked.
    try {
        const user = await auth.getUserByEmail(`${identifier}@example.com`);
        if(user) {
            return { success: true, message: `Logged in as ${role}` };
        }
    } catch (e) {
        // User not found, let's check our seeded users.
    }

    if (!identifier) {
        return { success: false, error: "Invalid credentials provided."}
    }
    
    // Simulate a successful login for any non-empty identifier
    return { success: true, message: `Logged in as ${role}` };
}

export async function registerStudent(input: { studentId: string, tempPassword: string, newPassword: string }) {
    const { studentId, tempPassword, newPassword } = input;
    if (!studentId || !tempPassword || !newPassword) {
        return { success: false, error: "Missing required registration fields." };
    }
    
    const admin = await getFirebaseAdmin();
    const db = admin.firestore();
    const studentRef = db.collection('students').doc(studentId);
    const studentDoc = await studentRef.get();

    if (!studentDoc.exists) {
        return { success: false, error: "Invalid Student ID." };
    }

    const studentData = studentDoc.data() as any;

    if (studentData.tempPassword !== tempPassword) {
        return { success: false, error: "Invalid temporary password." };
    }
    
    await admin.auth().createUser({
        uid: studentId,
        email: studentData.email,
        password: newPassword,
        displayName: studentData.name
    });

    await studentRef.update({
      tempPassword: FieldValue.delete(), // Remove temp password
      activated: true,
    });

    return { success: true, userId: studentId };
}

export async function addUser(input: { teacherId: string; password: string; role: UserRole }) {
    const { teacherId, password, role } = input;
     if (!teacherId || !password || !role) {
        return { success: false, error: "Missing required fields." };
    }
    
    const admin = await getFirebaseAdmin();
    const auth = admin.auth();
    const db = admin.firestore();

    try {
        await auth.createUser({
            uid: teacherId,
            password: password,
            // Email will be set by the teacher later. For now, use a placeholder.
            email: `${teacherId}@example.com`, 
        });

        await db.collection('teachers').doc(teacherId).set({
            id: teacherId,
            role: role,
            name: 'New User',
            email: `${teacherId}@example.com`,
            avatar: `https://picsum.photos/seed/${teacherId}/100/100`,
            imageHint: 'portrait person'
        });

        return { success: true, user: { id: teacherId, role } };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateUser(id: string, input: { name: string, email: string, role: UserRole }) {
    const { name, email, role } = input;
     if (!name || !email || !role) {
        return { success: false, error: "Missing required fields." };
    }
    const admin = await getFirebaseAdmin();
    const db = admin.firestore();
    const auth = admin.auth();

    try {
        await auth.updateUser(id, { displayName: name, email });
        await db.collection('teachers').doc(id).update({ name, email, role });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function addQuiz(quiz: Omit<Quiz, 'id'>) {
    const admin = await getFirebaseAdmin();
    const db = admin.firestore();
    const newQuizRef = db.collection('quizzes').doc();
    const newQuiz: Quiz = { ...quiz, id: newQuizRef.id };
    await newQuizRef.set(newQuiz);
    return { success: true, quiz: newQuiz };
}

export async function updateQuiz(id: string, quiz: Partial<Quiz>) {
    const admin = await getFirebaseAdmin();
    const db = admin.firestore();
    await db.collection('quizzes').doc(id).update(quiz);
    return { success: true, quiz: { ...quiz, id } };
}

export async function deleteQuiz(id: string) {
    const admin = await getFirebaseAdmin();
    const db = admin.firestore();
    await db.collection('quizzes').doc(id).delete();
    return { success: true };
}

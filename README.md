# GyanSetu - Digital Learning Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&style=for-the-badge)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-Framework-black?logo=next.js&style=for-the-badge)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind--CSS-3.4-38B2AC?logo=tailwind-css&style=for-the-badge)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Backend-FFCA28?logo=firebase&style=for-the-badge)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)






GyanSetu is a full-stack digital learning platform designed to bridge educational gaps in rural schools. Built with Next.js, Firebase, and Genkit, this application provides a comprehensive suite of tools for teachers, students, parents, and principals to manage learning, track progress, and foster a collaborative educational environment, even in areas with limited internet connectivity.

The platform leverages AI (via Genkit) to provide insightful performance summaries, helping teachers and parents understand a student's academic journey, highlighting strengths and areas for improvement.

---

## ⚠️ Mandatory Setup Steps to Run the App

To resolve the common `PERMISSION_DENIED` and `Firebase Admin credentials are not set` errors, you **must** complete the following two steps after setting up your Firebase project.

### 1. Configure Your Environment File (`.env`)

You must replace the placeholder values in the `.env` file with your **actual** Firebase Admin credentials.

- Open the `.env` file in the root of the project.
- Follow **Step 3A** in the "Getting Started" guide below to get your `project_id`, `client_email`, and `private_key`.
- Paste them into the `.env` file. **The `private_key` must be enclosed in double quotes.**

**Example of a correct `.env` file:**
```env
FIREBASE_PROJECT_ID="your-actual-project-id"
FIREBASE_CLIENT_EMAIL="your-service-account-email@your-project.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_VERY_LONG_PRIVATE_KEY_CONTENT_HERE\n-----END PRIVATE KEY-----\n"
```
**CRITICAL**: When you copy the `private_key` from the JSON file, ensure you copy the entire string, including the `-----BEGIN PRIVATE KEY-----`, `-----END PRIVATE KEY-----`, and all the `\n` characters. It must be pasted inside the double quotes (`"`).

### 2. Deploy Firestore Security Rules

The app will not have permission to read or write to the database until you deploy the security rules.

- Make sure you have the Firebase CLI installed and are logged in (`npm install -g firebase-tools` and `firebase login`).
- In your terminal, at the root of the project, run this command:
  ```bash
  firebase deploy --only firestore:rules
  ```

---

## Core Features

### For Teachers & Faculty
- **Centralized Dashboard**: Get an at-a-glance overview of class performance, average scores, and student attendance.
- **Student Management**: View detailed profiles for each student, including their performance, attendance, and enrolled courses.
- **Course & Content Management**: Create courses and upload lesson materials like videos and notes for different subjects and languages.
- **Quiz Creation**: Build and manage gamified quizzes with a dynamic form that supports multiple questions and options.
- **Progress Tracking**: Monitor student engagement and sync offline lesson progress by scanning a student-generated QR code.
- **AI-Powered Summaries**: Generate AI-driven performance reports for students to identify academic strengths and weaknesses.
- **Secure Messaging**: Communicate securely with students and parents.

### For Students
- **Personalized Dashboard**: View your daily timetable and pending assignments.
- **Lesson Library**: Access a library of video lessons for all your subjects, and track which ones you've watched.
- **Progress Sync**: Generate a unique QR code that contains your latest lesson progress, which can be scanned by a teacher to sync your data offline.
- **Assignments**: Keep track of pending and completed assignments.

### For Principals
- **School-Wide Overview**: A dashboard summarizing key metrics like total students, school-wide average score, and total number of teachers.
- **User Management**: Create, edit, and manage accounts for teachers and faculty members.
- **Class Performance Monitoring**: View performance overviews for specific classes and individual students.

### For Parents
- **Child's Dashboard**: A dedicated view to monitor your child's academic progress, including their overall score, attendance, and enrolled courses.
- **AI Summaries**: Access AI-generated summaries to understand your child's performance.
- **Secure Messaging**: Communicate directly with teachers.

## Technology Stack

- **Framework**: Next.js (App Router)
- **UI**: React, ShadCN UI, Tailwind CSS
- **Backend & Database**: Firebase (Firestore, Authentication)
- **AI**: Google AI & Genkit
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form with Zod for validation

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Firebase CLI](https://firebase.google.com/docs/cli) installed and authenticated (`npm install -g firebase-tools` and `firebase login`).
- A Google account to create a Firebase project.

---

### Step 1: Firebase Project Setup

1.  **Create a Firebase Project**:
    Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.

2.  **Enable Firestore and Authentication**:
    - In your project, navigate to **Build > Firestore Database** and click **Create database**. Start in **Production mode** and choose a location.
    - Go to **Build > Authentication** and click **Get started**. Enable the **Email/Password** sign-in provider.

---

### Step 2: Get Firebase Credentials

You need two sets of credentials: one for the server (Admin SDK) and one for the client (Web SDK).

#### A. Get Server Credentials (Service Account)

1.  In the Firebase Console, go to **Project settings** (click the gear icon ⚙️ next to Project Overview).
2.  Go to the **Service accounts** tab.
3.  Click **Generate new private key**. A JSON file will be downloaded.
4.  Open the downloaded JSON file. You will need the `project_id`, `client_email`, and `private_key` from this file.

#### B. Get Client Credentials (Web App Config)

1.  In **Project settings**, go to the **General** tab.
2.  Scroll down to "Your apps". If you don't have a web app, click the web icon (`</>`) to create one.
3.  Give it a nickname and click **Register app**.
4.  You will be shown a `firebaseConfig` object. Copy this object.

---

### Step 3: Configure Environment Variables

1.  **Set up Server Environment (`.env`)**:
    In the project root, open the `.env` file. Replace the placeholder values with the credentials from your **service account JSON file** (Step 2A).

    ```env
    FIREBASE_PROJECT_ID="your-project-id"
    FIREBASE_CLIENT_EMAIL="your-client-email@example.com"
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_CONTENT\n-----END PRIVATE KEY-----\n"
    ```
    **Important**: The `private_key` is very long and must be enclosed in double quotes (`"`). Copy the entire string from the JSON file, making sure to preserve the `\n` characters.

2.  **Set up Client Environment (`src/lib/firebase.ts`)**:
    Open the file `src/lib/firebase.ts`. The placeholder `firebaseConfig` object has already been populated. Ensure it matches the one you copied from the Firebase console (Step 2B).

---

### Step 4: Set Firestore Security Rules (Critical Fix for Permissions)

The app will fail with a `PERMISSION_DENIED` error if your Firestore rules are too restrictive. For development, you need to allow authenticated users to read and write data.

1.  **Check the Rules File**:
    The `firestore.rules` file in the project root should contain:
    ```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /{document=**} {
          allow read, write: if request.auth != null;
        }
      }
    }
    ```

2.  **Deploy the Rules**:
    In your terminal, at the root of the project, run the following command. This uploads the rules to your Firebase project and is **mandatory** to resolve permission errors.
    ```bash
    firebase deploy --only firestore:rules
    ```

---

### Step 5: Install Dependencies & Seed Database

1.  **Install Packages**:
    Open your terminal in the project root and run:
    ```bash
    npm install
    ```

2.  **Seed the Database (Optional)**:
    To populate Firestore with initial sample data (e.g., users, courses), add data to the arrays in `src/lib/seed-db.ts`, then run:
    ```bash
    npm run db:seed
    ```
    Note: By default, the seed file is empty. Add data to it before running the command if you want sample content.

---

### Step 6: Run the Application

You can now start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:9003`.

You can now use the various login portals. If you haven't seeded the database, you will need to start by creating users via the UI (e.g., a Principal can create Teacher accounts).
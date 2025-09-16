# GyanSetu - Digital Learning Platform

GyanSetu is a full-stack digital learning platform designed to bridge educational gaps in rural schools. Built with Next.js, Firebase, and Genkit, this application provides a comprehensive suite of tools for teachers, students, parents, and principals to manage learning, track progress, and foster a collaborative educational environment, even in areas with limited internet connectivity.

The platform leverages AI (via Genkit) to provide insightful performance summaries, helping teachers and parents understand a student's academic journey, highlighting strengths and areas for improvement.

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

3.  **Update Firestore Security Rules**:
    - Go to the **Rules** tab in the Firestore section.
    - Replace the existing rules with the following to allow authenticated users to read/write for development purposes. Click **Publish**.
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
    FIREBASE_PRIVATE_KEY="your-private-key"
    ```
    **Important**: The `private_key` is very long and must be enclosed in double quotes (`"`). It starts with `-----BEGIN PRIVATE KEY-----\n` and ends with `\n-----END PRIVATE KEY-----\n`. Copy the entire string, making sure to preserve the `\n` characters.

2.  **Set up Client Environment (`src/lib/firebase.ts`)**:
    Open the file `src/lib/firebase.ts`. Replace the placeholder `firebaseConfig` object with the one you copied from the Firebase console (Step 2B).

---

### Step 4: Install Dependencies & Seed Database

1.  **Install Packages**:
    Open your terminal in the project root and run:
    ```bash
    npm install
    ```

2.  **Seed the Database**:
    To populate Firestore with initial sample data (e.g., users, courses), first add data to the arrays in `src/lib/seed-db.ts`, then run:
    ```bash
    npm run db:seed
    ```
    This will create the necessary users and collections in your Firestore database. Note: by default the seed file is empty.

---

### Step 5: Run the Application

You can now start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

You can now use the various login portals:
- **Student Login**: Use the credentials you added to `src/lib/seed-db.ts` or use the registration flow.
- **Administrator Login**: Use the "teacher" or "faculty" login, which will use the seeded teacher accounts.
- **Parent Login**: Use the student's credentials to log in as a parent.

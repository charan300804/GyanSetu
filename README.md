# GyanSetu - Digital Learning Platform

This is a Next.js application for a digital learning platform called "GyanSetu," built using Firebase Studio. The app features role-based access for students, teachers, parents, and principals, with functionality for course management, progress tracking, and AI-powered summaries.

## Features

- **Role-Based Dashboards**: Separate, tailored dashboards for Students, Teachers, Parents, and Principals.
- **Firebase Integration**: Uses Firestore for the database and Firebase Authentication for users.
- **AI-Powered Insights**: Leverages Genkit to provide AI-generated summaries of student performance.
- **Component-Based UI**: Built with Next.js, React, ShadCN UI, and Tailwind CSS.
- **User & Course Management**: Functionality for principals to manage users and for teachers to manage courses and quizzes.
- **Progress Tracking**: Includes features for tracking student progress, including QR code syncing.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Firebase CLI](https://firebase.google.com/docs/cli) installed and authenticated (`npm install -g firebase-tools` and `firebase login`).

---

### Step 1: Firebase Project Setup

1.  **Create a Firebase Project**:
    Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.

2.  **Create a Firestore Database**:
    In your new project, navigate to **Build > Firestore Database** and click **Create database**.
    - Start in **Production mode**. You will update the security rules in the next step.
    - Choose a location for your database.

3.  **Update Firestore Security Rules**:
    Go to the **Rules** tab in the Firestore section. Paste the following rules and click **Publish**. This allows any authenticated user to read/write to the database for development purposes.
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
4.  Open the downloaded JSON file. You will need the `project_id`, `client_email`, and `private_key` from this file for the next step.

#### B. Get Client Credentials (Web App Config)

1.  In **Project settings**, go to the **General** tab.
2.  Scroll down to "Your apps". If you don't have a web app, click the web icon (`</>`) to create one.
3.  Give it a nickname and click **Register app**.
4.  You will be shown a `firebaseConfig` object. This contains the credentials for your frontend application.

---

### Step 3: Configure Environment Variables

1.  **Set up Server Environment (`.env`)**:
    In the root of the project, there is a `.env` file. Open it and replace the placeholder values with the credentials from your **service account JSON file** (Step 2A).

    ```env
    FIREBASE_PROJECT_ID="your-project-id"
    FIREBASE_CLIENT_EMAIL="your-client-email@example.com"
    FIREBASE_PRIVATE_KEY="your-private-key"
    ```
    **Important**: The `private_key` is very long and must be enclosed in double quotes (`"`). It starts with `-----BEGIN PRIVATE KEY-----\n` and ends with `\n-----END PRIVATE KEY-----\n`.

2.  **Set up Client Environment (`src/lib/firebase.ts`)**:
    Open the file `src/lib/firebase.ts`. Replace the placeholder `firebaseConfig` object with the one you got from the Firebase console (Step 2B).

    ```typescript
    // src/lib/firebase.ts

    const firebaseConfig = {
      // Paste your web app's firebaseConfig object here
      projectId: "...",
      appId: "...",
      storageBucket: "...",
      apiKey: "...",
      authDomain: "...",
      messagingSenderId: "...",
    };
    ```

---

### Step 4: Install Dependencies

Open your terminal in the project root and run:

```bash
npm install
```

This will install all the necessary packages for the project.

---

### Step 5: Seed the Database

To populate your Firestore database with the initial set of data (students, teachers, etc.), run the following command:

```bash
npm run db:seed
```
This script reads the data from `src/lib/seed-db.ts` and populates the corresponding collections in Firestore. If you wish to start with a clean database, you can empty the data arrays in this file before running the script.

---

### Step 6: Run the Application

You can now start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

## Available Login Credentials

You can use the following credentials to log in and test different roles. The password for all pre-seeded users is `password`.

- **Student**: `s-1`
- **Parent**: Log in with student ID `s-1` and any password.
- **Class Teacher**: `t-1`
- **Subject Teacher / Faculty**: `t-2`
- **Principal**: `p-1`

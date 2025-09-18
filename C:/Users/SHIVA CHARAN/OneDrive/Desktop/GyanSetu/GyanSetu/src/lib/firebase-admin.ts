
"use server";

import admin from "firebase-admin";

// This is a singleton to ensure we only initialize the app once.
let app: admin.app.App;

export async function getFirebaseAdmin() {
  if (app) {
    return app;
  }

  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // The private key must have newline characters correctly formatted.
    // When reading from .env, "\\n" can be interpreted as a literal string.
    // This explicitly replaces it with the newline character `\n`.
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  };

  if (
    !serviceAccount.projectId ||
    !serviceAccount.clientEmail ||
    !serviceAccount.privateKey ||
    serviceAccount.projectId === "your-project-id" ||
    serviceAccount.clientEmail === "your-client-email@example.com"
  ) {
    throw new Error(
      "Firebase Admin credentials are not set or are still using placeholder values in the .env file. Please replace the placeholder values with your actual Firebase service account credentials."
    );
  }

  try {
     if (!admin.apps.length) {
        app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
     } else {
        app = admin.app();
     }
  } catch (error: any) {
    console.error("Firebase Admin Initialization Error:", error);
    // This can happen if the app is already initialized, especially with HMR.
    if (error.code === 'app/duplicate-app') {
        app = admin.app();
    } else {
        throw new Error(`Failed to initialize Firebase Admin SDK: ${error.message}`);
    }
  }

  return app;
}

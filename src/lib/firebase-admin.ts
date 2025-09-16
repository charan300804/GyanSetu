
import "server-only";
import admin from "firebase-admin";

// This is a singleton to ensure we only initialize the app once.
let app: admin.app.App;

export async function getFirebaseAdmin() {
  if (app) {
    return app;
  }

  // These variables are stored in .env and are not checked into source control.
  // In a deployed environment (like App Hosting), you would set these as
  // environment variables.
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  };

  if (
    !serviceAccount.projectId ||
    !serviceAccount.clientEmail ||
    !serviceAccount.privateKey
  ) {
    throw new Error(
      "Firebase Admin credentials are not set in the environment variables. Please ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set."
    );
  }

  try {
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    // This can happen if the app is already initialized, especially with HMR.
    if (error.code === 'app/duplicate-app') {
        app = admin.app();
    } else {
        console.error("Firebase Admin Initialization Error:", error);
        throw new Error(`Failed to initialize Firebase Admin SDK: ${error.message}`);
    }
  }

  return app;
}

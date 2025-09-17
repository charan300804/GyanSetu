
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "studio-7874095259-70480",
  "appId": "1:1006001643238:web:72254649bca03130b4e527",
  "storageBucket": "studio-7874095259-70480.firebasestorage.app",
  "apiKey": "AIzaSyB_o_1jbn1OIvajRkE2Fd3Tu1fg3zbF8e4",
  "authDomain": "studio-7874095259-70480.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "1006001643238"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };

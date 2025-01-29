import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrL1dcWdkY_sCNmiawrFtIGlYmSla7gPM",
  authDomain: "planit-60c12.firebaseapp.com",
  projectId: "planit-60c12",
  storageBucket: "planit-60c12.firebasestorage.app",
  messagingSenderId: "106222411071",
  appId: "1:106222411071:web:25cf0b5cf47ed31f88478a",
  measurementId: "G-JWBY1WMP4H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Only initialize analytics on the client side
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics }; 
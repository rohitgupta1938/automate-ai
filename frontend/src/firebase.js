
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "automate-ai-f17c2.firebaseapp.com",
  projectId: "automate-ai-f17c2",
  storageBucket: "automate-ai-f17c2.firebasestorage.app",
  messagingSenderId: "233549784335",
  appId: "1:233549784335:web:38c0c6bfc7da1d028e4a7a"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()
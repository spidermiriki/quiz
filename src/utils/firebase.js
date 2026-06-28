import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDw1_xeMW14ITKO0iYNP__YWLZ5JUXwEeI",
  authDomain: "quizz-2a3f3.firebaseapp.com",
  projectId: "quizz-2a3f3",
  storageBucket: "quizz-2a3f3.firebasestorage.app",
  messagingSenderId: "231182803320",
  appId: "1:231182803320:web:806da3777cad1417f4a88d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

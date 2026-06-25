import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXd7WiPpZj5zy-KNVt5QWjG3VrHiFN9Zo",
  authDomain: "notes2-276d7.firebaseapp.com",
  projectId: "notes2-276d7",
  storageBucket: "notes2-276d7.firebasestorage.app",
  messagingSenderId: "563712501132",
  appId: "1:563712501132:web:3a933ca4de491b78cba2a9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
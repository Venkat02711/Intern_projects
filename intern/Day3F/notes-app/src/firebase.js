import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDSaofy63Ly94x7o5ctgUyq0OQYAprVNv4",
    authDomain: "notes-app-b7dbc.firebaseapp.com",
    projectId: "notes-app-b7dbc",
    storageBucket: "notes-app-b7dbc.firebasestorage.app",
    messagingSenderId: "1021372951446",
    appId: "1:1021372951446:web:0071138b3dc80c0fab8bb7",
    measurementId: "G-E4VXK429ES"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
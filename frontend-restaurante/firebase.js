// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBbSvH-Li0aIiclJZ9XxLpgJvlpfR9xuBM",
    authDomain: "poi-videochat.firebaseapp.com",
    projectId: "poi-videochat",
    storageBucket: "poi-videochat.appspot.com",
    messagingSenderId: "905670429868",
    appId: "1:905670429868:web:33a3d0243c7e8ad426e309",
    measurementId: "G-C51LJ7CZ77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxWx7pgUP-luY-HidVRW2uT01fGfCC0qE",
  authDomain: "twitter-tailwind-9c054.firebaseapp.com",
  projectId: "twitter-tailwind-9c054",
  storageBucket: "twitter-tailwind-9c054.appspot.com",
  messagingSenderId: "191954050677",
  appId: "1:191954050677:web:8f24624a49734d50d5a23c",
  measurementId: "G-CVHQ8EGTMY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
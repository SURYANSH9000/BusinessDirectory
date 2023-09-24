// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Add this import for Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAfdQqgMC08Xyjo0zbFXE3m_PpTq2HDz98",
  authDomain: "business-directory-6b8f8.firebaseapp.com",
  projectId: "business-directory-6b8f8",
  storageBucket: "business-directory-6b8f8.appspot.com",
  messagingSenderId: "58439757623",
  appId: "1:58439757623:web:3159a4fb961be0f70a74b2",
  measurementId: "G-9BLM70NNDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { app , auth  };
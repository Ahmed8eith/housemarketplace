// src/firebase.config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import getAuth

const firebaseConfig = {
  apiKey: "AIzaSyD7LEpcq6HsOGX9Xn0pCYhnQYhAxPG-YUo",
  authDomain: "house-marketplace-79c99.firebaseapp.com",
  projectId: "house-marketplace-79c99",
  storageBucket: "house-marketplace-79c99.firebasestorage.app",
  messagingSenderId: "622416836891",
  appId: "1:622416836891:web:3d9925baf7afebe652fbbe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth instance and Firestore
export const auth = getAuth(app); // Export the initialized Auth instance
export const db = getFirestore(app);

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
// Replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyCTdNNqlwyaUdVoG3hsbmdtrkGl2wKTQgE",
  authDomain: "hotel-finder-504fb.firebaseapp.com",
  projectId: "hotel-finder-504fb",
  storageBucket: "hotel-finder-504fb.firebasestorage.app",
  messagingSenderId: "533665938262",
  appId: "1:533665938262:web:dc20a37646de798227f4f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

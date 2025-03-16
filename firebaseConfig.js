// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase configuration
const firebaseConfig = {

  apiKey: "",

  authDomain: "",

  projectId: "",

  storageBucket: "",

  messagingSenderId: "",

  appId: ""

  
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// Export initialized instances for use in your app
export { app, auth, firestore, storage };
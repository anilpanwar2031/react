import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBxJwC7N8Uwc_aTDgQ-WpgQOTYqM0uUj4",
  authDomain: "asc-c54d8.firebaseapp.com",
  databaseURL: "https://asc-c54d8-default-rtdb.firebaseio.com",
  projectId: "asc-c54d8",
  storageBucket: "asc-c54d8.appspot.com",
  messagingSenderId: "32424224002",
  appId: "1:32424224002:web:e73e2ee753f046e4e04e1b",
  measurementId: "G-P8P914Z6TE"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);   
export default app;
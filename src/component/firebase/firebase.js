import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDtLXNyVHKHSQjvDDiptJuUU9q1DVL5SUA",
  authDomain: "todo-app-74044.firebaseapp.com",
  projectId: "todo-app-74044",
  storageBucket: "todo-app-74044.appspot.com",
  messagingSenderId: "464533683893",
  appId: "1:464533683893:web:3072ddec81100e3d33c8fc",
  measurementId: "G-4TVZRYS5TS"
};
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
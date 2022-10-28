// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxfCUpi3rOv4nEFLsJjmtDpWuq3XnBhKE",
  authDomain: "ryukyutwo-1c3ce.firebaseapp.com",
  projectId: "ryukyutwo-1c3ce",
  storageBucket: "ryukyutwo-1c3ce.appspot.com",
  messagingSenderId: "168972400180",
  appId: "1:168972400180:web:3d6dbe62de96a6b5c2fc61",
  measurementId: "G-KM1NV34LCN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); //Use this variable to access Firebase tools
const analytics = getAnalytics(app);
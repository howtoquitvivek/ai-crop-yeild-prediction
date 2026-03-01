import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-quHFjtxA2pdk_R72lus6jvREy2FSBw4",
  authDomain: "aicyp-6.firebaseapp.com",
  projectId: "aicyp-6",
  storageBucket: "aicyp-6.firebasestorage.app",
  messagingSenderId: "436854630143",
  appId: "1:436854630143:web:da52369d7c8a42ccf94eca",
  measurementId: "G-27Y8E0TQSC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
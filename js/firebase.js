// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChs_IqKsqRG7BJyT5Nr6_G6SF-qMOFyGU",
  authDomain: "postpilot-136.firebaseapp.com",
  projectId: "postpilot-136",
  storageBucket: "postpilot-136.firebasestorage.app",
  messagingSenderId: "935509197267",
  appId: "1:935509197267:web:14f14bfed345582160af26",
  measurementId: "G-F2TDC362VC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

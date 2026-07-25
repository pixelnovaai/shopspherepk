// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyClUl486Em2Cq4PjOtal-3B-Gt_I5NqPCY",
  authDomain: "nexacart-94526.firebaseapp.com",
  projectId: "nexacart-94526",
  storageBucket: "nexacart-94526.firebasestorage.app",
  messagingSenderId: "843284374047",
  appId: "1:843284374047:web:b8e18e6ed7b5326641eb2a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
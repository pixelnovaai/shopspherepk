import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login Successful!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});
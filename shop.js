import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyClUl486Em2Cq4PjOtal-3B-Gt_I5NqPCY",
  authDomain: "nexacart-94526.firebaseapp.com",
  projectId: "nexacart-94526",
  storageBucket: "nexacart-94526.firebasestorage.app",
  messagingSenderId: "843284374047",
  appId: "1:843284374047:web:b8e18e6ed7b5326641eb2a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productsContainer = document.getElementById("products");

async function loadProducts() {
  productsContainer.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "products"));

  querySnapshot.forEach((doc) => {
    const product = doc.data();

    productsContainer.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card h-100 shadow">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body text-center">
            <h5>${product.name}</h5>
            <h4 class="text-danger">${product.price}</h4>
            <a href="${product.link}" target="_blank" class="btn btn-warning">
              Buy Now
            </a>
          </div>
        </div>
      </div>
    `;
  });
}

loadProducts();
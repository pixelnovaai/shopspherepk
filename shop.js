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
            <a href="${product.link}" target="_blank" class="btn btn-warning w-100 mb-2">
             Buy Now
            </a>

            <button class="btn btn-dark w-100 add-cart"
            data-id="${doc.id}"
            data-name="${product.name}"
            data-price="${product.price}"
            data-image="${product.image}">
            🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

loadProducts();
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-cart")) {

    const product = {
      id: e.target.dataset.id,
      name: e.target.dataset.name,
      price: e.target.dataset.price,
      image: e.target.dataset.image
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
  }
});
console.log("shop.js loaded");
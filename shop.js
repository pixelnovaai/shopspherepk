import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ========================================
// FIREBASE
// ========================================

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


// ========================================
// LOAD PRODUCTS
// ========================================

async function loadProducts() {

  if (!productsContainer) return;

  productsContainer.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-warning"></div>
      <p class="mt-3">Loading products...</p>
    </div>
  `;

  try {

    const snapshot = await getDocs(
      collection(db, "products")
    );

    productsContainer.innerHTML = "";

    if (snapshot.empty) {

      productsContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <h4>No products found</h4>
          <p class="text-muted">
            Add products from Firebase.
          </p>
        </div>
      `;

      return;
    }


    snapshot.forEach((doc) => {

      const product = doc.data();

      // Product name
      const name =
        product.name || "Product";


      // ========================================
      // PRICE FIX
      // Firebase price can be STRING or NUMBER
      // ========================================

      let rawPrice = product.price;

      let price = Number(
        String(rawPrice ?? "")
          .replace(/Rs\.?/gi, "")
          .replace(/,/g, "")
          .trim()
      );

      if (!Number.isFinite(price)) {
        price = 0;
      }

      const formattedPrice =
        price.toLocaleString("en-PK");


      // Image
      const image =
        product.image ||
        "https://via.placeholder.com/500x400?text=Product";


      // Link
      const link =
        product.link || "#";


      // ========================================
      // PRODUCT CARD
      // ========================================

      productsContainer.innerHTML += `

        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">

          <div class="card product-card h-100">

            <div class="product-image">

              <img
                src="${image}"
                class="card-img-top"
                alt="${name}"
                loading="lazy"
              >

            </div>


            <div class="card-body d-flex flex-column">

              <h5 class="product-name">
                ${name}
              </h5>


              <div class="product-rating mb-2">
                ⭐⭐⭐⭐⭐
              </div>


              <h4 class="product-price text-danger fw-bold">
                Rs. ${formattedPrice}
              </h4>


              <div class="mt-auto">

                <a
                  href="${link}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-warning w-100 mb-2"
                >
                  Buy Now
                </a>


                <button
                  type="button"
                  class="btn btn-dark w-100 add-cart"
                  data-id="${doc.id}"
                  data-name="${name}"
                  data-price="${price}"
                  data-image="${image}"
                >
                  🛒 Add to Cart
                </button>

              </div>

            </div>

          </div>

        </div>

      `;

    });


  } catch (error) {

    console.error("Firebase Error:", error);

    productsContainer.innerHTML = `

      <div class="col-12 text-center py-5">

        <h4 class="text-danger">
          Unable to load products
        </h4>

        <p class="text-muted">
          ${error.message}
        </p>

      </div>

    `;

  }

}


// ========================================
// ADD TO CART
// ========================================

document.addEventListener("click", function (e) {

  const button = e.target.closest(".add-cart");

  if (!button) return;


  const product = {

    id: button.dataset.id,

    name: button.dataset.name,

    price: Number(button.dataset.price) || 0,

    image: button.dataset.image,

    quantity: 1

  };


  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


  const existing =
    cart.find(item => item.id === product.id);


  if (existing) {

    existing.quantity =
      (Number(existing.quantity) || 0) + 1;

  } else {

    cart.push(product);

  }


  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );


  updateCartCount();

  alert("✅ Product added to cart!");

});


// ========================================
// CART COUNT
// ========================================

function updateCartCount() {

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];


  const total =
    cart.reduce(
      (sum, item) =>
        sum + (Number(item.quantity) || 1),
      0
    );


  const badge =
    document.getElementById("cartCount");


  if (badge) {

    badge.innerText = total;

  }

}


// ========================================
// START
// ========================================

loadProducts();

updateCartCount();
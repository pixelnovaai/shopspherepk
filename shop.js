import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ================================
// FIREBASE CONFIG
// ================================

const firebaseConfig = {
  apiKey: "AIzaSyClUl486Em2Cq4PjOtal-3B-Gt_I5NqPCY",
  authDomain: "nexacart-94526.firebaseapp.com",
  projectId: "nexacart-94526",
  storageBucket: "nexacart-94526.firebasestorage.app",
  messagingSenderId: "843284374047",
  appId: "1:843284374047:web:b8e18e6ed7b5326641eb2a"
};


// ================================
// INITIALIZE FIREBASE
// ================================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productsContainer = document.getElementById("products");


// ================================
// LOAD PRODUCTS
// ================================

async function loadProducts() {

  if (!productsContainer) {
    console.error("Products container not found!");
    return;
  }

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
            Add products in Firebase Firestore.
          </p>
        </div>
      `;

      return;
    }


    snapshot.forEach((doc) => {

      const product = doc.data();

      console.log("Firebase Product:", product);


      // ================================
      // PRODUCT DATA
      // ================================

      const name =
        String(product.name ?? "Product");


      /*
        IMPORTANT:
        Price ko String mein convert kar rahe hain.
        Is se Firebase mein price String ho
        ya Number, dono work karenge.
      */

      let price = product.price;

      if (
        price === undefined ||
        price === null ||
        price === ""
      ) {
        price = "Price not available";
      } else {
        price = String(price).trim();
      }


      const image =
        String(
          product.image ??
          "https://via.placeholder.com/500x400?text=Product"
        );


      const link =
        String(product.link ?? "#");


      // ================================
      // PRODUCT CARD
      // ================================

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
                Rs. ${price}
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

    console.error(
      "Firebase Error:",
      error
    );


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


// ================================
// ADD TO CART
// ================================

document.addEventListener(
  "click",
  function (event) {

    const button =
      event.target.closest(".add-cart");

    if (!button) return;


    const product = {

      id: button.dataset.id,

      name: button.dataset.name,

      price: button.dataset.price,

      image: button.dataset.image,

      quantity: 1

    };


    let cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];


    const existingProduct =
      cart.find(
        item => item.id === product.id
      );


    if (existingProduct) {

      existingProduct.quantity =
        (existingProduct.quantity || 1) + 1;

    } else {

      cart.push(product);

    }


    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );


    updateCartCount();


    alert("Product added to cart!");

  }
);


// ================================
// CART COUNTER
// ================================

function updateCartCount() {

  const cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];


  const totalItems =
    cart.reduce(
      (total, item) =>
        total + Number(item.quantity || 1),
      0
    );


  const badge =
    document.getElementById("cartCount");


  if (badge) {

    badge.innerText = totalItems;

  }

}


// ================================
// START
// ================================

loadProducts();

updateCartCount();
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// =====================================================
// FIREBASE CONFIG
// =====================================================

const firebaseConfig = {
  apiKey: "AIzaSyClUl486Em2Cq4PjOtal-3B-Gt_I5NqPCY",
  authDomain: "nexacart-94526.firebaseapp.com",
  projectId: "nexacart-94526",
  storageBucket: "nexacart-94526.firebasestorage.app",
  messagingSenderId: "843284374047",
  appId: "1:843284374047:web:b8e18e6ed7b5326641eb2a"
};


// =====================================================
// INITIALIZE FIREBASE
// =====================================================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// =====================================================
// ELEMENTS
// =====================================================

const homeProducts = document.getElementById("homeProducts");
const cartCount = document.getElementById("cartCount");


// =====================================================
// LOAD HOME PRODUCTS
// =====================================================

async function loadHomeProducts() {

  // Agar index.html mein products section nahi hai
  if (!homeProducts) {
    console.warn("homeProducts element not found in index.html");
    return;
  }

  // Loading message
  homeProducts.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-warning"></div>
      <p class="mt-3 text-muted">
        Loading products...
      </p>
    </div>
  `;


  try {

    const snapshot = await getDocs(
      collection(db, "products")
    );


    // Clear loading
    homeProducts.innerHTML = "";


    // No products
    if (snapshot.empty) {

      homeProducts.innerHTML = `
        <div class="col-12 text-center py-5">

          <h4>No products available yet.</h4>

          <p class="text-muted">
            Products will appear here once they are added.
          </p>

        </div>
      `;

      return;
    }


    // =================================================
    // DISPLAY PRODUCTS
    // =================================================

    snapshot.forEach((doc) => {

      const product = doc.data();


      const name =
        product.name ||
        "Nova Mart Product";


      const price =
        product.price !== undefined &&
        product.price !== null &&
        product.price !== ""
          ? product.price
          : "Price not available";


      const image =
        product.image ||
        "https://via.placeholder.com/500x400?text=Nova+Mart";


      const link =
        product.link ||
        "shop.html";


      homeProducts.innerHTML += `

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


              <h4 class="product-price mb-3">
                Rs. ${price}
              </h4>


              <div class="mt-auto">

                <a
                  href="${link}"
                  class="btn btn-warning w-100 mb-2"
                  target="_blank"
                >
                  Buy Now
                  <i class="bi bi-arrow-right"></i>
                </a>


                <button
                  type="button"
                  class="btn btn-dark w-100 add-cart"
                  data-id="${doc.id}"
                  data-name="${name}"
                  data-price="${price}"
                  data-image="${image}"
                >
                  <i class="bi bi-cart3"></i>
                  Add to Cart
                </button>

              </div>

            </div>

          </div>

        </div>

      `;

    });


  } catch (error) {

    console.error(
      "Nova Mart Firebase Error:",
      error
    );


    homeProducts.innerHTML = `

      <div class="col-12 text-center py-5">

        <h4 class="text-danger">
          Products could not be loaded.
        </h4>

        <p class="text-muted">
          Please check Firebase and Firestore.
        </p>

      </div>

    `;

  }

}


// =====================================================
// ADD TO CART
// =====================================================

document.addEventListener("click", (event) => {

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

    existingProduct.quantity += 1;

  } else {

    cart.push(product);

  }


  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );


  updateCartCount();


  // Button feedback
  const oldText = button.innerHTML;

  button.innerHTML = `
    <i class="bi bi-check-circle"></i>
    Added to Cart
  `;


  button.disabled = true;


  setTimeout(() => {

    button.innerHTML = oldText;

    button.disabled = false;

  }, 1200);

});


// =====================================================
// CART COUNTER
// =====================================================

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


  if (cartCount) {

    cartCount.innerText =
      totalItems;

  }

}


// =====================================================
// SEARCH
// =====================================================

const searchForm =
  document.getElementById(
    "homeSearchForm"
  );


const searchInput =
  document.getElementById(
    "homeSearch"
  );


if (searchForm) {

  searchForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const search =
        searchInput
          ? searchInput.value.trim()
          : "";


      if (search) {

        window.location.href =
          `shop.html?search=${encodeURIComponent(search)}`;

      } else {

        window.location.href =
          "shop.html";

      }

    }
  );

}


// =====================================================
// START
// =====================================================

loadHomeProducts();

updateCartCount();
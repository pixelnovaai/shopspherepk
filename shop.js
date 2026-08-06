import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ========================================
// FIREBASE CONFIG
// ========================================

const firebaseConfig = {
  apiKey: "AIzaSyClUl486Em2Cq4PjOtal-3B-Gt_I5NqPCY",
  authDomain: "nexacart-94526.firebaseapp.com",
  projectId: "nexacart-94526",
  storageBucket: "nexacart-94526.firebasestorage.app",
  messagingSenderId: "843284374047",
  appId: "1:843284374047:web:b8e18e6ed7b5326641eb2a"
};


// ========================================
// FIREBASE
// ========================================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productsContainer = document.getElementById("products");


// ========================================
// LOAD PRODUCTS
// ========================================

async function loadProducts() {

  if (!productsContainer) {
    console.error("Products container not found.");
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
          <h4>No Products Found</h4>
          <p class="text-muted">
            Add products from Firebase.
          </p>
        </div>
      `;

      return;
    }


    snapshot.forEach((doc) => {

      const product = doc.data();


      // PRODUCT NAME

      const name =
        product.name
          ? String(product.name)
          : "Product";


      // ========================================
      // PRICE FIX
      // Handles String + Number
      // ========================================

      let price = product.price;

      if (
        price === undefined ||
        price === null ||
        price === ""
      ) {
        price = "0";
      }

      // Convert price to string first
      price = String(price);

      // Remove Rs, commas and spaces
      price = price
        .replace(/Rs\.?/gi, "")
        .replace(/,/g, "")
        .trim();

      // Convert to number
      const numericPrice = Number(price);

      // Final display price
      const displayPrice =
        Number.isNaN(numericPrice)
          ? price
          : numericPrice.toLocaleString("en-PK");


      // IMAGE

      const image =
        product.image ||
        "https://via.placeholder.com/500x400?text=Nova+Mart";


      // LINK

      const link =
        product.link ||
        "#";


      // ========================================
      // PRODUCT CARD
      // ========================================

      productsContainer.innerHTML += `

        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">

          <div class="card product-card h-100 shadow-sm">

            <div class="product-image">

              <img
                src="${image}"
                class="card-img-top"
                alt="${name}"
                loading="lazy"
                onerror="this.src='https://via.placeholder.com/500x400?text=Product'"
              >

            </div>


            <div class="card-body d-flex flex-column">

              <h5 class="product-name fw-bold">
                ${name}
              </h5>


              <p class="mb-2">
                ⭐⭐⭐⭐⭐
              </p>


              <h4 class="product-price text-danger fw-bold mb-3">

                Rs. ${displayPrice}

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

                  data-price="${numericPrice}"

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
          Unable to Load Products
        </h4>

        <p class="text-muted">
          Check Firebase connection.
        </p>

      </div>

    `;

  }

}


// ========================================
// ADD TO CART
// ========================================

document.addEventListener("click", (event) => {

  const button =
    event.target.closest(".add-cart");

  if (!button) return;


  const product = {

    id: button.dataset.id,

    name: button.dataset.name,

    price: Number(button.dataset.price) || 0,

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


  alert(
    product.name + " added to cart!"
  );

});


// ========================================
// CART COUNT
// ========================================

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


// ========================================
// START
// ========================================

loadProducts();

updateCartCount();
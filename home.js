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

const homeProducts = document.getElementById("homeProducts");

async function loadHomeProducts() {

  const snapshot = await getDocs(collection(db, "products"));

  snapshot.forEach((doc) => {

    const product = doc.data();

    homeProducts.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card shadow h-100">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body text-center">
            <h5>${product.name}</h5>
            <h4 class="text-danger">${product.price}</h4>

            <a href="${product.link}" target="_blank" class="btn btn-warning w-100">
              Buy Now
            </a>

          </div>
        </div>
      </div>
    `;
  });

}

loadHomeProducts();
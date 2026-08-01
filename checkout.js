import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyClUl486Em2Cq4PjOtal-3B-Gt_I5NqPCY",
  authDomain: "nexacart-94526.firebaseapp.com",
  projectId: "nexacart-94526",
  storageBucket: "nexacart-94526.firebasestorage.app",
  messagingSenderId: "843284374047",
  appId: "1:843284374047:web:b8e18e6ed7b5326641eb2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get Cart
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// HTML Elements
const totalItems = document.getElementById("totalItems");
const totalPrice = document.getElementById("totalPrice");
const placeOrderBtn = document.getElementById("placeOrderBtn");

// Calculate Order Summary
let items = 0;
let price = 0;

cart.forEach(product => {

    const quantity = Number(product.quantity) || 1;

    const productPrice = Number(
        product.price.toString().replace(/,/g, "").replace(/[^0-9]/g, "")
    );

    items += quantity;
    price += productPrice * quantity;

});

totalItems.innerText = items;
totalPrice.innerText = "Rs. " + price;

// Place Order
placeOrderBtn.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const paymentMethod = document.querySelector("select").value;

    if (!name || !phone || !address) {
        alert("Please fill all required fields.");
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    try {

        await addDoc(collection(db, "orders"), {
            customerName: name,
            phone,
            address,
            paymentMethod,
            totalItems: items,
            totalPrice: price,
            products: cart,
            orderDate: new Date().toLocaleString(),
            status: "Pending"
        });

        alert("🎉 Your Order has been placed successfully!");

        localStorage.removeItem("cart");

        window.location.href = "index.html";

    } catch (error) {

        console.error(error);

        alert("Order failed: " + error.message);

    }

});
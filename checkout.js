import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
alert(localStorage.getItem("cart"));
import {
  getFirestore,
  collection,
  addDoc
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

const cart = JSON.parse(localStorage.getItem("cart")) || [];

console.log("Cart Data:", cart);
console.log("Raw LocalStorage:", localStorage.getItem("cart"));

const totalItems = document.getElementById("totalItems");
const totalPrice = document.getElementById("totalPrice");

let items = 0;
let price = 0;

cart.forEach(product => {
    const quantity = product.quantity || 1;

    const productPrice = Number(
        product.price.toString().replace(/[^0-9]/g, "")
    );

    items += quantity;
    price += productPrice * quantity;
});

totalItems.innerText = items;
totalPrice.innerText = "Rs. " + price;

// Place Order System
const placeOrderBtn = document.getElementById("placeOrderBtn");

placeOrderBtn.addEventListener("click", async function () {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (name === "" || phone === "" || address === "") {
        alert("Please fill all required fields.");
        return;
    }

try {

    await addDoc(collection(db, "orders"), {
        customerName: name,
        phone: phone,
        address: address,
        paymentMethod: document.querySelector("select").value,

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

    alert(error.message);

}
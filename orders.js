import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ordersTable = document.getElementById("ordersTable");

async function loadOrders() {

    const snapshot = await getDocs(collection(db, "orders"));

    ordersTable.innerHTML = "";

    snapshot.forEach((doc) => {

        const order = doc.data();

        ordersTable.innerHTML += `
        <tr>
            <td>${order.customerName}</td>
            <td>${order.phone}</td>
            <td>${order.address}</td>
            <td>${order.paymentMethod}</td>
            <td>${order.totalItems}</td>
            <td>Rs. ${order.totalPrice}</td>
            <td>${order.status}</td>
            <td>${order.orderDate}</td>
        </tr>
        `;

    });

}

loadOrders();
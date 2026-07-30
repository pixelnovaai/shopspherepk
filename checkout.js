const cart = JSON.parse(localStorage.getItem("cart")) || [];

console.log(cart);

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

placeOrderBtn.addEventListener("click", function () {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (name === "" || phone === "" || address === "") {
        alert("Please fill all required fields.");
        return;
    }

    alert("🎉 Your Order has been placed successfully!");

    localStorage.removeItem("cart");

    window.location.href = "index.html";
});
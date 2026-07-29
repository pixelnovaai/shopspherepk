const cart = JSON.parse(localStorage.getItem("cart")) || [];

console.log(cart);
alert(cart.length);

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
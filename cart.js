// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// HTML Elements
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

// Render Cart
function renderCart() {

    cartItems.innerHTML = "";

    let grandTotal = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
        <tr>
            <td colspan="5">
                <h4>Your Cart is Empty 😔</h4>
            </td>
        </tr>
        `;

        cartTotal.innerText = "Rs. 0";
        return;
    }

    cart.forEach((product, index) => {

        let price = Number(
            product.price.toString().replace(/[^0-9]/g, "")
        );

        if (!product.quantity) {
            product.quantity = 1;
        }

        let itemTotal = price * product.quantity;

        grandTotal += itemTotal;

        cartItems.innerHTML += `
        <tr>

            <td>
                <img src="${product.image}" width="60"><br>
                ${product.name}
            </td>

            <td>
                Rs. ${price}
            </td>

            <td>
    <button class="btn btn-sm btn-danger decrease" data-index="${index}">-</button>

    <span class="mx-2 fw-bold">${product.quantity}</span>

    <button class="btn btn-sm btn-success increase" data-index="${index}">+</button>
           </td>

            <td>
                Rs. ${itemTotal}
            </td>

            <td>
                <button class="btn btn-danger btn-sm remove-btn" data-index="${index}">
                    🗑 Remove
                </button>
            </td>

        </tr>
        `;
    });

    cartTotal.innerText = "Rs. " + grandTotal;

    localStorage.setItem("cart", JSON.stringify(cart));
}

// Start
renderCart();
// Remove Product
document.addEventListener("click", function (e) {

    if (e.target.classList.contains("remove-btn")) {

        const index = e.target.dataset.index;

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart();
    }

});

// Increase Quantity
document.addEventListener("click", function (e) {

    if (e.target.classList.contains("increase")) {

        const index = e.target.dataset.index;

        cart[index].quantity++;

        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart();
    }

});

// Decrease Quantity
document.addEventListener("click", function (e) {

    if (e.target.classList.contains("decrease")) {

        const index = e.target.dataset.index;

        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart();
    }

});
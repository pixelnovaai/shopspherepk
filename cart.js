function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCart();
    const badge = document.getElementById("cartCount");

    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        badge.innerText = totalItems;
    }
}

let cart = getCart();

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let total = 0;

cartItems.innerHTML = "";

cart.forEach((product, index) => {

   const price = Number(
    product.price.toString().replace(/[^0-9]/g, "")
);

const quantity = product.quantity || 1;

const itemTotal = price * quantity;

total += itemTotal;

    total += price;

    cartItems.innerHTML += `
    <tr>

        <td>
            <img src="${product.image}" width="60"><br>
            ${product.name}
        </td>

        <td>
            Rs. ${itemTotal}
        </td>

       <td>
           <button class="btn btn-sm btn-danger decrease" data-index="${index}">-</button>

           <span class="mx-2 fw-bold">${quantity}</span>

           <button class="btn btn-sm btn-success increase" data-index="${index}">+</button>
       </td>

        <td>
            Rs. ${price}
        </td>

        <td>
            <button class="btn btn-danger btn-sm remove-btn" data-index="${index}">
                🗑 Remove
            </button>
        </td>

    </tr>
    `;
});

cartTotal.innerText = "Rs. " + total;

document.addEventListener("click", function(e){

    if(e.target.classList.contains("remove-btn")){

        const index = e.target.dataset.index;

        cart.splice(index,1);

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();

    }

});
document.addEventListener("click", function(e){

    if(e.target.classList.contains("increase")){

        const index = e.target.dataset.index;

        cart[index].quantity += 1;

        saveCart(cart);

        location.reload();
    }

    if(e.target.classList.contains("decrease")){

        const index = e.target.dataset.index;

        if(cart[index].quantity > 1){
            cart[index].quantity -= 1;
        }else{
            cart.splice(index,1);
        }

        saveCart(cart);

        location.reload();
    }

});
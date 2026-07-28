const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let total = 0;

cartItems.innerHTML = "";

cart.forEach((product, index) => {

total += Number(product.price);

cartItems.innerHTML += `
<tr>

<td>
<img src="${product.image}" width="60"><br>
${product.name}
</td>

<td>
Rs. ${product.price}
</td>

<td>
1
</td>

<td>
Rs. ${product.price}
</td>

</tr>
`;

});

cartTotal.innerText = "Rs. " + total;
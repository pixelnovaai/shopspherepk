const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let total = 0;

cartItems.innerHTML = "";

cart.forEach((product, index) => {

const price = Number(
  product.price.toString().replace(/[^0-9]/g, "")
);

Rs. ${price}

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
1
</td>

<td>
Rs. ${price}
</td>

</tr>
`;

});

cartTotal.innerText = "Rs. " + total;
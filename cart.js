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
<button class="btn btn-danger btn-sm remove-btn" data-index="${index}">
🗑 Remove
</button>
</td>

</tr>

1
</td>

<td>
Rs. ${price}
</td>

</tr>
`;

});

cartTotal.innerText = "Rs. " + total;
document.addEventListener("click", function(e){

if(e.target.classList.contains("remove-btn")){

const index = e.target.dataset.index;

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

location.reload();

}

});
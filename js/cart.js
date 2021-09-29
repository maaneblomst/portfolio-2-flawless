import {
  getExistingCartItems,
  calculateCartTotal,
  getQuantity,
} from "./utils/cartFunctions.js";
import { listenForClearing } from "./utils/clearCart.js";
import { listenForQuantityChange } from "./utils/handleClick.js";
import createMenu from "./components/createMenu.js";
import { listenForRemoval } from "./utils/removeCartItem.js";

//Shoppingcart

createMenu();

let container = document.querySelector("#cart-items-list");
let clearButton = document.querySelector("#clear-all");

//Display the users current shoppingcartitems by retrieving them from localStorage.
//Then add eventlisteners for the remove/delete buttons, and display the carts total price.
export function displayCartItems() {
  container.innerHTML = "";
  let shoppingCartItems = getExistingCartItems();

  if (shoppingCartItems.length === 0) {
    container.innerHTML = "Your shopping cart is empty.";
    clearButton.classList.remove("btn-danger");
    clearButton.classList.add("btn-secondary");
  }

  shoppingCartItems.forEach((cartItem) => {
    let quantity = getQuantity(cartItem.id);
    let quantityElement = "";
    quantityElement += `<input type="number" class="quantity" data-quantity="${quantity}" data-id="${cartItem.id}" min="1" max="100" placeholder="1" value=${quantity}>`;
    container.innerHTML += `<li class="list-group-item cart-item" data-id="${cartItem.id}" data-name="${cartItem.name}" data-price="${cartItem.price}">
                            <a href="details.html?id=${cartItem.id}" class="text-decoration-none link-dark">
                            ${cartItem.name}
                            <img src="${cartItem.image}" class="img-fluid d-block"></a>
                            <span class="text-dark d-block">Price: ${cartItem.price}</span>
                            <span class="text-dark d-block">Quantity:${quantityElement}</span>
                            <a href="details.html?id=${cartItem.id}"">
                            <button class="btn btn-primary mt-2">View product</button></a>
                            <button id="remove-item" data-id="${cartItem.id}" class="btn btn-secondary mt-2">Remove</button>
                          </li>`;
    listenForRemoval();
    listenForClearing();
    listenForQuantityChange(cartItem.id);
    calculateCartTotal();
  });
}
displayCartItems();

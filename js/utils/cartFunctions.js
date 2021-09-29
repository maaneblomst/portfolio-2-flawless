import { cartKey } from "../utils/storage.js";

//Save item to the shoppingcart
export function saveCartItems(cartItems) {
  localStorage.setItem(cartKey, JSON.stringify(cartItems));
}

//Retrieve the current items in the shoppingcart.
//If there are no items, return an empty array.
//If there are items, return the parsed value of the cartitems.
export function getExistingCartItems() {
  const cartItems = localStorage.getItem(cartKey);

  if (!cartItems) {
    return [];
  } else {
    return JSON.parse(cartItems);
  }
}

//Return a single cart item from the shoppingcart.
export function getSingleCartItem(id) {
  const cartItems = localStorage.getItem(cartKey);
  if (!cartItems) {
    return null;
  } else {
    const allItems = JSON.parse(cartItems);
    const item = allItems.find((item) => item.id === id.toString());
    return item;
  }
}

//Check the quantiy of the item in the shoppingcart.
//If there is no specific quantity to be found, return 1 (default value)
export function getQuantity(id) {
  const item = getSingleCartItem(id);
  if (item) {
    return item.quantity;
  } else {
    return 1;
  }
}

//Update the cart items quantity.
export function updateQuantity(id, quantity) {
  let cart = getExistingCartItems();
  const existingItem = getSingleCartItem(id);
  const newItem = { ...existingItem, quantity: quantity };
  const index = cart.findIndex((item) => item.id === id);

  cart.splice(index, 1);
  cart.push(newItem);
  saveCartItems(cart);
}

//Calculate items in cart
export function calculateItemsInCart() {
  let currentItems = getExistingCartItems();
  let itemCount = 0;
  const quantityCount = document.querySelector("#cart-counter");
  currentItems.forEach((cartItem) => {
    itemCount += parseInt(cartItem.quantity);
  });

  return itemCount;
}

//Calculate the carts total price
export function calculateCartTotal() {
  let currentItems = getExistingCartItems();
  let prices = [];
  let priceContainer = document.querySelector(".cart-total");
  priceContainer.innerHTML = "";
  currentItems.forEach((cartItem) => {
    let quantity = parseInt(cartItem.quantity);
    let getPrices = parseFloat(cartItem.price);
    prices.push(getPrices * quantity);

    let sum = prices.reduce((total, amount) => total + amount);

    //Round to nearest integer for readability
    const total = sum.toFixed(2);

    priceContainer.innerHTML = `<span class="total">Total: $ ${total}</span>`;
  });
}

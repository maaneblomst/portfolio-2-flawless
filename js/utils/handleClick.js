import {
  saveCartItems,
  getExistingCartItems,
  updateQuantity,
} from "./cartFunctions.js";

//Listen for clicks
export function listenForClicks() {
  const cartButton = document.querySelectorAll(".fa-cart-plus, .fa-check");
  cartButton.forEach((button) => {
    button.addEventListener("click", handleClick);
  });
}

//Listen for change of quantity, and update the quantity in the shoppingcart.
export function listenForQuantityChange() {
  const quantityElement = document.querySelector(".quantity");
  if (quantityElement) {
    quantityElement.addEventListener(
      "change",
      function handleQuantityChange(event) {
        updateQuantity(event.target.dataset.id, event.target.value);
      }
    );
  }
}

function handleClick() {
  //Toggle the classes depending on wheter the product is in the cart or not.
  //Get the data attribute values which is stored in the i-tags.
  this.classList.toggle("fa-cart-plus");
  this.classList.toggle("fa-check");

  let id = this.dataset.id;
  let name = this.dataset.name;
  let price = this.dataset.price;
  let image = this.dataset.image;
  let quantity = this.dataset.quantity || 1;

  //Get the current cartitems, and check if the product exists in the cart.
  let currentCartItems = getExistingCartItems();

  let itemExists = currentCartItems.find(function (cartItem) {
    return cartItem.id === id;
  });

  //If it does'nt exist, push the item into the shoppingcart, and save it.
  if (!itemExists) {
    let item = {
      id: id,
      name: name,
      price: price,
      quantity: quantity,
      image: image,
    };
    currentCartItems.push(item);
    saveCartItems(currentCartItems);
  } else {
    let newCartItems = currentCartItems.filter(
      (cartItem) => cartItem.id !== id
    );
    saveCartItems(newCartItems);
  }
}

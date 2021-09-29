import { cartKey, saveToStorage } from "./storage.js";
import displayMessage from "../components/displayMessage.js";
import {
  calculateCartTotal,
  getExistingCartItems,
} from "../utils/cartFunctions.js";
import { displayCartItems } from "../cart.js";
import createMenu from "../components/createMenu.js";

//Remove item from the shoppingcart

let currentCartItems = getExistingCartItems();

//If the user clicks on the removebutton, run the function to remove the cart item.
export function listenForRemoval() {
  let removeButton = document.querySelectorAll("#remove-item");
  removeButton.forEach(function (itemToBeRemoved) {
    itemToBeRemoved.addEventListener("click", removeCartItem);
  });
}

//Get the id of the item the user wants to delete.
//Display a message to the user to confirm that they do want to delete the item.
//Overwrite the current cart items with the updated ones, which excludes the id of the removed object.
//Display the new updated cart, and display a successmessage to the user.
function removeCartItem() {
  const removeId = event.target.dataset.id;

  if (confirm("Are you sure you want to remove this item?")) {
    let updatedCartItems = currentCartItems.filter(function (item) {
      if (removeId !== item.id) {
        return true;
      }
    });
    currentCartItems = updatedCartItems;
    saveToStorage(cartKey, updatedCartItems);
    displayCartItems();
    calculateCartTotal();
    createMenu();
    displayMessage(
      "alert-success",
      "The item was successfully removed.",
      ".message-container"
    );
  }
}

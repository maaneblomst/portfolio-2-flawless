import { cartKey, removeItem } from "./storage.js";
import displayMessage from "../components/displayMessage.js";
import { displayCartItems } from "../cart.js";
import { calculateCartTotal } from "./cartFunctions.js";
import createMenu from "../components/createMenu.js";

//Clear all items in the shoppingcart
let container = document.querySelector("#cart-items-list");

//On click, run the clearCart-function.
export function listenForClearing() {
  let clearButton = document.querySelector("#clear-all");
  clearButton.addEventListener("click", clearCart);
}

//Clear all favourites under the cartKey ("shoppingcart") from localStorage.
//On success, display a message indicating this to the user.
//If the user cancels, display the cart items as usual
function clearCart() {
  container.innerHTML = "The shoppingcart is empty.";

  if (
    confirm("Are you sure you want to remove all items from your shoppingcart?")
  ) {
    removeItem(cartKey);
    displayMessage(
      "alert-success",
      "Your cart was successfully emptied",
      ".message-container"
    );
    displayCartItems();
    window.location.reload();
  } else {
    container.innerHTML = "";
    displayCartItems();
  }
}

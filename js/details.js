import displayMessage from "./components/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import createMenu from "./components/createMenu.js";
import {
  getExistingCartItems,
  getQuantity,
  calculateCartTotal,
} from "./utils/cartFunctions.js";
import checkLogin from "./utils/checkLogin.js";
import {
  listenForClicks,
  listenForQuantityChange,
} from "./utils/handleClick.js";

//Product details page

createMenu();

//Get the id of the product. If there is none, redirect to homepage.
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
let shoppingCartItems = getExistingCartItems();

if (!id) {
  document.location.href = "https://holmcreations.com/semesterproject2";
}

//Use the products id to give us the correct url for fetching the details
const productUrl = baseUrl + "/products/" + id;

//Fetch and display the product details.
//If the product is in the shoppingcart, display a quantity option to the user.
//If the user is validated, display an option to edit the product.
//Add eventlisteners to the buttons.

(async function () {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();

    let cssClass = "fa-cart-plus";
    //Does product ID exist in shoppingcart?
    let doesItemExist = shoppingCartItems.find(function (cartItem) {
      return parseInt(cartItem.id) === details.id;
    });

    document.title = details.name;
    const container = document.querySelector(".details-container");
    let id = details.id;
    let name = details.name;
    let description = details.description;
    let price = details.price;
    let image = details.images.url;
    let thumbnail = details.images.formats.thumbnail.url;
    let quantity = getQuantity(details.id);
    let quantityElement = "";
    if (doesItemExist) {
      cssClass = "fa-check";
      quantityElement += `<input type="number" class="quantity" data-quantity="${quantity}" data-id="${details.id}" min="1" max="100" placeholder="1" value=${quantity}>`;
    }
    let editElement = checkLogin()
      ? `<a class="edit text-dark" href="edit.html?id=${details.id}" aria-label="edit product">
    <i class="fas fa-edit pl-1"></i></a>`
      : "";

    container.innerHTML = `<div class="row">
                            <div class="col-lg-6 col-md-9 col-sm-9 col-xs-12">
                              <img src="${image}" class="img-fluid" alt="product image of ${name}">
                            </div>
                            <div class="col-lg-6 col-md-9 col-sm-9 col-xs-12">
                              <h3>${name}</h3>
                              <span>Price: ${price}</span>
                              <p class="muted-text">${description}</p>
                              <div class="detail-options">
                              ${quantityElement}
                              <i class="fas ${cssClass} text-dark" style="cursor:pointer" aria-label="add/remove product from cart" data-id="${id}" data-name="${name}" data-price="${price}" data-quantity="${quantity}" data-image="${thumbnail}"></i>
                              ${editElement}
                              <div class="cart-total h5">
                              Total: $ 0
                              </div>
                              </div>
                            </div>
                            </div>`;

    listenForClicks();
    listenForQuantityChange(details.id);
    calculateCartTotal();
  } catch (error) {
    displayMessage("alert-danger", error, ".message-container");
  }
})();

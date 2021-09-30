import { getExistingCartItems } from "../utils/cartFunctions.js";
import checkLogin from "../utils/checkLogin.js";
import { listenForClicks } from "../utils/handleClick.js";

//Check if product exists in the shoppingcart, and change the style of the i-element based on its status.
//Create and display the HTML for the products.
export function displayProducts(productsToDisplay) {
  let container = document.querySelector(".product-container");
  let shoppingCartItems = getExistingCartItems();
  container.innerHTML = "";

  productsToDisplay.forEach(function (product) {
    let cssClass = "fa-cart-plus";

    //Does product ID exist in shoppingcart?
    let doesItemExist = shoppingCartItems.find(function (cartItem) {
      return parseInt(cartItem.id) === product.id;
    });
    //If it does, change the style of the i-element
    if (doesItemExist) {
      cssClass = "fa-check";
    }
    let id = product.id;
    let name = product.name;
    let price = product.price;
    let image = product.images.url;
    let thumbnail = product.images.formats.thumbnail.url;
    let editElement = checkLogin()
      ? `<a class="edit" href="edit.html?id=${product.id}" aria-label="edit product">
    <i class="fas fa-edit pl-1 text-dark"></i></a>`
      : "";
    container.innerHTML += `
                    <div class="col">    
                      <div class="card mb-3 mt-1">
                      <a href="details.html?id=${product.id}" class="link-primary"aria-label="view product">
                      <img src="${image}" class="card-img-top" alt="product image of ${name}"></a>
                      <span class="ps-3 fs-5 fw-bold">${price} $</span>
                        <div class="card-body">
                        <a href="details.html?id=${product.id}" class="text-decoration-none" aria-label="view product"><h5 class="card-title text-dark">${name}</h5></a>
                            <div class="card-options">
                              <a href="details.html?id=${product.id}" aria-label="view product"><i class="fas fa-eye text-dark"></i></a>
                              <i class="fas ${cssClass} text-dark" style="cursor:pointer" aria-label="add/remove from cart" data-id="${id}" data-name="${name}" data-price="${price}" data-image="${thumbnail}"></i>
                              ${editElement}
                            </div>
                        </div>
                      </div>
                    </div>`;
    listenForClicks();
  });
}

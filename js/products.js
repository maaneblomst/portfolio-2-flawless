import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import { displayProducts } from "./components/displayProducts.js";
import { getFeaturedProducts } from "./components/featuredProducts.js";
import createMenu from "./components/createMenu.js";
import { listenForClicks } from "./utils/handleClick.js";
import { searchProducts } from "./components/searchProducts.js";

createMenu();

//Fetch all products from the baseUrl, and run the main functions.

let productsUrl = baseUrl + "/products";

(async function getProducts() {
  try {
    const response = await fetch(productsUrl);
    let products = await response.json();

    displayProducts(products);
    searchProducts(products);
    listenForClicks();
  } catch (error) {
    displayMessage("alert-danger", error, ".message-container");
  }
})();

import createMenu from "./components/createMenu.js";
import { baseUrl } from "./settings/api.js";
import {
  displayFeaturedProducts,
  featuredProducts,
  getFeaturedProducts,
} from "./components/featuredProducts.js";
import displayMessage from "./components/displayMessage.js";

//Fetch all products from the baseUrl, and display the products.

createMenu();

let productsUrl = baseUrl + "/products";

(async function getProducts() {
  try {
    const response = await fetch(productsUrl);
    let products = await response.json();

    getFeaturedProducts(products);
    displayFeaturedProducts(featuredProducts);
  } catch (error) {
    displayMessage("alert-danger", error, ".message-container");
  }
})();

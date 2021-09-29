import { displayProducts } from "./displayProducts.js";
import displayMessage from "./displayMessage.js";

//The search-function. If the user presses a key on the keyboard in the inputfield,
//Trim the input, and filter the array by what the searchInput includes and display the correct products.
//If there is no results, display an errormessage. Otherwise, empty the inputfield and display the products as usual.

export function searchProducts(products) {
  const search = document.querySelector("#search-products");
  const container = document.querySelector(".product-container");
  let message = document.querySelector(".message-container");

  search.onkeyup = function (event) {
    let searchInput = event.target.value.trim().toLowerCase();

    const filteredProducts = products.filter(function (product) {
      if (
        product.name.toLowerCase().includes(searchInput) ||
        product.description.toLowerCase().includes(searchInput)
      ) {
        return true;
      }
    });

    if (filteredProducts.length === 0) {
      displayMessage(
        "alert-warning",
        "Sorry, no results. Please try another product.",
        ".message-container"
      );
      displayProducts(products);
    } else {
      message.innerHTML = "";
      displayProducts(filteredProducts);
    }
  };
}

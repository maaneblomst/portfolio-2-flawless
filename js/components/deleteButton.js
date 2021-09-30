import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";
import checkLogin from "../utils/checkLogin.js";
import { getExistingCartItems, saveCartItems } from "../utils/cartFunctions.js";
import createMenu from "./createMenu.js";

//Only display this option if the user is logged in. Run the checkLogin function.
const token = getToken();
if (!checkLogin) {
  location.href = "https://holmcreations.com/semesterproject2";
}

//Create the button to delete product, and select it.
//Display a confirmation dialogue to make the user confirm that she wants to delete the item.
//On confirmation, send a delete request to the API.
//If the product is not deleted, display an error message to the user.
export default function deleteButton(id) {
  const container = document.querySelector(".delete-container");
  console.log(id);
  container.innerHTML = `<button type="button" class="btn btn-secondary delete mt-2"><i class="fas fa-trash"></i> Delete
    product</button>`;

  const button = document.querySelector("button.delete");

  button.onclick = async function () {
    const doDelete = confirm("Are you sure you want to delete this product?");

    if (doDelete) {
      const url = baseUrl + "/products/" + id;

      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //Work in progress. Trying to get current cartitems, check if product id exists there,
      //then filter it out, and create a new array for the shopping cart. Not working well so far.
      let currentCartItems = getExistingCartItems();

      let itemExistsInCart = currentCartItems.find(function (cartItem) {
        return cartItem.id === id;
      });
      console.log("this item exists in the cart" + itemExistsInCart);

      let newCartItems = currentCartItems.filter(
        (cartItem) => cartItem.id !== id
      );
      saveCartItems(newCartItems);
      createMenu();
      try {
        const response = await fetch(url, options);
        const json = await response.json();

        location.href = "#";
      } catch (error) {
        console.log(error);
      }
    }
  };
}

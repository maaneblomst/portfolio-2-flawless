import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";
import checkLogin from "../utils/checkLogin.js";

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

  container.innerHTML = `<button type="button" class="btn btn-secondary delete mt-2"><i class="fas fa-trash"></i> Delete
    product</button>`;

  const button = document.querySelector("button.delete");

  button.onclick = async function () {
    const doDelete = confirm("Are you sure you want to delete this?");

    if (doDelete) {
      const url = baseUrl + "/products/" + id;

      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();

        location.href = "https://holmcreations.com/semesterproject2";
      } catch (error) {}
    }
  };
}

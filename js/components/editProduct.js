import displayMessage from "./displayMessage.js";
import { baseUrl } from "../settings/api.js";
import createMenu from "./createMenu.js";
import { getToken } from "../utils/storage.js";
import deleteButton from "./deleteButton.js";
import checkLogin from "../utils/checkLogin.js";

//Edit products in the API

createMenu();

//Only display page if user is logged in. If not, redirect to homepage.
const token = getToken();
if (!checkLogin()) {
  location.href = "https://holmcreations.com/semesterproject2";
}

//Select the id of the chosen product, and if there is not an id to be found, redirect to hompage.
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  location.href = "https://holmcreations.com/semesterproject2";
}

//If there is an id, use it to create the correct url to send in our request.
const productUrl = baseUrl + "/products/" + id;
let form = document.querySelector("#edit-form");
let name = document.querySelector("#name");
let price = document.querySelector("#price");
let description = document.querySelector("#description");
let existingImage = document.querySelector("#existing-image");
let imageUpload = document.querySelector("#image-upload");
let featured = document.querySelector("#featured");
let idInput = document.querySelector("#edit-id");
let message = document.querySelector(".message-container");
const formData = new FormData();

//Fetch the existing product and assign its values to variables.
(async function () {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();

    name.value = details.name;
    price.value = details.price;
    description.value = details.description;
    existingImage.src = details.images.url;
    featured.checked = details.featured;
    idInput.value = details.id;

    //Check if the product is featured, and if it is, make the checkbox checked.
    if (details.featured === true) {
      featured.checked = true;
    }

    //Display the deletebutton.
    deleteButton(details.id);
  } catch (error) {
  } finally {
    form.classList.remove("d-none");
    form.classList.add("d-block");
  }
})();

form.addEventListener("submit", submitForm);

//Trim the input values, and if they are valid, run editProduct function.
function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const nameValue = name.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const featuredValue = featured.checked;
  const uploadedImage = imageUpload.files[0];
  const idValue = idInput.value;

  if (
    nameValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue) ||
    descriptionValue.length === 0
  ) {
    return displayMessage(
      "alert-warning",
      "Please fill in the missing values/blank fields.",
      ".message-container"
    );
  }

  updateProduct(
    nameValue,
    priceValue,
    descriptionValue,
    featuredValue,
    idValue,
    uploadedImage
  );
}

//Get the user input and send a PUT-request with the new information to the API.
//Check for the "updated_at"-object, which indicates success, and display this to the user.
//Otherwise, show the errormessage.
async function updateProduct(name, price, description, featured, id) {
  const url = baseUrl + "/products/" + id;
  let file = imageUpload.files[0];

  const data = {
    name: name,
    price: price,
    description: description,
    featured: featured,
  };
  formData.append("files.images", file, file.name);
  formData.append("data", JSON.stringify(data));

  const options = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.updated_at) {
      displayMessage(
        "alert-success",
        "Hurray! Product updated.",
        ".message-container"
      );
    }
    if (json.error) {
      displayMessage(
        "alert-danger",
        "Sorry, an error occured. Try again, or contact your administrator.",
        ".message-container"
      );
    }
  } catch (error) {}
}

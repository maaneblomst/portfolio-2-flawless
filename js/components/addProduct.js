import displayMessage from "./displayMessage.js";
import createMenu from "./createMenu.js";
import checkLogin from "../utils/checkLogin.js";
import { getToken } from "../utils/storage.js";
import { baseUrl } from "../settings/api.js";

//Add new product to the API.

createMenu();

//Only display this page if the user is logged in. Run the checkLogin function.
const token = getToken();
if (!checkLogin) {
  location.href = "https://holmcreations.com/semesterproject2";
}
//Select my variables
const formData = new FormData();
let form = document.querySelector("#add-form");
let name = document.querySelector("#name");
let price = document.querySelector("#price");
let description = document.querySelector("#description");
let existingImage = document.querySelector("#existing-image");
let imageUpload = document.querySelector("#image-upload");
let featured = document.querySelector("#featured");
let message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

//Trim the inputs to the form, and display a warning if the inputs are not valid (===0).
//If it passes the validation, run the function to add the new product to the API.
function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";
  const nameValue = name.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const featuredValue = featured.checked;
  const uploadedImage = imageUpload.files[0];

  if (
    nameValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue) ||
    descriptionValue.length === 0 ||
    uploadedImage.length === 0
  ) {
    return displayMessage(
      "alert-warning",
      "Please fill in the missing values.",
      ".message-container"
    );
  }

  addProduct(
    nameValue,
    priceValue,
    descriptionValue,
    featuredValue,
    uploadedImage
  );
}

//Add the users data and strinify the values. Send a POST-request to the API with the necessary headers,
//and include the new image file. Display a success message if the product is successfully posted.
//If not, display error messages to the user.
async function addProduct(name, price, description, featured) {
  let url = baseUrl + "/products";
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
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.created_at) {
      displayMessage(
        "alert-success",
        "Yay! A new Flawless product was added!",
        ".message-container"
      );
      form.reset();
    }
    if (json.error) {
      displayMessage(
        "alert-danger",
        "Sorry, something went wrong. Please contact your administrator.",
        ".message-container"
      );
    }
  } catch (error) {
    displayMessage(
      "alert-danger",
      "Oops. An error occured. Send help!",
      ".message-container"
    );
  }
}

import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";
import createMenu from "./components/createMenu.js";

//User login

createMenu();

let form = document.querySelector("#login-form");
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let message = document.querySelector(".message-container");

form.addEventListener("submit", submitLogin);

//When the form is submitted, trim the users input and validate the values.
//If there is values to be found, run the loginfunction.
function submitLogin(event) {
  event.preventDefault();

  message.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue.length === 0) {
    displayMessage(
      "alter-warning",
      "Please enter a username",
      ".message-container"
    );
  }

  if (passwordValue.length === 0) {
    return displayMessage(
      "alert-warning",
      "Please enter a password",
      ".message-container"
    );
  }

  runLogin(usernameValue, passwordValue);
}

//Pass the users information to the API, that will check if the user has authorization to access it.
//If there is an actual user to be found, save the jwt (token) ad username to localStorage, then redirect to homepage.
//If not, display an errormessage to the user.
async function runLogin(username, password) {
  const url = baseUrl + "/auth/local";
  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(response);

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);

      location.href = "https://holmcreations.com/semesterproject2";
    }

    if (json.error) {
      console.log(error);
      displayMessage(
        "alert-warning",
        "We're so sorry. Try another username or password",
        ".message-container"
      );
    }
  } catch (error) {}
}

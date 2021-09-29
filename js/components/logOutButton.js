import { removeItem, userKey, tokenKey } from "../utils/storage.js";

//Display an opiton to log out if the user is logged in.
//When it is clicked, check with the user that he/she is sure she wants to log out by the use of confirm().
//On confirm, run function to log the user out by removing the username and password, then return to homepage.

export default function logOutButton(btn) {
  const button = document.querySelector("#logout");

  if (button) {
    button.onclick = function () {
      const runLogout = confirm("Are you sure you want to log out?");

      if (runLogout) {
        removeItem(userKey);
        removeItem(tokenKey);
        location.href = "https://holmcreations.com/semesterproject2";
      }
    };
  }
}

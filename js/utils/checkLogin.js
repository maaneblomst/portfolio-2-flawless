import { getToken } from "../utils/storage.js";
import { getUserId } from "../utils/storage.js";

// Hides/removes elements depending on visitors login status.

export default function checkLogin() {
  //Get user-id from localStorage
  let userId = getUserId();
  //Get token from localStorage
  let token = getToken();

  //If there is a user-id and token to be found in localStorage,
  //return the token-id. If the token-id matches the original userId, return true (validated user).
  if (token && userId) {
    let parsedToken = JSON.parse(atob(token.split(".")[1]));
    let idFromToken = parsedToken.id;
    if (userId === idFromToken) {
      return true;
    }
  }
  return false;
}

import { getUsername } from "../utils/storage.js";
import logOutButton from "./logOutButton.js";
import checkLogin from "../utils/checkLogin.js";
import { calculateItemsInCart } from "../utils/cartFunctions.js";

//A dynamic menu which changes based upon the user is logged in or not.
//Get the pathname for the active page, and the username if there is one to be found in localStorage.
//If we do find a validated user (check login), create HTML indicating to the user that he/she is logged in
// by the use of the authLink variable.
//Create HTML for the menu.

export default function createMenu() {
  const { pathname } = document.location;
  const loggedIn = checkLogin();
  const username = getUsername();

  const cartCount = calculateItemsInCart();

  let authLink = `<li><a href="login.html" id="login-button" aria-label="login" class="nav-link ${
    pathname === "/login.html" ? "active" : ""
  }"><i class="fas fa-user text-white"></i></a></li>`;

  if (loggedIn) {
    authLink = `<li><a href="add.html" aria-label="add product" class="nav-link ${
      pathname === "/add.html" ? "active" : ""
    }"><i class="fas fa-plus text-white"></i></a></li>
    <span aria-label="logged in user" class="text-lowercase text-white p-2">${username}</span>
    <button id="logout" aria-label="sign out" class="btn p-1"><i class="fas fa-sign-out-alt text-white"></i></button>`;
  }
  const container = document.querySelector(".menu-container");

  container.innerHTML = `<ul class="menu nav navbar-nav ms-auto mt-2">
                        <li><a href="cart.html" aria-label="shoppingcart" class="position-relative nav-link ${
                          pathname === "/cart.html" ? "active" : ""
                        }"><i class="text-white fas fa-shopping-cart "></i><span id="cart-counter" aria-label="count of items in cart" class="badge rounded-circle bg-primary text-white">${cartCount}</span></a></li>
                        ${authLink}
                        </ul>
                        `;
  logOutButton();
}

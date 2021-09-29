export let tokenKey = "token";
export let userKey = "user";
export let cartKey = "shoppingcart";

//LocalStorage functions

export function saveToken(token) {
  saveToStorage(tokenKey, token);
}

export function getToken() {
  return getFromStorage(tokenKey);
}

export function saveUser(user) {
  saveToStorage(userKey, user);
}

export function getUsername() {
  let user = getFromStorage(userKey);

  if (user) {
    return user.username;
  }

  return null;
}

export function getUserId() {
  let user = getFromStorage(userKey);

  if (user) {
    return user.id;
  }
  return null;
}

export function clearStorage() {
  localStorage.clear();
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromStorage(key) {
  let value = localStorage.getItem(key);

  if (!value) {
    return null;
  }
  return JSON.parse(value);
}

//A reusable component for displaying a message to the user.

export default function displayMessage(messageType, message, target) {
  const element = document.querySelector(target);

  element.innerHTML = `<div class="alert ${messageType}" role="alert">${message}</div>`;
}

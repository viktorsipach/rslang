function disableButton(buttonSelector) {
 document.querySelector(buttonSelector).disabled = true;
}

function enableButton(buttonSelector) {
  document.querySelector(buttonSelector).disabled = false;
}

export { disableButton, enableButton }
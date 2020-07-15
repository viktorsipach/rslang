function disableButton(buttonSelector) {
  if (document.querySelector(buttonSelector) !== null) {
    document.querySelector(buttonSelector).disabled = true;
  }
}

function enableButton(buttonSelector) {
  if (document.querySelector(buttonSelector) !== null) {
    document.querySelector(buttonSelector).disabled = false;
  }
}

export { disableButton, enableButton }
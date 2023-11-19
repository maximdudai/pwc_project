'use strict'

const quantityItem = document.getElementById("productQuantity");

// function to prevent user to input letters, characters and symbols
function onlyNumbers(key) {
    let charCode = key.charCode ? key.charCode : key.keyCode;

    // 8 = backspace
    // 48-57 = 0-9

    if (charCode != 8 && (charCode < 48 || charCode > 57)) {
        key.preventDefault();
    }
}
quantityItem.addEventListener("keypress", onlyNumbers);
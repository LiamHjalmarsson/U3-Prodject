"use strict";

// Choose a element based on what is given in parameter
let selectElement = (select) => {
    return document.querySelector(select); 
}

let clearResults = () => {
    selectElement("#search-result").innerHTML = "";
}
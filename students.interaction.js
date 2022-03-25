"use strict";

let selectElement = (select) => {
    return document.querySelector(select); 
}

function getResultStudent () {
    let search = selectElement("#searchbar").value; 

    if (search.length > 0) {
        for (let i = 0; i < DATABASE.students.length; i++) {
            console.log(i);
        }
    } 
} 

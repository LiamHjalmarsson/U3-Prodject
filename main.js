"use strict";

// Choose a element based on what is given in parameter
let selectElement = (select) => {
    return document.querySelector(select); 
}

// Cleanse the content 
let clearResults = () => {
    selectElement("#search-result").innerHTML = "";
}

function getTotalCredits (counter) {
    let credits = []; 

    for (let studentCourse of DATABASE.students[counter].courses) {
        credits.push(studentCourse.passedCredits);
    }

    let creditSum = 0; 
    for (let i = 0; i < credits.length; i++) {
        creditSum += credits[i]
    }
    return creditSum;
}

function sortStudents () {
    
    DATABASE.students.sort(function(a, b) {
    
    if ( a.firstName > b.firstName ) {
      return 1;
    }

    else if ( a.firstName < b.firstName ) {
      return -1;
    }

    return 0
  });
  
}
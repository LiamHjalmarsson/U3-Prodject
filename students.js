"use strict";

function getResultStudent () {
    // varibale search assingde calls selectElement to get assinged input and its value 
    let search = selectElement("#searchbar").value; 
    // console.log(search);

    clearResults();
    
    if (search.length > 0) {
        
        for (let i = 0; i < DATABASE.students.length; i++) {
            
            if( DATABASE.students[i].lastName.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                // Lägger till innehåll om studentents namn för namn, efternamn och credits 
                selectElement('#search-result').innerHTML += ` 
                  <div class="search-div">
                  <h3 class="studentTitle"> 
                      ${DATABASE.students[i].firstName}
                      ${DATABASE.students[i].lastName}
                      ( total credits:0)
                  </h3>
                  <p> Courses </p>
                  <div class="search-courses"></div>
                  </div>
                  `; 
            }
        } 
    }
} 

selectElement('#searchbar').addEventListener('keyup', getResultStudent);
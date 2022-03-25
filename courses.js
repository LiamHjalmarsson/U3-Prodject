"use strict" 

function getTeacersOnSearch () {

    let search = selectElement("#searchbar").value;
    // console.log(search);

    clearResults();

    if (search.length > 0) {
        
        for ( let i = 0; i < DATABASE.courses.length; i++ ) {

            // console.log(DATABASE.courses[i].title)

            if ( DATABASE.courses[i].title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ) {

                selectElement("#search-result").innerHTML += `
                    <div class="search-div">
                        <h3 class="studentTitle"> ${DATABASE.courses[i].title} (  credits) </h3>
                        <div class="proffesion">    
                        <div class="responsible">Course Responsible</div>  
                        <div class="teachers">Teachers</div>
                        </div>
                    </div>
                `
            }
        }
    }
}


selectElement("#searchbar").addEventListener("keyup", getTeacersOnSearch);
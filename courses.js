"use strict" 

function getCourseCredits () {
    let credits = []; 
    
    for ( let courseCredits of DATABASE.courses ) {
        // console.log(courseCredits)
        credits.push(courseCredits);
        // console.log(credits);
    }
    
    let creditSum = 0; 

    // console.log(credits)
    for ( let i = 0; i < credits.length; i++) { 
        if (credits[i].totalCredits == DATABASE.courses[i].totalCredits) {    
            console.log(creditSum = credits[i].totalCredits);
        }
    }

    

    return creditSum;
}


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
                        <h3 class="studentTitle"> ${DATABASE.courses[i].title} ( ${getCourseCredits()} credits) </h3>
                        
                        <div class="proffesion">    
                            <div class="responsible">Course Responsible</div>  
                            <div class="teachers">Teachers</div>
                        </div>

                        <div class="name-teachers"> 
                        </div>
                        <p> Students </p>
                        <div class="students">
                        </div>
                    </div>
                `
            }
        }
    } 
}


selectElement("#searchbar").addEventListener("keyup", getTeacersOnSearch);
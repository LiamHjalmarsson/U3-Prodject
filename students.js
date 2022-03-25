"use strict";

function getStudentsCourses (counter) {
    
    for ( let studentCourse of DATABASE.students[counter].courses ) {
        
        for ( let databasCourse of DATABASE.courses ) {
           
            if ( studentCourse.courseId == databasCourse.courseId ) {
                
                if (studentCourse.passedCredits == databasCourse.totalCredits)
               
                    selectElement(`div > div:last-child > .search-courses`).innerHTML += `
                    <div class="done">
                    ${databasCourse.title} <br>
                    ${studentCourse.started.semester} ${studentCourse.started.year}
                    ${studentCourse.passedCredits}/${databasCourse.totalCredits}</div>
                    `
                else {

                    selectElement(`div > div:last-child > .search-courses`).innerHTML += `
                    <div class="notDone">
                    ${databasCourse.title} <br>
                    ${studentCourse.started.semester} ${studentCourse.started.year}
                    ${studentCourse.passedCredits}/${databasCourse.totalCredits}</div>
                    `
                }
            }
        }    
    }
}

function getResultStudent () {
    // varibale search assingde calls selectElement to get assinged input and its value 
    let search = selectElement("#searchbar").value; 
    // console.log(search);

    clearResults();
    
    if (search.length > 0) {
        
        for (let i = 0; i < DATABASE.students.length; i++) {
            
            if ( DATABASE.students[i].lastName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ) {
                // Lägger till innehåll om studentents namn för namn, efternamn och credits 
                selectElement('#search-result').innerHTML += ` 
                    <div class="search-div">
                    <h3 class="studentTitle"> 
                        ${DATABASE.students[i].firstName}
                        ${DATABASE.students[i].lastName}
                        ( total credits: ${getTotalCredits(i)} )
                    </h3>
                    <p> Courses </p>
                    <div class="search-courses"></div>
                    </div>
                  `; 

                  getStudentsCourses(i);
            }
        } 
    }
} 

selectElement('#searchbar').addEventListener('keyup', getResultStudent);


// DATABASE.students.sort(function(a, b) {
//     if (a.firstName > b.firstName) {
//       return 1;
//     }
//     else if (a.firstName < b.firstName) {
//       return -1;
//     }
//     return 0
//   });

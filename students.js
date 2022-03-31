"use strict";

// Choose a element based on what is given in parameter
let selectElement = (select) => {
    return document.querySelector(select); 
}

// Cleanse the content 
let clearResults = () => {
    selectElement("#search-result").innerHTML = "";
}

// Get total credit for each student 
function getTotalCredits (counter) {
    let credits = []; 

    for (let studentCourse of DATABASE.students[counter].courses) {
        credits.push(studentCourse.passedCredits);
    }

    let creditSum = 0; 

    // for (let i = 0; i < credits.length; i++) {
    //     creditSum += credits[i]
    // }

    credits.forEach((credit => {
      creditSum += credit
    }) )

    return creditSum;
}

function sortStudents () {
    
    DATABASE.students.sort((a, b) => {
    
    if ( a.firstName > b.firstName ) {
      return 1;
    }

    else if ( a.firstName < b.firstName ) {
      return -1;
    }

    return 0

  });
  
}

// Get the students done and not done courses with information 
function getStudentsCourses (counter) {
    
    for ( let studentCourse of DATABASE.students[counter].courses ) {
        
        for ( let databasCourse of DATABASE.courses ) {
           
            if ( studentCourse.courseId == databasCourse.courseId ) {
                
                if (studentCourse.passedCredits == databasCourse.totalCredits) {
               
                    selectElement(`div > div:last-child > .search-courses`).innerHTML += `
                    <div class="done">
                        <h4> ${databasCourse.title} </h4>
                        ${studentCourse.started.semester} ${studentCourse.started.year}
                        ${studentCourse.passedCredits} of ${databasCourse.totalCredits} credits 
                    </div>
                    `
                } else { 

                    selectElement(`div > div:last-child > .search-courses`).innerHTML += `
                    <div class="notDone">
                        <h4>${databasCourse.title} </h4>
                        ${studentCourse.started.semester} ${studentCourse.started.year}
                        ${studentCourse.passedCredits} of ${databasCourse.totalCredits} credits
                    </div>
                    `
                }
            }
        }    
    }
}

// Get the students search result 
function getResultStudent () {
    // varibale search assingde calls selectElement to get assinged input and its value 
    let search = selectElement("#searchbar").value; 
    // console.log(search);

    clearResults();
    
    if (search.length > 0) {
        
        for (let i = 0; i < DATABASE.students.length; i++) {
            

            if ( DATABASE.students[i].lastName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ) {
                
                sortStudents();

                // Lägger till innehåll om studentents namn för namn, efternamn och credits 
                selectElement('#search-result').innerHTML += ` 
                    <div class="search-div">
                    <h3 class="studentTitle"> 
                        ${DATABASE.students[i].firstName}
                        ${DATABASE.students[i].lastName}
                        ( total credits: ${getTotalCredits(i)} )
                    </h3>
                    <p> Courses </p>
                    <div class="search-courses">
                    
                    </div>
                    </div>
                  `; 

                  getStudentsCourses(i);
            }
        } 
    }
} 

// Kollar efter sparade darkmode 
let darkMode = localStorage.getItem('darkMode'); 

let darkModeToggle = document.querySelector('#dark-mode-toggle');

// aktivera DarkMode
function enableDarkMode ()  {
  // Lägger till klass 
  document.body.classList.add('darkmode');
  // updaterar darkMode till localStorage
  localStorage.setItem('darkMode', 'enabled');
}

// Av aktiverar DarMode 
function disableDarkMode () {
  // tarbort classen darkMode
  document.body.classList.remove('darkmode');
  // updaterar darkMode i localStorage 
  localStorage.setItem('darkMode', null);
}
 
// Om användaren har ackiverar DarkMode sedan tidigare 
if (darkMode === 'enabled') {
  enableDarkMode();
}

// Knapp för aktivera och avaktivera
darkModeToggle.addEventListener('click', () => {
  // Få dark mode inställningar
  darkMode = localStorage.getItem('darkMode'); 
  
  // Om inte aktiverad aktivera 
  if (darkMode !== 'enabled') {
    enableDarkMode();
  // Om aktiverade avaktivera 
  } else {  
    disableDarkMode(); 
  }
});

// Sök efter student med keyup 
selectElement('#searchbar').addEventListener('keyup', getResultStudent);
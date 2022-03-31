"use strict";

// Välj element baserat på vad som är angivet 
let selectElement = (select) => {

    return document.querySelector(select); 

}

// Rensar innehållet
let clearResults = () => {

    selectElement("#search-result").innerHTML = "";

}

// Få total poäng för studenterna
function getTotalCredits (counter) {
    
    let credits = []; 

    // loppar igenom studenterna och pushar deras passCredits 
    for (let studentCourse of DATABASE.students[counter].courses) {

        credits.push(studentCourse.passedCredits);

    }

    let creditSum = 0; 

    // loppar igenom varje students credits och plusar ihop med varandra 
    credits.forEach((credit => {
      creditSum += credit
    }) )

    // varje students totala credits retuneras 
    return creditSum;
}

//Sorterar studenterna efter efternamn
function sortStudents () {
    
    DATABASE.students.sort((a, b) => {
    
    if ( a.lastName > b.lastName ) {

      return 1;

    }

    else if ( a.lastName < b.lastName ) {

      return -1;

    }

    return 0
  });
}

// Få studenterna som är klara och inte klara med information 
function getStudentsCourses (counter) {
    
    // loppar och kommer åt  varje students courses
    for ( let studentCourse of DATABASE.students[counter].courses ) {

        // loppar och kommer åt databases courses
        for ( let databasCourse of DATABASE.courses ) {
           
            // jämför studenterna course id memd databases cours id 
            if ( studentCourse.courseId == databasCourse.courseId ) {
                
                // jämförelse för att komm åt de som är klara med kursen med passcredits är det samma som total credits 
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

// Få studenter baserat på sökning
function getResultStudent () {

    let search = selectElement("#searchbar").value; 

    // rensar innehållet för att inte behålla gammal sökning 
    clearResults();
    
    // om searchen är längre en 0 kör sökning 
    if (search.length > 0) {
        
        // loppar igenom databasesn studenter 
        for (let i = 0; i < DATABASE.students.length; i++) {
            
            // Om searcbaren innehåller något som liknas efternamnet på studenterna 
            if ( DATABASE.students[i].lastName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ) {
                
                // sorterar studenterna 
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
                // hämtar studenterna 
                  getStudentsCourses(i);
            }
        } 
    }
} 

// Kollar efter sparade darkmode 
let darkMode = localStorage.getItem('darkMode'); 

let darkModeToggle = selectElement('#dark-mode-toggle');

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

} else {  

    // Om aktiverade avaktivera 
    disableDarkMode(); 

  }
});

// Sök efter student med keyup 
selectElement('#searchbar').addEventListener('keyup', getResultStudent);
"use strict" 
// https://github.com/LiamHjalmarsson/U3-Prodject

// Välj element baserat på vad som är angivet 
let selectElement = (select) => {

    return document.querySelector(select); 

}

// Rensar innehållet
let clearResults = () => {

    selectElement("#search-result").innerHTML = "";

}

//Sorterar kurserna efter titel bokstavsordning  
function sortCourseTitle () {

    DATABASE.courses.sort((a, b) => {
      if (a.title > b.title) {

        return 1;

      }
      else if (a.title < b.title) {

        return -1;

      }

      return 0;
    })
}


// Få ansvarig lärarna för varje kursn 
function responsibelOfCourse (counter) {

    // Variabel course får courses  och får en counter s
    let course = DATABASE.courses[counter]; 
  
    // skriver lärares för och efter nman och psot i en ny array 
    let teachersName = DATABASE.teachers.map((teacher) => `${teacher.firstName} ${teacher.lastName} (${teacher.post})`)
  
    // result får assinat courseResponsibel 
    let result = course.courseResponsible

    // retunerar lärare där result matchar
    return teachersName[result];
}

// Lärare delaktiga i kurs
function teacherInCourse (counter) {
    
    // loppar igenom courses för att få ut lärarnas nummer 
    for ( let course of DATABASE.courses[counter].teachers) {
      
        // loppar igenom lärare i databasen 
        for ( let teachers of DATABASE.teachers ) {

            // Om nummer i courses matchar lärarens id  få lärare
            if ( course == teachers.teacherId ) {

                selectElement(`div > div:last-child > .name-teachers`).innerHTML += `
                    <div class="course-teachers">
                        ${teachers.firstName} ${teachers.lastName}  (${teachers.post})
                    </div>
                `
            }  
        }  
    }
}

// Få Studenter i kursen 
function getStudentsFromCourse (counter) {
  
    // filtrerar studenterna i databasen genom some som letar efter åtminstone en kurs i varje students kurslista som matchar vår nuvarande kurs
    let students = DATABASE.students.filter((student) => student.courses.some((course) => course.courseId == DATABASE.courses[counter].courseId))
    // console.log(students)

    // lopp för varje student
    for (let student of students){
       
        //filtrerar om studenters course id är det samma som courses id i databasen och blir assinat infomrationen om students kurs
        let courseById = student.courses.filter((course) => course.courseId == DATABASE.courses[counter].courseId)
       
        // Om courses första object passcredits är det samma som kursens total kredits kör de som är klara med kursen 
        if ( courseById[0].passedCredits == DATABASE.courses[counter].totalCredits ) { 
        selectElement('div > div:last-child > .students').innerHTML += `
        <div class="done">
                <h4> ${student.firstName} ${student.lastName} </h4>
                ${courseById[0].started.semester} ${courseById[0].started.year} ${courseById[0].passedCredits} credits
        </div>
        ` 
        } else {
            selectElement('div > div:last-child > .students').innerHTML += `
            <div class="notDone">
                    <h4> ${student.firstName} ${student.lastName} </h4>
                    ${courseById[0].started.semester} ${courseById[0].started.year} ${courseById[0].passedCredits} credits
            </div>
            ` 
        }
    } 
}

// Få kurserna som är klara och inte klara med information 
function getTeacersOnSearch () {

    let search = selectElement("#searchbar").value;
    // console.log(search);

    // rensar innehållet för att inte behålla gammal sökning 
    clearResults();

    // om searchen är längre en 0 kör sökning 
    if (search.length > 0) {
        
        // loppar igenom databasesn kurserna 
        for ( let i = 0; i < DATABASE.courses.length; i++ ) {

            // console.log(DATABASE.courses[i].title)

            // Om searcbaren innehåller något som liknas Titlen från kurserna 
            if ( DATABASE.courses[i].title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ) {

                // sorterar studenterna 
                sortCourseTitle();

                // Lägger till innehåll om Kursen
                selectElement("#search-result").innerHTML += `
                    <div class="search-div">

                        <h3 class="studentTitle"> ${DATABASE.courses[i].title} (credits ${DATABASE.courses[i].totalCredits}) </h3>
                        
                        <div class="proffesion">    
                            <div class="responsible">Course Responsible</div>  
                            <div class="teachers">Teachers</div>
                        </div>

                        <div class="name-teachers"> 
                                <div class="responsibleTeacher">
                                    ${responsibelOfCourse(i)}
                                </div>
                        </div>
                            
                        <p> Students </p>
                        <div class="students">
                            
                        </div>
                            
                    </div>
                 `
                 teacherInCourse(i)
                 getStudentsFromCourse(i)

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

// av aktiverar DarMode 
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

selectElement("#searchbar").addEventListener("keyup", getTeacersOnSearch);


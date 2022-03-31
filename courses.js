"use strict" 

// Choose a element based on what is given in parameter
let selectElement = (select) => {
    return document.querySelector(select); 
}

// Cleanse the content 
let clearResults = () => {
    selectElement("#search-result").innerHTML = "";
}

// sort 
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


// Get responsibel for course 
function responsibelOfCourse (counter) {
  
    let course = DATABASE.courses[counter]; 
  
    let teachersName = DATABASE.teachers.map((teacher) => `${teacher.firstName} ${teacher.lastName} (${teacher.post})`)
  
    let result = course.courseResponsible
  
    return teachersName[result];
  
}

// Teachers in courses
function teacherInCourse (counter) {
  
    let courses = DATABASE.courses[counter].teachers;
    
    // console.log(courses)
    
    for ( let course of DATABASE.courses[counter].teachers) {
      
        // console.log(course)
    
      for ( let teachers of DATABASE.teachers ) {
    
        // console.log(teachers)

        if ( course == teachers.teacherId ) {

          selectElement(`div > div:last-child > .name-teachers`).innerHTML += `
                <div>
                    ${teachers.firstName} ${teachers.lastName}  (${teachers.post})
                </div>
            `
        }  
      }  
    }
  }

// Get the students of the course 
function getStudentsFromCourse (counter) {
  
    let students = DATABASE.students.filter((student) => student.courses.some((course) => course.courseId == DATABASE.courses[counter].courseId))
    for (let student of students){
        
        let courseById = student.courses.filter((course) => course.courseId == DATABASE.courses[counter].courseId)
        
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



function getTeacersOnSearch () {

    let search = selectElement("#searchbar").value;
    // console.log(search);

    clearResults();

    if (search.length > 0) {
        
        for ( let i = 0; i < DATABASE.courses.length; i++ ) {

            // console.log(DATABASE.courses[i].title)

            if ( DATABASE.courses[i].title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ) {

                sortCourseTitle();

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

let darkModeToggle = document.querySelector('#dark-mode-toggle');

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

console.log(darkModeToggle)
 
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

selectElement("#searchbar").addEventListener("keyup", getTeacersOnSearch);


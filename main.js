// "use strict";

// function sortCourseTitle () {

//   DATABASE.courses.sort((a, b) => {
//     if (a.title > b.title) {
//       return 1;
//     }
//     else if (a.title < b.title) {
//       return -1;
//     }
//     return 0;

//   })

// }

// function responsibelOfCourse (counter) {
  
//   let course = DATABASE.courses[counter]; 

//   let teachersName = DATABASE.teachers.map((teacher) => `${teacher.firstName} ${teacher.lastName} (${teacher.post})`)

//   let result = course.courseResponsible

//   return teachersName[result];

// }


// function teacherInCourse (counter) {
  
//   let course = DATABASE.courses[counter].teachers;
  
//   // console.log(course)
  
//   for ( let course of DATABASE.courses[counter].teachers) {
//     // console.log(course)
  
//     for ( let teachers of DATABASE.teachers ) {
  
//       if ( course == teachers.teacherId) {
        
//         selectElement(`.name-teachers`).innerHTML += `
//         <div>
//           ${teachers.firstName} ${teachers.lastName}  ( ${teachers.post} )
//         </div>
//         `

//       }   
//     }  
//   }
// }

// function getStudentsFromCourse (counter) {



// }

// //Skapar en dark/light mode funktion där "knappen/button" skapas till en eventListener 
// function darkMode() {
//   // selectElement("body")
//   var element = document.body;
//   const darkMode = localStorage.getItem("darkMode")
//   element.classList.toggle("darkMode");

//   if (JSON.parse(darkMode) == true) {
//       element.classList.remove("darkMode");
//       localStorage.setItem("darkMode", JSON.stringify(false));
//   } 
//   else if (JSON.parse(darkMode) == false) {
//       element.classList.add("darkMode");
//       localStorage.setItem("darkMode", JSON.stringify(true));
//   }
// }

// const btn = document.querySelector('.theme')
// btn.addEventListener('click', darkMode);
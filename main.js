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

function getStudentsCourses (i) {
    for (let studentCourse of DATABASE.students[i].courses) {
        for (let databasCourse of DATABASE.courses) {
            if (studentCourse.courseId == databasCourse.courseId) {
                selectElement(`div > div:last-child > .search-courses`).innerHTML += `
                <div class="course-title">
                ${databasCourse.title} <br>
                ${studentCourse.started.semester} ${studentCourse.started.year}
                ${studentCourse.passedCredits}/${databasCourse.totalCredits}</div>
                `
            }
        }    
    }
}
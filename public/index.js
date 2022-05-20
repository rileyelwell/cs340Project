//Grabs navbar items
var navBarStudents = document.getElementById('navStudents')
var navBarTutors = document.getElementById('navTutors')
var navBarColleges = document.getElementById('navColleges')

/*
Adds a click listener to the navbar for navbar items
Delegation is used to share a single click listener between nav elements
*/
var navBar = document.getElementById('navbar')
navBar.addEventListener('click', function (event) {
    if (event.target == navBarStudents)
        window.location.href = "./students";
    
    if (event.target == navBarTutors)
        window.location.href = "./tutors";

    if (event.target == navBarColleges)
        window.location.href = "./colleges";

})
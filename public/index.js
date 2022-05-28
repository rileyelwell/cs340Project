//Grabs navbar items
var navBarHome = document.getElementById('navHome')
var navBarStudents = document.getElementById('navStudents')
var navBarTutors = document.getElementById('navTutors')
var navBarClasses = document.getElementById('navClasses')
var navBarColleges = document.getElementById('navColleges')

//Adds a click listener to the navbar for navbar items
var navBar = document.getElementById('navbar')
navBar.addEventListener('click', function (event) {
    if (event.target == navBarHome)
        window.location.href = "/";

    if (event.target == navBarStudents)
        window.location.href = "/Students";
    
    if (event.target == navBarTutors)
        window.location.href = "/Tutors";

    if (event.target == navBarClasses)
        window.location.href = "/Classes";
    
    if (event.target == navBarColleges)
        window.location.href = "/Colleges";
})
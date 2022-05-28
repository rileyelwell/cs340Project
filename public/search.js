function searchStudentsFirstName() {
    //get the string input 
    var x  = document.getElementById('studentSearch').value
    // make sure input field is not empty
    if (x == "") { return false; }
    //construct the URL and redirect to it
    window.location = '/Students/search/' + encodeURI(x)
}

function searchTutorsFirstName() {
    //get the string input 
    var x  = document.getElementById('tutorSearch').value
    // make sure input field is not empty
    if (x == "") { return false; }
    //construct the URL and redirect to it
    window.location = '/Tutors/search/' + encodeURI(x)
}

function searchClasses() {
    //get the string input 
    var x  = document.getElementById('classSearch').value
    // make sure input field is not empty
    if (x == "") { return false; }
    //construct the URL and redirect to it
    window.location = '/Classes/search/' + encodeURI(x)
}

function searchColleges() {
    //get the string input 
    var x  = document.getElementById('collegeSearch').value
    // make sure input field is not empty
    if (x == "") { return false; }
    //construct the URL and redirect to it
    window.location = '/Colleges/search/' + encodeURI(x)
}
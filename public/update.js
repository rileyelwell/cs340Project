function updateStudent(studentID){
    $.ajax({
        url: '/Students/' + studentID,
        type: 'PUT',
        data: $('#update-student').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updateTutor(tutorID){
    $.ajax({
        url: '/Tutors/' + tutorID,
        type: 'PUT',
        data: $('#update-tutor').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updateClass(classID){
    $.ajax({
        url: '/Classes/' + classID,
        type: 'PUT',
        data: $('#update-class').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function updateCollege(collegeID){
    $.ajax({
        url: '/Colleges/' + collegeID,
        type: 'PUT',
        data: $('#update-college').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
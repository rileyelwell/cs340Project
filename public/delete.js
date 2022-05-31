function deleteStudent(studentID){
    $.ajax({
        url: '/Students/' + studentID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteTutor(tutorID){
    $.ajax({
        url: '/Tutors/' + tutorID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteClass(classID){
    $.ajax({
        url: '/Classes/' + classID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteCollege(collegeID){
    $.ajax({
        url: '/Colleges/' + collegeID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteStudentTutor(studentID, tutorID){
    $.ajax({
        url: '/StudentsTutors/studentID/' + studentID + '/tutorID/' + tutorID,
        type: 'DELETE',
        success: function(result){
            if(result.responseText != undefined){
              alert(result.responseText)
            }
            else {
              window.location.reload(true)
            } 
        }
    })
};
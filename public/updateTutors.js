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
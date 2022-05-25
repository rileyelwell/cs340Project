function deleteTutor(tutorID){
    $.ajax({
        url: '/Tutors/' + tutorID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
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
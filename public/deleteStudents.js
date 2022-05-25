function deleteStudent(studentID){
    $.ajax({
        url: '/Students/' + studentID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
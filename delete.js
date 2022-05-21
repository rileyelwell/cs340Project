module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStudents(res, mysql, context, complete){
        mysql.pool.query("SELECT Students.studentID as id, firstName, lastName, gpa, email, college, gender, yearInSchool, tutoringBudget, classesHelpNeededIn FROM Students", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteStudent.js"];
        var mysql = req.app.get('mysql');
        getStudents(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('delete', context);
            }
        }
    });
    return router;
}();
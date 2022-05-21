module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Adds a student, redirects to the colleges page after adding */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Students (firstName, lastName, gpa, email, college, gender, yearInSchool, tutoringBudget, classesHelpNeededIn) VALUES (?,?,?,?,?,?,?,?,?)";
        var inserts = [req.body.firstName, req.body.lastName, req.body.gpa, req.body.email, req.body.college, req.body.gender, req.body.yearInSchool, req.body.tutoringBudget, req.body.classesHelpNeededIn];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/');
            }
        });
    });

    /* Adds a tutor, redirects to the colleges page after adding */
    /*router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Tutors (firstName, lastName, affiliatedColleges, classExpertise, email, age, gender, hourlyRate) VALUES (?,?,?,?,?,?,?,?)";
        var inserts = [req.body.firstName, req.body.lastName, req.body.affiliatedColleges, req.body.classExpertise, req.body.email, req.body.age, req.body.gender, req.body.hourlyRate];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/');
            }
        });
    });*/

    return router;
}();
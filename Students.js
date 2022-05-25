module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // gets Students from database 
    function getStudents(res, mysql, context, complete){
        mysql.pool.query("SELECT studentID, firstName, lastName, gpa, email, college, gender, yearInSchool, tutoringBudget, classesHelpNeededIn FROM Students", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.Students = results;
            complete();
        });
    }

    // gets one student (for updating)
    function getStudent(res, mysql, context, studentID, complete){
        var sql = "SELECT studentID, firstName, lastName, gpa, email, college, gender, yearInSchool, tutoringBudget, classesHelpNeededIn FROM Students WHERE studentID = ?";
        var inserts = [studentID];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.Students = results[0];
            complete();
        });
    }

    // adds a student, redirects to the Students page after adding
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
                res.redirect('/Students');
            }
        });
    });

    // displays Students from database
    router.get('/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteStudents.js", "searchStudents.js"];
        var mysql = req.app.get('mysql');
        getStudents(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if(callbackCount >= 1) {
                res.render('Students', context);
            }
        }
    });

    // displays one student for updating
    router.get('/:studentID', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateStudents.js"];
        var mysql = req.app.get('mysql');
        getStudent(res, mysql, context, req.params.studentID, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-student', context);
            }
        }
    });

    // The URI that update data is sent to in order to update a person
    router.put('/:studentID', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body.firstName)
        console.log(req.params.studentID)
        var sql = "UPDATE Students SET firstName=?, lastName=?, gpa=?, email=?, college=?, gender=?, yearInSchool=?, tutoringBudget=?, classesHelpNeededIn=? WHERE studentID=?";
        var inserts = [req.body.firstName, req.body.lastName, req.body.gpa, req.body.email, req.body.college, req.body.gender, req.body.yearInSchool, req.body.tutoringBudget, req.body.classesHelpNeededIn, req.params.studentID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    // deletes a student from database
    router.delete('/:studentID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Students WHERE studentID = ?";
        var inserts = [req.params.studentID];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();
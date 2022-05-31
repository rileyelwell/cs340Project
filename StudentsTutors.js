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

    // gets Tutors from database 
    function getTutors(res, mysql, context, complete){
        mysql.pool.query("SELECT tutorID, firstName, lastName, email, affiliatedColleges, gender, age, hourlyRate, classExpertise FROM Tutors", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.Tutors = results;
            complete();
        });
    }

    function getStudentsTutors(res, mysql, context, complete){
        sql = "SELECT studentID, Students.firstName AS sfn, tutorID, Tutors.firstName AS tfn FROM StudentsTutors join Students using (studentID) join Tutors using (tutorID)"
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.StudentsTutors = results
            complete();
        });
    }


    /* List people with certificates along with displaying a form to associate a person with multiple certificates */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js"];
        var mysql = req.app.get('mysql');
        var handlebars_file = 'StudentsTutors'
        getStudents(res, mysql, context, complete);
        getTutors(res, mysql, context, complete);
        getStudentsTutors(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render(handlebars_file, context);
            }
        }
    });

    /* Associate certificate or certificates with a person and then redirect to the 
    people_with_certs page after adding */
    router.post('/', function(req, res){
        console.log(req.body.StudentsTutors);
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO StudentsTutors (studentID, tutorID) VALUES (?,?)";
        var inserts = [req.body.studentID, req.body.tutorID];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            console.log(error)
            res.redirect("/StudentsTutors");
        }
        else {
            errormessage = "";
            res.redirect('/StudentsTutors');
        }
        });
    });

    /* Delete a person's certification record */
    /* This route will accept a HTTP DELETE request in the form
     * /pid/{{pid}}/cert/{{cid}} -- which is sent by the AJAX form 
     */
    router.delete('/studentID/:studentID/tutorID/:tutorID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM StudentsTutors WHERE studentID = ? AND tutorID = ?";
        var inserts = [req.params.studentID, req.params.tutorID];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400); 
                res.end(); 
            }else{
                res.status(202).end();
            }
        });
    });

    return router;
}();
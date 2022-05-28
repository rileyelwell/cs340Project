module.exports = function(){
    var express = require('express');
    var router = express.Router();

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

    // gets one tutor (for updating)
    function getTutor(res, mysql, context, tutorID, complete){
        var sql = "SELECT tutorID, firstName, lastName, email, affiliatedColleges, gender, age, hourlyRate, classExpertise FROM Tutors WHERE tutorID = ?";
        var inserts = [tutorID];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.Tutors = results[0];
            complete();
        });
    }

    /* Find Tutors whose firstName starts with a given string */
    function getTutorsfirstName(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
        var query = "SELECT tutorID, firstName, lastName, email, affiliatedColleges, gender, age, hourlyRate, classExpertise FROM Tutors WHERE firstName LIKE " + mysql.pool.escape(req.params.s + '%');
        mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.Tutors = results;
            complete();
        });
    }

    /* Display Tutors whose name starts with a given string */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js", "search.js"];
        var mysql = req.app.get('mysql');
        getTutorsfirstName(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('Tutors', context);
            }
        }
    });

    // adds a tutor, redirects to the tutors page after adding
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Tutors (firstName, lastName, email, affiliatedColleges, gender, age, hourlyRate, classExpertise) VALUES (?,?,?,?,?,?,?,?)";
        var inserts = [req.body.firstName, req.body.lastName, req.body.email, req.body.affiliatedColleges, req.body.gender, req.body.age, req.body.hourlyRate, req.body.classExpertise];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/Tutors');
            }
        });
    });

    // displays Tutors from database
    router.get('/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js", "search.js"];
        var mysql = req.app.get('mysql');
        getTutors(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if(callbackCount >= 1) {
                res.render('Tutors', context);
            }
        }
    });

    // displays one tutor for updating
    router.get('/:tutorID', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["update.js"];
        var mysql = req.app.get('mysql');
        getTutor(res, mysql, context, req.params.tutorID, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-tutor', context);
            }
        }
    });

    // The URI that update data is sent to in order to update a tutor
    router.put('/:tutorID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Tutors SET firstName=?, lastName=?, email=?, affiliatedColleges=?, gender=?, age=?, hourlyRate=?, classExpertise=? WHERE tutorID=?";
        var inserts = [req.body.firstName, req.body.lastName, req.body.email, req.body.affiliatedColleges, req.body.gender, req.body.age, req.body.hourlyRate, req.body.classExpertise, req.params.tutorID];
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

    // deletes a tutor from database
    router.delete('/:tutorID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Tutors WHERE tutorID = ?";
        var inserts = [req.params.tutorID];
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
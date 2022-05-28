module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // gets Classes from database 
    function getClasses(res, mysql, context, complete){
        mysql.pool.query("SELECT classID, department, campusBuilding, roomNumber, title FROM Classes", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.Classes = results;
            complete();
        });
    }

    // gets one class (for updating)
    function getClass(res, mysql, context, classID, complete){
        var sql = "SELECT classID, department, campusBuilding, roomNumber, title FROM Classes WHERE classID = ?";
        var inserts = [classID];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.Classes = results[0];
            complete();
        });
    }

    /* Find Classes with a given string */
    function getClassesDept(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
        var query = "SELECT classID, department, campusBuilding, roomNumber, title FROM Classes WHERE department LIKE " + mysql.pool.escape(req.params.s + '%');
        mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.Classes = results;
            complete();
        });
    }

    /* Display Classes with a given string */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js", "search.js"];
        var mysql = req.app.get('mysql');
        getClassesDept(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('Classes', context);
            }
        }
    });

    // adds a class, redirects to the Classes page after adding
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Classes (department, campusBuilding, roomNumber, title) VALUES (?,?,?,?)";
        var inserts = [req.body.department, req.body.campusBuilding, req.body.roomNumber, req.body.title];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/Classes');
            }
        });
    });

    // displays Classes from database
    router.get('/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js", "search.js"];
        var mysql = req.app.get('mysql');
        getClasses(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if(callbackCount >= 1) {
                res.render('Classes', context);
            }
        }
    });

    // displays one class for updating
    router.get('/:classID', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["update.js"];
        var mysql = req.app.get('mysql');
        getClass(res, mysql, context, req.params.classID, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-class', context);
            }
        }
    });

    // The URI that update data is sent to in order to update a person
    router.put('/:classID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Classes SET department=?, campusBuilding=?, roomNumber=?, title=? WHERE classID=?";
        var inserts = [req.body.department, req.body.campusBuilding, req.body.roomNumber, req.body.title, req.params.classID];
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
    router.delete('/:classID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Classes WHERE classID = ?";
        var inserts = [req.params.classID];
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
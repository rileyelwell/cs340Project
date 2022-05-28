module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // gets Colleges from database 
    function getColleges(res, mysql, context, complete){
        mysql.pool.query("SELECT collegeID, address, tuition, ranking FROM Colleges", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.Colleges = results;
            complete();
        });
    }

    // gets one college (for updating)
    function getCollege(res, mysql, context, collegeID, complete){
        var sql = "SELECT collegeID, address, tuition, ranking FROM Colleges WHERE collegeID = ?";
        var inserts = [collegeID];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.Colleges = results[0];
            complete();
        });
    }

    /* Find Colleges with a given string */
    function getCollegesSearch(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
        var query = "SELECT collegeID, address, tuition, ranking FROM Colleges WHERE address LIKE " + mysql.pool.escape(req.params.s + '%');
        mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.Colleges = results;
            complete();
        });
    }

    /* Display Colleges with a given string */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js", "search.js"];
        var mysql = req.app.get('mysql');
        getCollegesSearch(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('Colleges', context);
            }
        }
    });

    // adds a college, redirects to the Colleges page after adding
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Colleges (address, tuition, ranking) VALUES (?,?,?)";
        var inserts = [req.body.address, req.body.tuition, req.body.ranking];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/Colleges');
            }
        });
    });

    // displays Colleges from database
    router.get('/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js", "search.js"];
        var mysql = req.app.get('mysql');
        getColleges(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if(callbackCount >= 1) {
                res.render('Colleges', context);
            }
        }
    });

    // displays one college for updating
    router.get('/:collegeID', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["update.js"];
        var mysql = req.app.get('mysql');
        getCollege(res, mysql, context, req.params.collegeID, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-college', context);
            }
        }
    });

    // The URI that update data is sent to in order to update a college
    router.put('/:collegeID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Colleges SET address=?, tuition=?, ranking=? WHERE collegeID=?";
        var inserts = [req.body.address, req.body.tuition, req.body.ranking, req.params.collegeID];
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

    // deletes a college from database
    router.delete('/:collegeID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Colleges WHERE collegeID = ?";
        var inserts = [req.params.collegeID];
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
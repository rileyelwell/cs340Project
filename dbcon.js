var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_elwellr',
  password        : '####',
  database        : 'cs340_elwellr'
});
module.exports.pool = pool;

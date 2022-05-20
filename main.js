/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var exphbs = require('express-handlebars')
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout:'main',});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);

app.get('/', function (req, res, next) {
  res.status(200).render('home', {}) 
});

app.get('/students', function (req, res, next) {
  res.status(200).render('students', {}) 
});

app.get('/tutors', function (req, res, next) {
  res.status(200).render('tutors', {}) 
});

app.get('/colleges', function (req, res, next) {
  res.status(200).render('colleges', {}) 
});

app.get('/update', function (req, res, next) {
  res.status(200).render('update', {}) 
});

app.get('/delete', function (req, res, next) {
  res.status(200).render('delete', {}) 
});

app.use('/', express.static('public'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

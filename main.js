var express = require('express');
var db = require('./dbcon.js')
var bodyParser = require('body-parser');

// set port to 2293 for testing, start server with terminal command "node main.js"
var app = express();
var port = 2293;

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended:true}));

app.use('/static', express.static('public'))
app.use('/', express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

// use the database, make sure files are there
app.set('mysql', db)
app.use('/Students', require('./Students.js'));
app.use('/Tutors', require('./Tutors.js'));
app.use('/Classes', require('./Classes.js'));
app.use('/Colleges', require('./Colleges.js'));
app.use('/StudentsTutors', require('./StudentsTutors.js'));

// set each page to its proper rendering
app.get('/', function (req, res, next) {
  res.status(200).render('index', {}) 
});

app.get('*', function (req, res) {
  res.status(404).render('404')
})

app.listen(port, function(){
  console.log('Express started on http://localhost:' + port + '; press Ctrl-C to terminate.');
});


/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
//var swig = require('swig');
var nunjucks = require('nunjucks');

//app.engine('html', swig.renderFile);
// all environments
app.set('port', process.env.PORT || 1333);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    noCache : true
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
	res.render('index', { title:'Atresmedia Modules'});
});

app.get('/download', function(req, res){
  var file = __dirname + '/public/pdf/sassions.pdf';
  res.download(file);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

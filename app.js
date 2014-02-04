
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var swig = require('swig');

app.engine('html', swig.renderFile);
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

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
	res.render('index', {title:'sassions'});
});
app.get('/presentation', function(req, res){
	res.render('presentationContent', {title:'sassions'});
});
app.get('/sass', function(req, res){
	var sass = require('node-sass');
	sass.render({
		data: req.query.data,
		includePaths: [ 'public/stylesheets/sass/' ],
		success: function(css){
			res.send(css);
		},
		error: function(error) {
	        //console.log(error);
	        res.send(400, error);
	    }
	})
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config');
var app = express();

require('./database/mongo');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes'));

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: {}
	});
});

app.listen(config.port);
console.log('Starting on port ' + config.port);

module.exports = app;

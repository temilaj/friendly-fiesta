require('dotenv').config({ path: 'variables.env' });
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const notificationsRouter = require('./routes/notifications');

const config = require('./config');
const errorHandlers = require('./helpers/errorHandlers');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/notifications', notificationsRouter);

app.use(errorHandlers.notFound);

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	if (config.env === 'development') {
		res.locals.error = err;
		res.status(400).json({error: err});
	} else {
		res.locals.error = {};
		res.status(500).json({error: err});
	}
});

module.exports = app;

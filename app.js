var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Memasang methode override
const methodOverride = require('method-override');
// memasang express session
const session = require('express-session');
//memasang connect flash
const flash = require('connect-flash');
// Import Mongoose
const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/db_staycation', {//menkoneksikan mongoAtlas ke project
mongoose.connect('mongodb+srv://chairul:Lhokseumawe07@cluster0.67wib.mongodb.net/db_staycation?retryWrites=true&w=majority', {
	// mongoose.connect('mongodb://localhost:27017/BWA_MERN', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//router admin
const adminRouter = require('./routes/admin');
//api router
const apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set(' views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// menggunakan method override
app.use(methodOverride('_method'));
// menggunakan method express-session
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true,
		cookie: {maxAge: 60000},
	})
);
//menggunakan connect flash
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Memasukkan template sbadmin2
app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// admin
app.use('/admin', adminRouter);
//api
app.use('/api/v1/member', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;

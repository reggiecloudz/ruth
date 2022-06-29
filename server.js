// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
const session = require('express-session')
const MongoStore = require('connect-mongo');
const dbConfig = require('./config/dbConfig');
const connectDB = require("./config/db");
// const authorizer = require("./middleware/authorizer");
const User = require("./models/User");
var usersRouter = require('./routes/users');
var categoriesRouter = require("./routes/categories");

connectDB();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'thing$Ucan-tre@d',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: dbConfig.database, collectionName: "sessions" }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

// app.use((req, res, next) => {
//     var roles = [];
//     sammybear.roles.map(role => {
//         roles.push(role.name);
//     });
//     req.roles = roles;
//     console.log(req.roles);
//     return next();
// });

// app.get("/protected", authorizer.hasEveryRole(["ROLE_STAFF", "ROLE_SUPER"]), (req, res) => {
//     res.json({msg: "Welcome"});
// });

app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);

app.listen(3000, (req, res) => {
    console.log("Listening to port 3000");
});
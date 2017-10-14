var Sequelize = require('sequelize');
var compression = require('compression');
var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var pg = require('pg');
var connection = require('./db');
const Promise = require('bluebird');

// calling models just to inserting fake data
var User = require('./models/User');

//routes
var usersRouter = require('./routes/users');

var app = express();
var helmet = require('helmet');

const PORT = 3002;
app.listen(PORT, () => console.log('listening on port ' + PORT));

app.use(compression());
app.use(helmet());
// HTTP access control (CORS)
// The Cross-Origin Resource Sharing (CORS) mechanism gives web servers cross-domain access controls,
// which enable secure cross-domain data transfers. Modern browsers use CORS in an API container
// such as XMLHttpRequest or Fetch - to mitigate risks of cross-origin HTTP requests
app.use(cors())

// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
  app.use(errorHandler());
  console.log('errorHandle loaded!');
}

// uncomment after placing your favicon in /public
// app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'trevya.png')));
app.use(logger('dev'))  // combined
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// API routers to serve up data from the server
app.use('/users', usersRouter);

// all routes will eventually hit this by default if response is not sent
// or if it doesn't hit a route
app.use('*', function (req, res, next) {
  res.send('this is my default route');
});

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const userData = [
  {
    firstName: 'Glauber',
    city: 'Porto Alegre',
    email: 'glauber.righes@gmail.com',
    password: 'my-password!@#'
  },
  {
    firstName: 'Preta',
    city: 'Porto Alegre',
    email: 'miau.righes@gmail.com',
    password: 'miau'
  }
];

connection.sync({
  force: true,
  logging: console.log
})
  .then(() => {
    return Promise.map(userData, user => User.create(user))
  })
  .catch((err) => {
    console.log('err', err);
  });
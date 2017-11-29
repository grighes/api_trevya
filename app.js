const compression = require('compression');
const express = require('express');
const cors = require('cors');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const Promise = require('bluebird');
const helmet = require('helmet');

const app = express();

const connection = require('./db');

// var associations = require('./associations');

// calling models just to inserting fake data
var User = require('./models/User');
var Travel = require('./models/Travel');
var TravelUser = require('./models/TravelUser');

// routes
var usersRouter = require('./routes/users');
var travelsRouter = require('./routes/travels');

const PORT = 3002;
app.listen(PORT, () => console.log('listening on port ' + PORT));

app.use(compression());
app.use(helmet());
app.use(cors());

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

// API routers to serve up data from the server
app.use('/users', usersRouter);
app.use('/travels', travelsRouter);

// all routes will eventually hit this by default if response is not sent
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


if (app.get('env') === 'development') {
  const userData = [
    {
      userName: 'Glauber',
      city: 'Porto Alegre',
      email: 'glauber.righes@gmail.com'
    },
    {
      userName: 'Preta',
      city: 'Porto Alegre',
      email: 'miau.righes@gmail.com'
    }
  ];

  const travelData = [
    {
      travelName: 'NY',
      status: 'In Progress',
      budget: 25.000,
      beginDate: '2017-10-13',
      endDate: '2017-11-24',
      cityStart: 'Porto Alegre',
    },
    {
      travelName: 'Canada',
      status: 'In Progress',
      budget: 16.000,
      beginDate: '2017-09-01',
      endDate: '2017-11-01',
      cityStart: 'Porto Alegre',
    },
    {
      travelName: 'Alabama',
      status: 'In Progress',
      budget: 25.000,
      beginDate: '2017-10-13',
      endDate: '2017-11-24',
      cityStart: 'Porto Alegre',
    },
    {
      travelName: 'Lisboa',
      status: 'In Progress',
      budget: 16.000,
      beginDate: '2017-09-01',
      endDate: '2017-11-01',
      cityStart: 'Porto Alegre',
    }
  ];

  const travelUser = [
    {
      UserId: 1,
      TravelId: 1
    },
    {
      UserId: 2,
      TravelId: 2
    }
  ];
  connection.sync({
    force: true,
    logging: console.log
  })
    .then(() => {
      return Promise.map(userData, user => User.create(user))
    })
    .then(() => {
      return Promise.map(travelData, travel => Travel.create(travel))
    })
    .then(() => {
      return Promise.map(travelUser, travelUser => TravelUser.create(travelUser))
    })
    .catch((err) => {
      console.log('err', err);
    });
} else {
  connection.sync({ })
    .catch((err) => {
      console.log('err', err);
    });
}

const Sequelize = require('sequelize');

// const db = new Sequelize('postgres://localhost:3002', {
//   logging: false
// });

const connection = new Sequelize('dbTrevya1', 'glauber', '1234', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = connection;

// We'll define associations after we import them here
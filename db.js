const Sequelize = require('sequelize');

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
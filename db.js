const Sequelize = require('sequelize');
const express = require('express');

const app = express();

let connection;

if (app.get('env') === 'development') {
  console.log('localhost');
  connection = new Sequelize('dbTrevya1', 'glauber', '1234', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  });
} else {
  console.log('production');
  const ELEPHANTSQL = "postgres://kuscqoyh:TO_t9aFPnVTla5lcz4XtqetMCjvHXhqS@tantor.db.elephantsql.com:5432/kuscqoyh";
  connection = new Sequelize(ELEPHANTSQL, {
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  });
}

module.exports = connection;

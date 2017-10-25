const Sequelize = require('sequelize');
const connection = require('../db');
var User = require('../models/User');
var Travel = require('../models/Travel');

// We'll define associations after we import them here
// Travel.belongsToMany(User, { through: 'travelsUser' });
// User.belongsToMany(Travel, { through: 'travelsUser' });

const TravelUser = connection.define('travelUser', {});
TravelUser.belongsTo(Travel);
TravelUser.belongsTo(User);


module.exports = TravelUser;
const router = require('express').Router();
const User = require('../models/User');

module.exports = router;

router.get('/', function (req, res, next) {
  User.findAll()
    .then(res.send.bind(res))
    .catch(next)
});
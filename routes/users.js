const router = require('express').Router();
const User = require('../models/User');

module.exports = router;

router.get('/', function (req, res, next) {
  User.findAll()
    .then(res.send.bind(res))
    .catch(next)
});

router.post('/', function (req, res, next) {
  User.findCreateFind({
    where: req.body
  })
    .then(res.send.bind(res))
    .catch(next);
});

router.put('/', (req, res, next) => {
  console.log(res);
  User.update(
    { tokenId: req.query.uid },
    { where: { email: req.query.email } }
  )
    .then(res.send.bind(res))
    .catch(next);

});
const router = require('express').Router();
const Travel = require('../models/Travel');

module.exports = router;

router.get('/', function (req, res, next) {
  Travel.findAll()
    .then(res.send.bind(res))
    .catch(next)
});

router.post('/', function (req, res, next) {
  Travel.findCreateFind({
    where: req.body
  })
  .then(res.send.bind(res))
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  Travel.findById(req.params.id)
    .then(res.send.bind(res))
    .catch(next);
});

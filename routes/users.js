const router = require('express').Router();
const User = require('../models/User');

// const HTTPStatus = require('http-status');

// const defaultResponse = (data, statusCode = HTTPStatus.OK) => ({
//   data,
//   statusCode,
// });

// const errorResponse = (message, statusCode = HTTPStatus.BAD_REQUEST) => defaultResponse({
//   error: message,
// }, statusCode);

router
  .get('/', (req, res, next) => {
    User.findAll()
      .then(res.send.bind(res))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    User.findCreateFind({
      where: req.body,
    })
      .then(res.send.bind(res))
      .catch(next);
  })

  .put('/', (req, res, next) => {
    User.update(
      { tokenId: req.query.uid },
      { where: { email: req.query.email } },
    )
      .then(res.send.bind(res))
      .catch(next);
  });

router
  .get('/:id', (req, res, next) => {
    User.findById(req.params.id)
      .then(res.send.bind(res))
      .catch(next);
  });

module.exports = router;

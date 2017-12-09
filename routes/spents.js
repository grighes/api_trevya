const router = require('express').Router();
const Spent = require('../models/Spent');
const HTTPStatus = require('http-status');

const defaultResponse = (data, statusCode = HTTPStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HTTPStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

router
  .get('/', (req, res, next) => {
    Spent.findAll()
      .then(res.send.bind(res))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    Spent.findCreateFind({
      where: req.body,
    })
      .then(res.send.bind(res))
      .catch(next);
  })

  .delete('/', (req, res) => {
    Spent.destroy({
      where: req.body,
    })
      .then(defaultResponse(res, HTTPStatus.NO_CONTENT))
      .catch(err => errorResponse(err.message, HTTPStatus.UNPROCESSABLE_ENTITY));
  });

router
  .get('/:id', (req, res, next) => {
    Spent.findById(req.params.id)
      .then(res.send.bind(res))
      .catch(next);
  })

  .delete('/:id', (req, res) => {
    Spent.destroy({
      where: { id: req.params.id },
    })
      .then(defaultResponse(res, HTTPStatus.NO_CONTENT))
      .catch(err => errorResponse(err.message, HTTPStatus.UNPROCESSABLE_ENTITY));
  });

module.exports = router;

const router = require('express').Router();
const Travel = require('../models/Travel');
const HTTPStatus = require('http-status');
// const TravelUser = require('../models/TravelUser');

const defaultResponse = (data, statusCode = HTTPStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HTTPStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

router
  .get('/', (req, res, next) => {
    Travel.findAll()
      .then(res.send.bind(res))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    Travel.findCreateFind({
      where: req.body,
    })
      .then(res.send.bind(res))
      .catch(next);
  })

  .delete('/', (req, res) => {
    Travel.destroy({
      where: req.body,
    })
      .then(defaultResponse(res, HTTPStatus.NO_CONTENT))
      .catch(err => errorResponse(err.message, HTTPStatus.UNPROCESSABLE_ENTITY));
  });

router
  .get('/:id', (req, res, next) => {
    Travel.findById(req.params.id)
      .then(res.send.bind(res))
      .catch(next);
  })

  .delete('/:id', (req, res) => {
    Travel.destroy({
      where: { id: req.params.id },
    })
      .then(defaultResponse(res, HTTPStatus.NO_CONTENT))
      .catch(err => errorResponse(err.message, HTTPStatus.UNPROCESSABLE_ENTITY));
  });

// create a new travel with firebase uid

// router
//   .post('?uid=T74I9lgzRkSvWbwXSRO3fP53uYH2', (req, res, next) => {
//     Travel.findCreateFind(
//       { tokenId: req.param.uid },
//       {
//         TravelUser: [
//           { TravelId: 1 },
//           { Userid: 2 }
//         ]
//       }
//     )
//       .then(res.send.bind(res))
//       .catch(next);
//   });

module.exports = router;

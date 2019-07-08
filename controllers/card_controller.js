const bodyParser = require('body-parser');
const Card = require('../models/card');

const urlencodedParser = bodyParser.urlencoded({extended: true});

module.exports = function(app) {
  //card API
  app.get('/hs/card', function(req, res) {
    Card.getCards(req.query, (c) => {
      let payload = {cards: c};
      res.json(payload);
    });
  });
}

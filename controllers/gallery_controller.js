const bodyParser = require('body-parser');
const Card = require('../models/card');

const urlencodedParser = bodyParser.urlencoded({extended: true});

module.exports = function(app) {
  app.get('/hs/gallery', function(req, res) {
    console.log('/hs/gallery GET');
    console.log(req.query);
    Card.getCards(req.query, (c) => {
      let payload = {cards: c};
      console.log(payload.length);
      res.render('gallery', payload);
    });
  });
}

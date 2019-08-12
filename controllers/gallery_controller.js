const bodyParser = require('body-parser');
const Card = require('../models/card');

const urlencodedParser = bodyParser.urlencoded({extended: true});

module.exports = function(app) {

  app.get('/gallery', function(req, res) {
    console.log('/gallery GET');
    console.log(req.query);
    res.render('gallery', {cards:[]});
    //    Card.getCards(req.query, (c) => {
    //      let payload = {cards: c};
    //      console.log(payload.length);
    //      res.render('gallery', payload);
    //    });
  });
}

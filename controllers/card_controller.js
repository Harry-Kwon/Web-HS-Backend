const bodyParser = require('body-parser');
const Card = require('../models/card');

const urlencodedParser = bodyParser.urlencoded({extended: true});

module.exports = function(app) {

  //card API
  app.get('/card', function(req, res) {
    console.log('session');
    console.log(req.sessionID);
    let q = req.query
    if(q['name'] != null) {
      q['lowername'] = q['name'].toLowerCase();
      delete q['name'];
    }
    console.log(q);
    Card.getCards(q, (c) => {
      let payload = {cards: c};
      res.json(payload);
    });
  });
}

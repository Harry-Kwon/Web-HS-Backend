const bodyParser = require('body-parser');


module.exports = function(app) {
  app.get('/hs/gallery', function(req, res) {
    console.log('/hs/gallery GET');
    let payload = {cards: [{imageUrl: "https://raw.githubusercontent.com/schmich/hearthstone-card-images/4.12.3/rel/49502.png"}, {imageUrl: "https://raw.githubusercontent.com/schmich/hearthstone-card-images/4.12.3/rel/49361.png"}]};
    res.render('gallery', payload);
  });
}

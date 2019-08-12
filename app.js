const express = require('express');

const hostname = '127.0.0.1'
const port = 3000;

var app = express();
//ejs template engine
app.set('view engine', 'ejs');
//static files
app.use(express.static('./assets'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.redirect('/gallery');
});

//controllers
const galleryController = require('./controllers/gallery_controller');
galleryController(app);

const cardController = require('./controllers/card_controller');
cardController(app);

//start app
app.listen(3001);

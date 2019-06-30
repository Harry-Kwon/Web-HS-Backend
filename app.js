const express = require('express');

const hostname = '127.0.0.1'
const port = 3000;

var app = express();
//ejs template engine
app.set('view engine', 'ejs');
//static files
app.use(express.static('./assets'));

app.get('/hs', function(req, res){
  console.log(req);
  res.render('home');
});



//controllers
const galleryController = require('./gallery/gallery_controller');
galleryController(app);

//start app
app.listen(3000);

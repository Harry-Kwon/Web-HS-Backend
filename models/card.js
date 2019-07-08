// Object Oriented Model for a Hearthstone Card
// Harry Kwon
db = require('../db');

const CARD_TABLE = 'card';
const CARD_FIELDS = ['id', 'collectible', 'slug', 'classid', 'cardtypeid', 'cardsetid', 'rarityid', 'artistname', 'manacost', 'name', 'text', 'image', 'flavortext'];
const NULL_INPUTS = ['', undefined, null];

// Card Object Contructor / Factory
// Takes a dictionary with parameter values
var Card = function(params) {
  CARD_FIELDS.forEach((x) => {
    this[x] = params[x];
  });
}

Card.prototype.insert_db= function(callback) {
  let values = [];
  CARD_FIELDS.forEach((field) => {
    values.push(this[field]);
  });
  db.insert(CARD_TABLE, CARD_FIELDS, values, callback);
}

Card.getCards = function(params, callback) {
  console.log('a');
  console.log(params);
  Object.keys(params).forEach((key) => {
    if(!CARD_FIELDS.includes(key)) {
      delete params[key];
    }
    if(NULL_INPUTS.includes(params[key])) {
      delete params[key];
    }
  });
  console.log(params);

  db.select(CARD_TABLE, params, (err, rows) => {
    if(err) {
      console.error(err);
    } else {
      let cards=[];
      rows.forEach((x) => {
        cards.push(new Card(x));
      });
      callback(cards);
    }
  });
}


module.exports = Card;

if (require.main === module) {
  Card.getCards({id:254}, (x)=>{console.log(x)});
  Card.getCards({classId: 6, manaCost: 8}, console.log);
}

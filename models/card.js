// Object Oriented Model for a Hearthstone Card
// Harry Kwon
db = require('../db');

const CARD_FIELDS = ['id', 'collectible', 'slug', 'classId', 'cardTypeId', 'cardSetId', 'rarityId', 'artistName', 'manaCost', 'name', 'text', 'image', 'flavorText'];

// Card Object Contructor / Factory
// Takes a dictionary with parameter values
function Card(params) {
  CARD_FIELDS.forEach((x) => {
    this[x] = params[x];
  });
}

//Card.prototype.update_db = function(callback) {
//  db.query(SELECT id FROM
//}
module.exports = Card;

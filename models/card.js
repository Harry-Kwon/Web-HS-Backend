// Object Oriented Model for a Hearthstone Card
// Harry Kwon
db = require('../db');

const CARD_TABLE = 'card';
const CARD_FIELDS = ['id', 'collectible', 'slug', 'classId', 'cardTypeId', 'cardSetId', 'rarityId', 'artistName', 'manaCost', 'name', 'text', 'image', 'flavorText'];

// Card Object Contructor / Factory
// Takes a dictionary with parameter values
function Card(params) {
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

module.exports = Card;

if (require.main === module) {
  //unit test
  var c = new Card({
    id: 254,
    collectible: 1,
    slug: '254-innervate',
    classId: 2,
    cardTypeId: 5,
    cardSetId: 2,
    rarityId: 2,
    artistName: 'Doug Alexander',
    manaCost: 0,
    name: 'Innervate',
    text: 'Gain 1 Mana Crystal this turn only.',
    image:
     'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/ba76f5895f734927f34cbeb6938946caaaa261d1b7cb7d54282cb34b8b810025.png',
    flavorText:
     'Some druids still have flashbacks from strangers yelling "Innervate me!!" at them.' });
  c.insert_db((err, res)=>{
    if(err) {
      throw err;
    }
    console.log(res);
  });

}

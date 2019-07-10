// Object Oriented Model for a Hearthstone Card
// Harry Kwon
const db = require('../db');

const CARD_TABLE = 'card';
const CARD_FIELDS = [
  'id',
  'collectible',
  'slug',
  'classid',
  'cardtypeid',
  'cardsetid',
  'rarityid',
  'artistname',
  'manacost',
  'name',
  'text',
  'image',
  'flavortext',
];
const NULL_INPUTS = ['', undefined, null];

/**
 * Represents a card
 * @constructor
 * @param [obj] params Dictionary of card parameters
 */
var Card = function(params) {
  CARD_FIELDS.forEach((x) => {
    this[x] = params[x];
  });
};

/**
 * Callback for database queries
 *
 * @callback queryCallback
 * @param {Error} err Error that occured during the query.
 * @param {obj} res Object containing query data.
 */

/**
 * Inserts the current card state into the database as a new row.
 * @param {queryCallback} callback Callback function for the query.
 */
Card.prototype.insert_db = function(callback) {
  let values = [];
  CARD_FIELDS.forEach((field) => {
    values.push(this[field]);
  });
  db.insert(CARD_TABLE, CARD_FIELDS, values, callback);
};

/**
 * Gets all cards from the database that match parameters
 * @param {Obj} params Dictionary containing parameters to search for.
 * @param {function} callback Callback function that takes an array of Cards.
 */
Card.getCards = function(params, callback) {
  Object.keys(params).forEach((key) => {
    if (!CARD_FIELDS.includes(key)) {
      delete params[key];
    }
    if (NULL_INPUTS.includes(params[key])) {
      delete params[key];
    }
  });
  console.log(params);

  db.select(CARD_TABLE, params, (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      let cards=[];
      rows.forEach((x) => {
        cards.push(new Card(x));
      });
      callback(cards);
    }
  });
};


module.exports = Card;

if (require.main === module) {
  Card.getCards({id: 254}, (x)=>{
    console.log(x);
  });
  Card.getCards({classId: 6, manaCost: 8}, console.log);
}

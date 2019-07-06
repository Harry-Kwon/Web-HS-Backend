const fs = require('fs');
const path = require('path');
const {Pool} = require('pg');

const pool = new Pool({
  user: 'hsuser',
  host: 'localhost',
  database: 'hs',
  password: 'hsuser',
  port: 5432
});

function query(text, params, callback) {
  console.log('query: ' + text);
  return pool.query(text, params, callback);
}

function echo(err, res) {
  if(err) {
    throw err;
  }
  console.log(res.rows);
}

//initialize database
function init_db() {
  //create tables
  let init_db_source = path.join(__dirname, '/init_database.sql');
  const createTableQuery = fs.readFileSync(init_db_source).toString();
  console.log(query(createTableQuery, [], echo));
}

function insert(table, fields, values, callback) {
  let fields_string = fields.join(', ');
  let values_string = [];
  for(let i=0; i<values.length; i++) {
    values_string.push('$'+(i+1));
  }
  values_string = values_string.join(', ');

  let insert_query = 'INSERT INTO ' + table + ' (' + fields_string + ') VALUES (' + values_string + ');';
  query(insert_query, values, callback);
}

function select(table, params, callback) {
  let paramsString = [];
  let keys = Object.keys(params);
  let values = Object.values(params);
  console.log(keys);
  for(let i=0; i<keys.length; i++) {
    let s = '' + keys[i] + ' = $' + (i+1);
    console.log(s);
    paramsString.push(s);
  }
  paramsString = paramsString.join(' AND ');

  let insert_query = 'SELECT * FROM ' + table + ' WHERE ' + paramsString + ';';
  console.log(insert_query);
  query(insert_query, values, (err, res) => {
    if(err) {
      throw err;
    }
    callback(res.rows);
  });
}

module.exports = {
  query: query,
  insert: insert,
  init_db: init_db
}

if (require.main === module) {
  //unit test
  select('card', {collectible:1, classId:2, manaCost:8}, echo);
}

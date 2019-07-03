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
  console.log(res);
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
  let values_string = values.join(', ');
  let query = 'INSERT INTO ' + table + ' (' + fields_string + ') VALUES ' + values_string + ';';
  query(query, [], callback);
}

module.exports = {
  query: query,
  insert: insert,
  init_db: init_db
}

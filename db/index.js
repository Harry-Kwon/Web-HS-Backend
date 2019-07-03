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

module.exports = {
  query: query,
  init_db: init_db
}

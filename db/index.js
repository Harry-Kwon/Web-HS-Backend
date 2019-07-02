const fs = require('fs');
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
  const createTableQuery = fs.readFileSync('init_database.sql').toString();
  console.log(query(createTableQuery, [], echo));
}

console.log(query('SELECT version();', [], echo));

init_db();

module.exports = {
  query: query
}

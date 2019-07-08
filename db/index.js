const fs = require('fs');
const path = require('path');
const {Pool} = require('pg');

const SECRETS=path.join(__dirname, '../secrets.json');

let data = JSON.parse(fs.readFileSync(SECRETS, {encoding: 'utf8'}));
const pool = new Pool(data['database']);

function query(text, params, callback) {
  console.log('query: ' + text);
  console.log('values: ' + params);
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
  query(createTableQuery, [], echo);
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
  let select_query = 'SELECT * FROM ' + table;

  let keys = [];
  let values = [];
  if(params !== undefined && Object.keys(params).length>0) {
    keys = Object.keys(params);
    values = Object.values(params);

    let paramsString = [];
    for(let i=0; i<keys.length; i++) {
      let s = '' + keys[i] + ' = $' + (i+1);
      paramsString.push(s);
    }
    paramsString = paramsString.join(' AND ');

    select_query += ' WHERE ' + paramsString + ';';
  }

  query(select_query, values, (err, res) => {
    if(err) {
      callback(err, null);
    } else {
      callback(err, res.rows);
    }
  });
}

module.exports = {
  query: query,
  insert: insert,
  select: select,
  init_db: init_db
}

if (require.main === module) {
  select('card', {id:254}, console.log);
}

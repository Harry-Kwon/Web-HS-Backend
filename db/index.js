/**
 * @fileoverview Module for interacting with the database
 * @author harrykwon@harrykwon.dev (Harry Kwon)
 */
const fs = require('fs');
const path = require('path');
const {Pool} = require('pg');

const SECRETS = path.join(__dirname, '../secrets.json');
const DB_INIT_FILE = './init_database.sql';

const data = JSON.parse(fs.readFileSync(SECRETS, {encoding: 'utf8'}));
const pool = new Pool(data['database']);

/**
 * Callback for a general database query
 *
 * @callback queryCallback
 * @param {Error} err Error that occured during the query.
 *    Null if no error occurred.
 * @param {obj} res An object containing the response from the query.
 *    Null if error occurred.
 */

/**
 * Asynchronously executes a parameterized database query
 *    with the provided parameter and passes the result to a callback function
 * @param {string} text Parameterized query statement
 * @param {obj[]} params Parameters to be used in the query
 * @param {queryCallback} callback Callback function,
 *    takes error and response data
 */
function query(text, params, callback) {
  pool.query(text, params, callback);
}

/**
 * initializes the database from sql statements in file DB_INIT_FILE
 */
function initDatabase() {
  const initDatabaseSource = path.join(__dirname, DB_INIT_FILE);
  const createTableQuery = fs.readFileSync(initDatabaseSource).toString();
  query(createTableQuery, [], (err, res) => {
    if (err) {
      throw err;
    }
    console.log(res);
  });
}

/**
 * Asynchronously inserts a single row into a table
 * @param {string} table Name of the table to insert data into
 * @param {string[]} fields Names of columns of table to insert data into
 * @param {string[]} values Values of the row to insert
 * @param {queryCallback} callback Callback function for query
 */
function insert(table, fields, values, callback) {
  const fieldsString = fields.join(', ');
  let valuesString = [];
  for (let i=0; i<values.length; i++) {
    valuesString.push('$'+(i+1));
  }
  valuesString = valuesString.join(', ');

  const insertQuery = 'INSERT INTO ' + table + ' (' + fieldsString + ') '
      + 'VALUES (' + valuesString + ');';
  query(insertQuery, values, callback);
}

/**
 * Callback for a database select query
 *
 * @callback selectQueryCallback
 * @param {Error} err Error that occured during the callback.
 *    Null if no error occurred.
 * @param {obj[]} rows Array of objects containing data from rows returned
 *    Null if error occurred.
 */

/**
 * Asynchronously finds rows matching some criteria
 * @param {string} table Name of the table to search
 * @param {obj} params Criteria to search by
 * @param {string[]} Object.keys(params) Array of columns to search
 * @param {string[]} Object.values(params) Array of values to search
 * @param {selectQueryCallback} callback Callback function.
 *    Error and row data is passed to this callback.
 */
function select(table, params, callback) {
  let selectQuery = 'SELECT * FROM ' + table;

  let keys = [];
  let values = [];
  if (params !== undefined && Object.keys(params).length>0) {
    keys = Object.keys(params);
    values = Object.values(params);

    let paramsString = [];
    for (let i=0; i<keys.length; i++) {
      const s = '' + keys[i] + ' = $' + (i+1);
      paramsString.push(s);
    }
    paramsString = paramsString.join(' AND ');

    selectQuery += ' WHERE ' + paramsString + ';';
  }

  query(selectQuery, values, (err, res) => {
    if (err) {
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
  initDatabase: initDatabase,
};

if (require.main === module) {
  select('card', {id: 254}, console.log);
}

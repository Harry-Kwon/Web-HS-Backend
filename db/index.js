const {Pool} = require('pg');

const pool = new Pool({
  user: 'hsuser',
  host: 'localhost',
  database: 'hs',
  password: 'hsuser',
  port: 5432
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}

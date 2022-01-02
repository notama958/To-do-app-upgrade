const dotenv = require('dotenv');
dotenv.config();
const envr = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[envr]; // production or development
const database = require('knex')(config);

(async () => {
  return database
    .raw(
      process.env.NODE_ENV === 'development'
        ? 'select 1+1;'
        : 'PRAGMA foreign_keys = ON;'
    ) // -- foreign keys are not activated by default in sqlite
    .then(console.log('\nDB connected'))
    .catch((err) => {
      console.log('DB not connected');
      console.log(err);
    });
})();

module.exports = database;

const envr = process.env.ENVIRONMENT || 'development';
const config = require('../knexfile.js')[envr];
const database = require('knex')(config);

(async () => {
  return database
    .raw('PRAGMA foreign_keys = ON;') // -- foreign keys are not activated by default
    .then(console.log('\nDB connected'))
    .catch((err) => {
      console.log('DB not connected');
      console.log(err);
    });
})();

module.exports = database;

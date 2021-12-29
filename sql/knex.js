const envr = process.env.ENVIRONMENT || 'development';
const config = require('../knexfile.js')[envr];
const database = require('knex')(config);

(async () => {
  return database
    .raw('select 1+1 as result')
    .then((res) => console.log('DB connected', res[0]))
    .catch((err) => {
      console.log('DB not connected');
      console.log(err);
    });
})();

module.exports = database;

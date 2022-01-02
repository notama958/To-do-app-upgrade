const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      host: '127.0.0.1',
      filename: './sql/mydata.db',
    },
  },
  useNullAsDefault: true,
  migration: {
    directory: './sql/migrations',
  },
  seeds: {
    directory: './sql/seeds',
  },
  production: {
    client: 'psql',
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
  },
};

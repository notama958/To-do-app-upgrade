// Update with your config settings.

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
};

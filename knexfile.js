// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      filename: 'postgres://localhost/peaks',
      migrations: {
        directory: './db/migrations'
      },
      seeds: {
        director: './db/seeds'
      },
      useNullAsDefault: true
    }
  }

};

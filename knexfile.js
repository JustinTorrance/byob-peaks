module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/peaks',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  }
};
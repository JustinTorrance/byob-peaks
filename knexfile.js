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
  },
  production: {
    client: 'pg',
    connection: 'postgres://eyqforjoryddbv:56a3243d5a2df41b937ea3b0f8dd473fb33bbf2a11fe21e14864e2c9f33ff731@ec2-54-225-106-93.compute-1.amazonaws.com:5432/db909mcqtn6kmn',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  }
};
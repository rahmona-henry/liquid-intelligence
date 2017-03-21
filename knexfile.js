// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'liquid network'
    }
  },

  production: process.env.DATABASE_URL || {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'liquid'
    }
  },

  production:{
    client: 'pg',
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

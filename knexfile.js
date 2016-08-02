// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'liquid'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'liquid',

    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: process.env.Database_URL || {
    client: 'postgresql',
    connection: process.env.Database_URL,
  
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

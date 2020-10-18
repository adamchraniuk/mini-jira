module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'mysql',
      database: 'mini_jira',
      port: '3306',
      user: 'admin',
      password: 'admin',
    },
    useNullAsDefault: true,
    seeds: {
      directory: 'server/dist/knex/seeds',
    },
    migrations: {
      directory: 'server/dist/knex/migrations',
    },
  },
}

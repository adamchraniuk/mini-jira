import config from './config/default'
import Knex from 'knex'

export const knex = Knex({
  client: 'mysql2',
  connection: config.mysql,
}) as Knex

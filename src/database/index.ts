import { Pool, PoolConfig } from 'pg'
import config from '../config'

const dbConfig: PoolConfig = {
  host: config.dbHost,
  database: config.dbName,
  user: config.dbUser,
  password: config.dbPassword,
  port: config.dbPort
}

const pool = new Pool(dbConfig)

pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

export default pool

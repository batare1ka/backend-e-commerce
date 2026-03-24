import { Pool } from 'pg'

import { DiContainer } from '../container.js'

export const connectDb = () => {
  const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
  })

  DiContainer.set('pool', pool)
}

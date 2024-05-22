import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import { env } from '@/lib/env.mjs'
import * as schema from './schema'

const client = new Client({
  host: env.POSTGRES_HOST,
  port: 5432,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DATABASE,
  ssl: env.POSTGRES_SSL === 'true',
})

await client.connect()

export const db = drizzle(client, { schema })

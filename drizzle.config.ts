import { env } from '@/lib/env.mjs'

const config = {
  schema: './lib/db/schema',
  out: './lib/db/migrations',
  driver: 'pg',
  // dialect: 'pg',
  // host: 'localhost',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
}

export default config

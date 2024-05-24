import { env } from '@/lib/env.mjs'

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing')
}

const config = {
  schema: './lib/db/schema',
  out: './lib/db/migrations',
  // driver: 'pg',
  dialect: 'postgresql',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
    // url: env.DATABASE_URL,
  },
}

export default config

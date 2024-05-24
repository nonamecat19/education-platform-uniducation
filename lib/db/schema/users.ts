import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { getUsers } from '@/lib/api/users/queries'

export const users = pgTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  role: text('role').default('student'),
})

const baseSchema = createSelectSchema(users)

export const insertUserSchema = baseSchema

export const insertUserParams = baseSchema
  .omit({
    id: true,
  })

export const updateUserSchema = baseSchema
export const updateUserParams = baseSchema
export const userIdSchema = baseSchema.pick({ id: true })

export type User = typeof users.$inferSelect
export type NewUser = z.infer<typeof insertUserSchema>
export type NewUserParams = z.infer<typeof insertUserParams>
export type UpdateUserParams = z.infer<typeof updateUserParams>
export type UserId = z.infer<typeof userIdSchema>['id']

export type CompleteUser = Awaited<
  ReturnType<typeof getUsers>
>['users'][number]

import { sql } from 'drizzle-orm'
import { varchar, timestamp, pgTable, uniqueIndex } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { groups } from './groups'
import { users } from '@/lib/db/schema/auth'
import { type getStudents } from '@/lib/api/students/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const students = pgTable(
  'students',
  {
    id: varchar('id', { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    name: varchar('name', { length: 256 }).notNull(),
    surname: varchar('surname', { length: 256 }).notNull(),
    patronomic: varchar('patronomic', { length: 256 }),
    groupId: varchar('group_id', { length: 256 })
      .references(() => groups.id)
      .notNull(),
    email: varchar('email', { length: 256 }).notNull(),
    stuentId: varchar('stuent_id', { length: 256 }).notNull(),
    password: varchar('password', { length: 256 }),
    userId: varchar('user_id', { length: 256 })
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),

    createdAt: timestamp('created_at')
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp('updated_at')
      .notNull()
      .default(sql`now()`),
  },
  (students) => {
    return {
      emailIndex: uniqueIndex('email_idx').on(students.email),
    }
  },
)

// Schema for students - used to validate API requests
const baseSchema = createSelectSchema(students).omit(timestamps)

export const insertStudentSchema = createInsertSchema(students).omit(timestamps)
export const insertStudentParams = baseSchema
  .extend({
    groupId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
    userId: true,
  })

export const updateStudentSchema = baseSchema
export const updateStudentParams = baseSchema
  .extend({
    groupId: z.coerce.string().min(1),
  })
  .omit({
    userId: true,
  })
export const studentIdSchema = baseSchema.pick({ id: true })

// Types for students - used to type API request params and within Components
export type Student = typeof students.$inferSelect
export type NewStudent = z.infer<typeof insertStudentSchema>
export type NewStudentParams = z.infer<typeof insertStudentParams>
export type UpdateStudentParams = z.infer<typeof updateStudentParams>
export type StudentId = z.infer<typeof studentIdSchema>['id']

// this type infers the return from getStudents() - meaning it will include any joins
export type CompleteStudent = Awaited<
  ReturnType<typeof getStudents>
>['students'][number]

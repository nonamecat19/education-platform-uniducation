import { sql } from 'drizzle-orm'
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { type getTeachers } from '@/lib/api/teachers/queries'

import { nanoid, timestamps } from '@/lib/utils'
import { users } from '@/lib/db/schema/users'

export const teachers = pgTable('teachers', {
  id: varchar('id', { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar('name', { length: 256 }).notNull(),
  surname: varchar('surname', { length: 256 }).notNull(),
  patronymic: varchar('patronymic', { length: 256 }),
  profession: varchar('profession', { length: 256 }),
  userId: varchar('user_id', { length: 256 })
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),

  createdAt: timestamp('created_at').notNull().default(sql`now
        ()`),
  updatedAt: timestamp('updated_at').notNull().default(sql`now
        ()`),
})

const baseSchema = createSelectSchema(teachers).omit(timestamps)

export const insertTeacherSchema = createInsertSchema(teachers).omit(timestamps)
export const insertTeacherParams = baseSchema.extend({}).omit({
  id: true,
})

export const updateTeacherSchema = baseSchema
export const updateTeacherParams = baseSchema.extend({})
export const teacherIdSchema = baseSchema.pick({ id: true })

export type Teacher = typeof teachers.$inferSelect
export type NewTeacher = z.infer<typeof insertTeacherSchema>
export type NewTeacherParams = z.infer<typeof insertTeacherParams>
export type UpdateTeacherParams = z.infer<typeof updateTeacherParams>
export type TeacherId = z.infer<typeof teacherIdSchema>['id']

export type CompleteTeacher = Awaited<
  ReturnType<typeof getTeachers>
>['teachers'][number]

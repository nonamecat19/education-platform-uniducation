import { sql } from 'drizzle-orm'
import { varchar, integer, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { subjects } from './subjects'
import { groups } from './groups'
import { type getGroupSubjects } from '@/lib/api/groupSubjects/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const groupSubjects = pgTable('group_subjects', {
  id: varchar('id', { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  subjectId: varchar('subject_id', { length: 256 })
    .references(() => subjects.id)
    .notNull(),
  groupId: varchar('group_id', { length: 256 })
    .references(() => groups.id)
    .notNull(),
  hours: integer('hours'),

  createdAt: timestamp('created_at')
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp('updated_at')
    .notNull()
    .default(sql`now()`),
})

// Schema for groupSubjects - used to validate API requests
const baseSchema = createSelectSchema(groupSubjects).omit(timestamps)

export const insertGroupSubjectSchema =
  createInsertSchema(groupSubjects).omit(timestamps)
export const insertGroupSubjectParams = baseSchema
  .extend({
    subjectId: z.coerce.string().min(1),
    groupId: z.coerce.string().min(1),
    hours: z.coerce.number(),
  })
  .omit({
    id: true,
  })

export const updateGroupSubjectSchema = baseSchema
export const updateGroupSubjectParams = baseSchema.extend({
  subjectId: z.coerce.string().min(1),
  groupId: z.coerce.string().min(1),
  hours: z.coerce.number(),
})
export const groupSubjectIdSchema = baseSchema.pick({ id: true })

// Types for groupSubjects - used to type API request params and within Components
export type GroupSubject = typeof groupSubjects.$inferSelect
export type NewGroupSubject = z.infer<typeof insertGroupSubjectSchema>
export type NewGroupSubjectParams = z.infer<typeof insertGroupSubjectParams>
export type UpdateGroupSubjectParams = z.infer<typeof updateGroupSubjectParams>
export type GroupSubjectId = z.infer<typeof groupSubjectIdSchema>['id']

// this type infers the return from getGroupSubjects() - meaning it will include any joins
export type CompleteGroupSubject = Awaited<
  ReturnType<typeof getGroupSubjects>
>['groupSubjects'][number]

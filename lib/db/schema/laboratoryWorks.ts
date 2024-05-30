import { sql } from 'drizzle-orm'
import { varchar, integer, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { type getLaboratoryWorks } from '@/lib/api/laboratoryWorks/queries'

import { nanoid, timestamps } from '@/lib/utils'
import { units } from '@/lib/db/schema/units'

export const laboratoryWorks = pgTable('laboratory_works', {
  id: varchar('id', { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  unitId: varchar('unit_id', { length: 256 })
    .references(() => units.id)
    .notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 256 }),
  order: integer('order'),
  maxMark: integer('max_mark').notNull(),
  maxBonus: integer('max_bonus'),
  penalty: integer('penalty'),

  createdAt: timestamp('created_at')
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp('updated_at')
    .notNull()
    .default(sql`now()`),
})

// Schema for laboratoryWorks - used to validate API requests
const baseSchema = createSelectSchema(laboratoryWorks).omit(timestamps)

export const insertLaboratoryWorkSchema =
  createInsertSchema(laboratoryWorks).omit(timestamps)
export const insertLaboratoryWorkParams = baseSchema
  .extend({
    courseId: z.coerce.string().min(1),
    order: z.coerce.number(),
    maxMark: z.coerce.number(),
    maxBonus: z.coerce.number(),
    penalty: z.coerce.number(),
  })
  .omit({
    id: true,
  })

export const updateLaboratoryWorkSchema = baseSchema
export const updateLaboratoryWorkParams = baseSchema.extend({
  courseId: z.coerce.string().min(1),
  order: z.coerce.number(),
  maxMark: z.coerce.number(),
  maxBonus: z.coerce.number(),
  penalty: z.coerce.number(),
})
export const laboratoryWorkIdSchema = baseSchema.pick({ id: true })

// Types for laboratoryWorks - used to type API request params and within Components
export type LaboratoryWork = typeof laboratoryWorks.$inferSelect
export type NewLaboratoryWork = z.infer<typeof insertLaboratoryWorkSchema>
export type NewLaboratoryWorkParams = z.infer<typeof insertLaboratoryWorkParams>
export type UpdateLaboratoryWorkParams = z.infer<
  typeof updateLaboratoryWorkParams
>
export type LaboratoryWorkId = z.infer<typeof laboratoryWorkIdSchema>['id']

// this type infers the return from getLaboratoryWorks() - meaning it will include any joins
export type CompleteLaboratoryWork = Awaited<
  ReturnType<typeof getLaboratoryWorks>
>['laboratoryWorks'][number]

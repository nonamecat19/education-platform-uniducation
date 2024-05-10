import { sql } from 'drizzle-orm'
import { varchar, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { units } from './units'
import { type getTextSection } from '@/lib/api/textSection/queries'

import { nanoid, timestamps } from '@/lib/utils'

export const textSection = pgTable('text_section', {
  id: varchar('id', { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  unitId: varchar('unit_id', { length: 256 })
    .references(() => units.id)
    .notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 256 }),

  createdAt: timestamp('created_at')
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp('updated_at')
    .notNull()
    .default(sql`now()`),
})

// Schema for textSection - used to validate API requests
const baseSchema = createSelectSchema(textSection).omit(timestamps)

export const insertTextSectionSchema =
  createInsertSchema(textSection).omit(timestamps)
export const insertTextSectionParams = baseSchema
  .extend({
    unitId: z.coerce.string().min(1),
  })
  .omit({
    id: true,
  })

export const updateTextSectionSchema = baseSchema
export const updateTextSectionParams = baseSchema.extend({
  unitId: z.coerce.string().min(1),
})
export const textSectionIdSchema = baseSchema.pick({ id: true })

// Types for textSection - used to type API request params and within Components
export type TextSection = typeof textSection.$inferSelect
export type NewTextSection = z.infer<typeof insertTextSectionSchema>
export type NewTextSectionParams = z.infer<typeof insertTextSectionParams>
export type UpdateTextSectionParams = z.infer<typeof updateTextSectionParams>
export type TextSectionId = z.infer<typeof textSectionIdSchema>['id']

// this type infers the return from getTextSection() - meaning it will include any joins
export type CompleteTextSection = Awaited<
  ReturnType<typeof getTextSection>
>['textSection'][number]

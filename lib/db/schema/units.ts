import { sql } from "drizzle-orm";
import { varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { courses } from "./courses"
import { type getUnits } from "@/lib/api/units/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const units = pgTable('units', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  courseId: varchar("course_id", { length: 256 }).references(() => courses.id).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

}, (units) => {
  return {
    nameIndex: uniqueIndex('name_idx').on(units.name),
  }
});


// Schema for units - used to validate API requests
const baseSchema = createSelectSchema(units).omit(timestamps)

export const insertUnitSchema = createInsertSchema(units).omit(timestamps);
export const insertUnitParams = baseSchema.extend({
  courseId: z.coerce.string().min(1)
}).omit({ 
  id: true
});

export const updateUnitSchema = baseSchema;
export const updateUnitParams = baseSchema.extend({
  courseId: z.coerce.string().min(1)
})
export const unitIdSchema = baseSchema.pick({ id: true });

// Types for units - used to type API request params and within Components
export type Unit = typeof units.$inferSelect;
export type NewUnit = z.infer<typeof insertUnitSchema>;
export type NewUnitParams = z.infer<typeof insertUnitParams>;
export type UpdateUnitParams = z.infer<typeof updateUnitParams>;
export type UnitId = z.infer<typeof unitIdSchema>["id"];
    
// this type infers the return from getUnits() - meaning it will include any joins
export type CompleteUnit = Awaited<ReturnType<typeof getUnits>>["units"][number];


import { sql } from "drizzle-orm";
import { varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getSubjects } from "@/lib/api/subjects/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const subjects = pgTable('subjects', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for subjects - used to validate API requests
const baseSchema = createSelectSchema(subjects).omit(timestamps)

export const insertSubjectSchema = createInsertSchema(subjects).omit(timestamps);
export const insertSubjectParams = baseSchema.extend({}).omit({ 
  id: true
});

export const updateSubjectSchema = baseSchema;
export const updateSubjectParams = baseSchema.extend({})
export const subjectIdSchema = baseSchema.pick({ id: true });

// Types for subjects - used to type API request params and within Components
export type Subject = typeof subjects.$inferSelect;
export type NewSubject = z.infer<typeof insertSubjectSchema>;
export type NewSubjectParams = z.infer<typeof insertSubjectParams>;
export type UpdateSubjectParams = z.infer<typeof updateSubjectParams>;
export type SubjectId = z.infer<typeof subjectIdSchema>["id"];
    
// this type infers the return from getSubjects() - meaning it will include any joins
export type CompleteSubject = Awaited<ReturnType<typeof getSubjects>>["subjects"][number];


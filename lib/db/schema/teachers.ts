import { sql } from "drizzle-orm";
import { varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getTeachers } from "@/lib/api/teachers/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const teachers = pgTable('teachers', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  surname: varchar("surname", { length: 256 }).notNull(),
  patronomyc: varchar("patronomyc", { length: 256 }),
  email: varchar("email", { length: 256 }).notNull(),
  profession: varchar("profession", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

}, (teachers) => {
  return {
    emailIndex: uniqueIndex('email_idx').on(teachers.email),
  }
});


// Schema for teachers - used to validate API requests
const baseSchema = createSelectSchema(teachers).omit(timestamps)

export const insertTeacherSchema = createInsertSchema(teachers).omit(timestamps);
export const insertTeacherParams = baseSchema.extend({}).omit({ 
  id: true
});

export const updateTeacherSchema = baseSchema;
export const updateTeacherParams = baseSchema.extend({})
export const teacherIdSchema = baseSchema.pick({ id: true });

// Types for teachers - used to type API request params and within Components
export type Teacher = typeof teachers.$inferSelect;
export type NewTeacher = z.infer<typeof insertTeacherSchema>;
export type NewTeacherParams = z.infer<typeof insertTeacherParams>;
export type UpdateTeacherParams = z.infer<typeof updateTeacherParams>;
export type TeacherId = z.infer<typeof teacherIdSchema>["id"];
    
// this type infers the return from getTeachers() - meaning it will include any joins
export type CompleteTeacher = Awaited<ReturnType<typeof getTeachers>>["teachers"][number];


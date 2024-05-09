import { sql } from "drizzle-orm";
import { varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { groupSubjects } from "./groupSubjects"
import { teachers } from "./teachers"
import { type getCourses } from "@/lib/api/courses/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const courses = pgTable('courses', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  groupSubjectId: varchar("group_subject_id", { length: 256 }).references(() => groupSubjects.id).notNull(),
  teacherId: varchar("teacher_id", { length: 256 }).references(() => teachers.id).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for courses - used to validate API requests
const baseSchema = createSelectSchema(courses).omit(timestamps)

export const insertCourseSchema = createInsertSchema(courses).omit(timestamps);
export const insertCourseParams = baseSchema.extend({
  groupSubjectId: z.coerce.string().min(1),
  teacherId: z.coerce.string().min(1)
}).omit({ 
  id: true
});

export const updateCourseSchema = baseSchema;
export const updateCourseParams = baseSchema.extend({
  groupSubjectId: z.coerce.string().min(1),
  teacherId: z.coerce.string().min(1)
})
export const courseIdSchema = baseSchema.pick({ id: true });

// Types for courses - used to type API request params and within Components
export type Course = typeof courses.$inferSelect;
export type NewCourse = z.infer<typeof insertCourseSchema>;
export type NewCourseParams = z.infer<typeof insertCourseParams>;
export type UpdateCourseParams = z.infer<typeof updateCourseParams>;
export type CourseId = z.infer<typeof courseIdSchema>["id"];
    
// this type infers the return from getCourses() - meaning it will include any joins
export type CompleteCourse = Awaited<ReturnType<typeof getCourses>>["courses"][number];


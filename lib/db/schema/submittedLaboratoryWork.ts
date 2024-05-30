import { sql } from "drizzle-orm";
import { varchar, integer, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { students } from "./students"
import { laboratoryWorks } from "./laboratoryWorks"
import { type getSubmittedLaboratoryWorks } from "@/lib/api/submittedLaboratoryWork/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const submittedLaboratoryWork = pgTable('submitted_laboratory_work', {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  studentId: varchar("student_id", { length: 256 })
    .references(() => students.id, { onDelete: "cascade" })
    .notNull(),
  laboratoryWorkId: varchar("laboratory_work_id", { length: 256 })
    .references(() => laboratoryWorks.id, { onDelete: "cascade" })
    .notNull(),
  status: varchar("status", { length: 256 }).notNull(),
  mark: integer("mark"),
  studentComment: text("student_comment"),
  teacherComment: text("teacher_comment"),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for submittedLaboratoryWork - used to validate API requests
const baseSchema = createSelectSchema(submittedLaboratoryWork).omit(timestamps)

export const insertSubmittedLaboratoryWorkSchema = createInsertSchema(submittedLaboratoryWork).omit(timestamps);
export const insertSubmittedLaboratoryWorkParams = baseSchema.extend({
  studentId: z.coerce.string().min(1),
  laboratoryWorkId: z.coerce.string().min(1),
  mark: z.coerce.number()
}).omit({
  id: true
});

export const updateSubmittedLaboratoryWorkSchema = baseSchema;
export const updateSubmittedLaboratoryWorkParams = baseSchema.extend({
  studentId: z.coerce.string().min(1),
  laboratoryWorkId: z.coerce.string().min(1),
  mark: z.coerce.number()
})
export const submittedLaboratoryWorkIdSchema = baseSchema.pick({ id: true });

// Types for submittedLaboratoryWork - used to type API request params and within Components
export type SubmittedLaboratoryWork = typeof submittedLaboratoryWork.$inferSelect;
export type NewSubmittedLaboratoryWork = z.infer<typeof insertSubmittedLaboratoryWorkSchema>;
export type NewSubmittedLaboratoryWorkParams = z.infer<typeof insertSubmittedLaboratoryWorkParams>;
export type UpdateSubmittedLaboratoryWorkParams = z.infer<typeof updateSubmittedLaboratoryWorkParams>;
export type SubmittedLaboratoryWorkId = z.infer<typeof submittedLaboratoryWorkIdSchema>["id"];

// this type infers the return from getSubmittedLaboratoryWork() - meaning it will include any joins
export type CompleteSubmittedLaboratoryWork = Awaited<ReturnType<typeof getSubmittedLaboratoryWorks>>["submittedLaboratoryWork"][number];


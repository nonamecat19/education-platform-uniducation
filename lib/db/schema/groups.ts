import { sql } from "drizzle-orm";
import {varchar, timestamp, pgTable, uniqueIndex} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { teachers } from "./teachers"
import { type getGroups } from "@/lib/api/groups/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const groups = pgTable('groups', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  course: varchar("course", { length: 256 }).notNull(),
  teacherId: varchar("teacher_id", { length: 256 }).references(() => teachers.id).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

}, (groups) => {
  return {
    nameIndex: uniqueIndex('name_idx').on(groups.name),
  }
});


// Schema for groups - used to validate API requests
const baseSchema = createSelectSchema(groups).omit(timestamps)

export const insertGroupSchema = createInsertSchema(groups).omit(timestamps);
export const insertGroupParams = baseSchema.extend({
  teacherId: z.coerce.string().min(1)
}).omit({
  id: true
});

export const updateGroupSchema = baseSchema;
export const updateGroupParams = baseSchema.extend({
  teacherId: z.coerce.string().min(1)
})
export const groupIdSchema = baseSchema.pick({ id: true });

// Types for groups - used to type API request params and within Components
export type Group = typeof groups.$inferSelect;
export type NewGroup = z.infer<typeof insertGroupSchema>;
export type NewGroupParams = z.infer<typeof insertGroupParams>;
export type UpdateGroupParams = z.infer<typeof updateGroupParams>;
export type GroupId = z.infer<typeof groupIdSchema>["id"];

// this type infers the return from getGroups() - meaning it will include any joins
export type CompleteGroup = Awaited<ReturnType<typeof getGroups>>["groups"][number];


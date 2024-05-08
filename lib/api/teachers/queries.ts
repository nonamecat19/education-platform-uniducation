import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type TeacherId, teacherIdSchema, teachers } from "@/lib/db/schema/teachers";

export const getTeachers = async () => {
  const rows = await db.select().from(teachers);
  const t = rows
  return { teachers: t };
};

export const getTeacherById = async (id: TeacherId) => {
  const { id: teacherId } = teacherIdSchema.parse({ id });
  const [row] = await db.select().from(teachers).where(eq(teachers.id, teacherId));
  if (row === undefined) return {};
  const t = row;
  return { teacher: t };
};



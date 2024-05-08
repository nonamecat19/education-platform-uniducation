import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type StudentId, studentIdSchema, students } from "@/lib/db/schema/students";
import { groups } from "@/lib/db/schema/groups";

export const getStudents = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ student: students, group: groups }).from(students).leftJoin(groups, eq(students.groupId, groups.id)).where(eq(students.userId, session?.user.id!));
  const s = rows .map((r) => ({ ...r.student, group: r.group})); 
  return { students: s };
};

export const getStudentById = async (id: StudentId) => {
  const { session } = await getUserAuth();
  const { id: studentId } = studentIdSchema.parse({ id });
  const [row] = await db.select({ student: students, group: groups }).from(students).where(and(eq(students.id, studentId), eq(students.userId, session?.user.id!))).leftJoin(groups, eq(students.groupId, groups.id));
  if (row === undefined) return {};
  const s =  { ...row.student, group: row.group } ;
  return { student: s };
};



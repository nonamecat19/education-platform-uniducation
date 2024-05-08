import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type SubjectId, subjectIdSchema, subjects } from "@/lib/db/schema/subjects";

export const getSubjects = async () => {
  const rows = await db.select().from(subjects);
  const s = rows
  return { subjects: s };
};

export const getSubjectById = async (id: SubjectId) => {
  const { id: subjectId } = subjectIdSchema.parse({ id });
  const [row] = await db.select().from(subjects).where(eq(subjects.id, subjectId));
  if (row === undefined) return {};
  const s = row;
  return { subject: s };
};



import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  TeacherId, 
  NewTeacherParams,
  UpdateTeacherParams, 
  updateTeacherSchema,
  insertTeacherSchema, 
  teachers,
  teacherIdSchema 
} from "@/lib/db/schema/teachers";

export const createTeacher = async (teacher: NewTeacherParams) => {
  const newTeacher = insertTeacherSchema.parse(teacher);
  try {
    const [t] =  await db.insert(teachers).values(newTeacher).returning();
    return { teacher: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateTeacher = async (id: TeacherId, teacher: UpdateTeacherParams) => {
  const { id: teacherId } = teacherIdSchema.parse({ id });
  const newTeacher = updateTeacherSchema.parse(teacher);
  try {
    const [t] =  await db
     .update(teachers)
     .set({...newTeacher, updatedAt: new Date() })
     .where(eq(teachers.id, teacherId!))
     .returning();
    return { teacher: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteTeacher = async (id: TeacherId) => {
  const { id: teacherId } = teacherIdSchema.parse({ id });
  try {
    const [t] =  await db.delete(teachers).where(eq(teachers.id, teacherId!))
    .returning();
    return { teacher: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


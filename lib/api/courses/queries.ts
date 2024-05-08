import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type CourseId, courseIdSchema, courses } from "@/lib/db/schema/courses";
import { groupSubjects } from "@/lib/db/schema/groupSubjects";
import { teachers } from "@/lib/db/schema/teachers";

export const getCourses = async () => {
  const rows = await db.select({ course: courses, groupSubject: groupSubjects, teacher: teachers }).from(courses).leftJoin(groupSubjects, eq(courses.groupSubjectId, groupSubjects.id)).leftJoin(teachers, eq(courses.teacherId, teachers.id));
  const c = rows .map((r) => ({ ...r.course, groupSubject: r.groupSubject, teacher: r.teacher})); 
  return { courses: c };
};

export const getCourseById = async (id: CourseId) => {
  const { id: courseId } = courseIdSchema.parse({ id });
  const [row] = await db.select({ course: courses, groupSubject: groupSubjects, teacher: teachers }).from(courses).where(eq(courses.id, courseId)).leftJoin(groupSubjects, eq(courses.groupSubjectId, groupSubjects.id)).leftJoin(teachers, eq(courses.teacherId, teachers.id));
  if (row === undefined) return {};
  const c =  { ...row.course, groupSubject: row.groupSubject, teacher: row.teacher } ;
  return { course: c };
};



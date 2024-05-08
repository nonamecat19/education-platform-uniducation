import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  CourseId, 
  NewCourseParams,
  UpdateCourseParams, 
  updateCourseSchema,
  insertCourseSchema, 
  courses,
  courseIdSchema 
} from "@/lib/db/schema/courses";

export const createCourse = async (course: NewCourseParams) => {
  const newCourse = insertCourseSchema.parse(course);
  try {
    const [c] =  await db.insert(courses).values(newCourse).returning();
    return { course: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCourse = async (id: CourseId, course: UpdateCourseParams) => {
  const { id: courseId } = courseIdSchema.parse({ id });
  const newCourse = updateCourseSchema.parse(course);
  try {
    const [c] =  await db
     .update(courses)
     .set({...newCourse, updatedAt: new Date() })
     .where(eq(courses.id, courseId!))
     .returning();
    return { course: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCourse = async (id: CourseId) => {
  const { id: courseId } = courseIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(courses).where(eq(courses.id, courseId!))
    .returning();
    return { course: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import {
  type CourseId,
  courseIdSchema,
  courses,
  groupSubjects,
  subjects,
  teachers,
} from '@/lib/db/schema'
import { Course } from '@/lib/types'

export const getCourses = async () => {
  const rows = await db
    .select({
      course: courses,
      groupSubject: groupSubjects,
      teacher: teachers,
      subject: subjects,
    })
    .from(courses)
    .leftJoin(groupSubjects, eq(courses.groupSubjectId, groupSubjects.id))
    .leftJoin(teachers, eq(courses.teacherId, teachers.id))
    .leftJoin(subjects, eq(groupSubjects.subjectId, subjects.id))
  const c = rows.map((r) => ({
    ...r.course,
    groupSubject: {
      ...r.groupSubject,
      subject: r.subject,
    },
    teacher: r.teacher,
  }))
  return { courses: c } as { courses: Course[] }
}

export const getCourseById = async (id: CourseId) => {
  const { id: courseId } = courseIdSchema.parse({ id })
  const [row] = await db
    .select({ course: courses, groupSubject: groupSubjects, teacher: teachers })
    .from(courses)
    .where(eq(courses.id, courseId))
    .leftJoin(groupSubjects, eq(courses.groupSubjectId, groupSubjects.id))
    .leftJoin(teachers, eq(courses.teacherId, teachers.id))
  if (row === undefined) return {}
  const c = {
    ...row.course,
    groupSubject: row.groupSubject,
    teacher: row.teacher,
  }
  return { course: c }
}

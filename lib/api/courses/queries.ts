import { db } from '@/lib/db'
import { eq, getTableColumns } from 'drizzle-orm'
import {
  type CourseId,
  courseIdSchema,
  courses,
  GroupSubject,
  groupSubjects,
  subjects,
  Teacher,
  teachers,
  textSection,
  units,
} from '@/lib/db/schema'
import { Course, UnitWithTextSections } from '@/lib/types'

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
    .select({
      course: courses,
      groupSubject: groupSubjects,
      teacher: teachers,
    })
    .from(courses)
    .where(eq(courses.id, courseId))
    .leftJoin(groupSubjects, eq(courses.groupSubjectId, groupSubjects.id))
    .leftJoin(teachers, eq(courses.teacherId, teachers.id))

  if (row === undefined) {
    return { course: null }
  }

  const u = await db.select().from(units).where(eq(units.courseId, courseId))

  for (const unit of u) {
    // @ts-ignore
    unit['textSections'] = await db
      .select()
      .from(textSection)
      .where(eq(textSection.unitId, unit.id))
  }

  return {
    course: row.course as Course,
    teacher: row.teacher as Teacher,
    groupSubject: row.groupSubject as GroupSubject,
    units: u as UnitWithTextSections[],
  }
}

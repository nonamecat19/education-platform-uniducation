import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import {
  type CourseId,
  courseIdSchema,
  courses, groups,
  groupSubjects,
  laboratoryWorks,
  subjects,
  teachers,
  textSection,
  units,
} from '@/lib/db/schema'
import { Course, GroupSubject, Subject, Teacher, UnitWithTextSections } from '@/lib/types'
import { getCurrentStudent } from '@/lib/api/students/queries'

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
  return { courses: c as Course[] }
}

export const getStudentCourses = async () => {
  const { student } = await getCurrentStudent()
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
    .leftJoin(groups, eq(groupSubjects.groupId, groups.id))
    .where(eq(groups.id, student?.groupId!))

  const c = rows.map((r) => ({
    ...r.course,
    groupSubject: {
      ...r.groupSubject,
      subject: r.subject,
    },
    teacher: r.teacher,
  }))
  return { courses: c as Course[] }
}

export const getCourseById = async (id: CourseId) => {
  const { id: courseId } = courseIdSchema.parse({ id })
  const [row] = await db
    .select({
      course: courses,
      groupSubject: groupSubjects,
      teacher: teachers,
      subject: subjects,
    })
    .from(courses)
    .where(eq(courses.id, courseId))
    .leftJoin(groupSubjects, eq(courses.groupSubjectId, groupSubjects.id))
    .leftJoin(teachers, eq(courses.teacherId, teachers.id))
    .leftJoin(subjects, eq(groupSubjects.subjectId, subjects.id))


  if (row === undefined) {
    return {
      course: undefined,
      teacher: undefined,
      groupSubject: undefined,
      subject: undefined,
      units: [],
    }
  }

  const u = await db.select().from(units).where(eq(units.courseId, courseId))

  for (const unit of u) {
    // @ts-ignore
    unit['textSections'] = await db
      .select()
      .from(textSection)
      .where(eq(textSection.unitId, unit.id))
    // @ts-ignore
    unit['laboratoryWorks'] = await db
      .select()
      .from(laboratoryWorks)
      .where(eq(laboratoryWorks.unitId, unit.id))
  }

  return {
    course: row.course as Course,
    teacher: row.teacher as Teacher,
    groupSubject: row.groupSubject as GroupSubject,
    subject: row.subject as Subject,
    units: u as UnitWithTextSections[],
  }
}

import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { courses, groups, groupSubjects, subjects, type TeacherId, teacherIdSchema, teachers } from '@/lib/db/schema'
import { getUserAuth } from '@/lib/auth/utils'
import { Course } from '@/lib/types'

export const getTeachers = async () => {
  const rows = await db.select().from(teachers)
  return { teachers: rows }
}

export const getTeacherById = async (id: TeacherId) => {
  const { id: teacherId } = teacherIdSchema.parse({ id })
  const [row] = await db
    .select()
    .from(teachers)
    .where(eq(teachers.id, teacherId))
  return { teacher: row }
}

export const getCurrentTeacher = async () => {
  const { session } = await getUserAuth()
  const [row] = await db
    .select()
    .from(teachers)
    .where(eq(teachers.userId, session?.user?.id!))
  return { teacher: row }
}

export const getTeacherGroups = async () => {
  const { teacher } = await getCurrentTeacher()
  if (!teacher) {
    return { groups: [] }
  }
  const g = await db
    .select()
    .from(groups)
    .where(eq(groups.teacherId, teacher.id))
  return { groups: g }
}

export const getTeacherCourses = async (): Promise<{ courses: Course[] }> => {
  const { teacher } = await getCurrentTeacher()
  if (!teacher) {
    return { courses: [] }
  }
  const rows = await db
    .select({
      course: courses,
      groupSubject: groupSubjects,
      teacher: teachers,
      subject: subjects,
    })
    .from(courses)
    .where(eq(courses.teacherId, teacher.id))
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
  })) as Course[]
  return { courses: c }
}

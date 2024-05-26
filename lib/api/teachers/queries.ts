import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { courses, groups, type TeacherId, teacherIdSchema, teachers } from '@/lib/db/schema'
import { getUserAuth } from '@/lib/auth/utils'

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
  const g = await db
    .select()
    .from(groups)
    .where(eq(groups.teacherId, teacher.id))
  return { groups: g }
}

export const getTeacherCourses = async () => {
  const { teacher } = await getCurrentTeacher()
  const c = await db
    .select()
    .from(courses)
    .where(eq(courses.teacherId, teacher.id))
  return { courses: c }
}

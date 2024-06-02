import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { getUserAuth } from '@/lib/auth/utils'
import { GroupId, groupIdSchema, groups, type StudentId, studentIdSchema, students } from '@/lib/db/schema'

export const getStudents = async () => {
  const rows = await db
    .select({ student: students, group: groups })
    .from(students)
    .leftJoin(groups, eq(students.groupId, groups.id))
  const s = rows.map((r) => ({ ...r.student, group: r.group }))
  return { students: s }
}

export const getStudentById = async (id: StudentId) => {
  const { id: studentId } = studentIdSchema.parse({ id })
  const [row] = await db
    .select({ student: students, group: groups })
    .from(students)
    .where(eq(students.id, studentId))
    .leftJoin(groups, eq(students.groupId, groups.id))
  if (row === undefined) return {}
  const s = { ...row.student, group: row.group }
  return { student: s }
}

export const getCurrentStudent = async () => {
  const { session } = await getUserAuth()
  const [row] = await db
    .select()
    .from(students)
    .where(eq(students.userId, session?.user.id!),)
  return { student: row }
}

export const getStudentsByGroupId = async (id: GroupId) => {
  const { id: groupId } = groupIdSchema.parse({ id })
  const rows = await db
    .select()
    .from(students)
    .where(eq(students.groupId, groupId))
  return { students: rows }
}

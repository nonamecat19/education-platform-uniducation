import { db } from '@/lib/db'
import { and, eq } from 'drizzle-orm'
import {
  StudentId,
  NewStudentParams,
  UpdateStudentParams,
  updateStudentSchema,
  insertStudentSchema,
  students,
  studentIdSchema,
} from '@/lib/db/schema'
import { getUserAuth } from '@/lib/auth/utils'

export const createStudent = async (student: NewStudentParams) => {
  const { session } = await getUserAuth()
  const newStudent = insertStudentSchema.parse({
    ...student,
    userId: session?.user.id!,
  })
  try {
    const [s] = await db.insert(students).values(newStudent).returning()
    return { student: s }
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again'
    console.error(message)
    throw { error: message }
  }
}

export const updateStudent = async (
  id: StudentId,
  student: UpdateStudentParams,
) => {
  const { session } = await getUserAuth()
  const { id: studentId } = studentIdSchema.parse({ id })
  const newStudent = updateStudentSchema.parse({
    ...student,
    userId: session?.user.id!,
  })
  try {
    const [s] = await db
      .update(students)
      .set({ ...newStudent, updatedAt: new Date() })
      .where(eq(students.id, studentId!))
      .returning()
    console.log({s})
    return { student: s }
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again'
    console.error(message)
    throw { error: message }
  }
}

export const deleteStudent = async (id: StudentId) => {
  const { session } = await getUserAuth()
  const { id: studentId } = studentIdSchema.parse({ id })
  try {
    const [s] = await db
      .delete(students)
      .where(
        and(
          eq(students.id, studentId!),
          eq(students.userId, session?.user.id!),
        ),
      )
      .returning()
    return { student: s }
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again'
    console.error(message)
    throw { error: message }
  }
}

import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import {
  StudentId,
  NewStudentParams,
  UpdateStudentParams,
  updateStudentSchema,
  insertStudentSchema,
  students,
  studentIdSchema, updateStudentParams,
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
  const { id: studentId } = studentIdSchema.parse({ id })
  const newStudent = updateStudentParams.parse(student)
  try {
    const [s] = await db
      .update(students)
      .set({ ...newStudent, updatedAt: new Date() })
      .where(eq(students.id, studentId!))
      .returning()
    return { student: s }
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again'
    console.error(message)
    throw { error: message }
  }
}

export const deleteStudent = async (id: StudentId) => {
  const { id: studentId } = studentIdSchema.parse({ id })
  try {
    const [s] = await db
      .delete(students)
      .where(eq(students.id, studentId!))
      .returning()
    return { student: s }
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again'
    console.error(message)
    throw { error: message }
  }
}

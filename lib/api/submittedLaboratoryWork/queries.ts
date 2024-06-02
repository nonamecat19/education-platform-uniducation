import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import {
  LaboratoryWorkId,
  laboratoryWorkIdSchema,
  laboratoryWorks,
  students,
  submittedLaboratoryWork,
  type SubmittedLaboratoryWorkId,
  submittedLaboratoryWorkIdSchema, users,
} from '@/lib/db/schema'

export const getSubmittedLaboratoryWorks = async () => {
  const rows = await db
    .select({
      submittedLaboratoryWork: submittedLaboratoryWork,
      student: students,
      laboratoryWork: laboratoryWorks,
    })
    .from(submittedLaboratoryWork)
    .leftJoin(students, eq(submittedLaboratoryWork.studentId, students.id))
    .leftJoin(laboratoryWorks, eq(submittedLaboratoryWork.laboratoryWorkId, laboratoryWorks.id))
  const s = rows.map((r) => ({ ...r.submittedLaboratoryWork, student: r.student, laboratoryWork: r.laboratoryWork }))
  return { submittedLaboratoryWork: s }
}

export const getSubmittedLaboratoryWorkById = async (id: SubmittedLaboratoryWorkId) => {
  const { id: submittedLaboratoryWorkId } = submittedLaboratoryWorkIdSchema.parse({ id })
  const [row] = await db
    .select({
      submittedLaboratoryWork: submittedLaboratoryWork,
      student: students,
      laboratoryWork: laboratoryWorks,
    })
    .from(submittedLaboratoryWork)
    .where(eq(submittedLaboratoryWork.id, submittedLaboratoryWorkId))
    .leftJoin(students, eq(submittedLaboratoryWork.studentId, students.id))
    .leftJoin(laboratoryWorks, eq(submittedLaboratoryWork.laboratoryWorkId, laboratoryWorks.id))
  return {
    submittedLaboratoryWork: row.submittedLaboratoryWork,
    student: row.student,
    laboratoryWork: row.laboratoryWork,
  }
}


export const getSubmittedLaboratoryWorksByLaboratoryWorkId = async (id: LaboratoryWorkId) => {
  const { id: laboratoryWorkId } = laboratoryWorkIdSchema.parse({ id })
  return db
    .select({
      submittedLaboratoryWork: submittedLaboratoryWork,
      student: students,
      user: users
    })
    .from(submittedLaboratoryWork)
    .where(eq(submittedLaboratoryWork.laboratoryWorkId, laboratoryWorkId))
    .leftJoin(students, eq(submittedLaboratoryWork.studentId, students.id))
    .leftJoin(users, eq(users.id, students.userId))
}

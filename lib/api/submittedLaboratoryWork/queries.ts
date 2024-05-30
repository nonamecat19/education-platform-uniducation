import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import {
  laboratoryWorks,
  students,
  submittedLaboratoryWork,
  type SubmittedLaboratoryWorkId,
  submittedLaboratoryWorkIdSchema,
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
  if (row === undefined) return {}
  const s = { ...row.submittedLaboratoryWork, student: row.student, laboratoryWork: row.laboratoryWork }
  return { submittedLaboratoryWork: s }
}



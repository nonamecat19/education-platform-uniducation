import { db } from '@/lib/db/index'
import { eq } from 'drizzle-orm'
import {
  type LaboratoryWorkId,
  laboratoryWorkIdSchema,
  laboratoryWorks,
} from '@/lib/db/schema/laboratoryWorks'
import { courses } from '@/lib/db/schema/courses'

export const getLaboratoryWorks = async () => {
  const rows = await db
    .select({ laboratoryWork: laboratoryWorks, course: courses })
    .from(laboratoryWorks)
    .leftJoin(courses, eq(laboratoryWorks.courseId, courses.id))
  const l = rows.map((r) => ({ ...r.laboratoryWork, course: r.course }))
  return { laboratoryWorks: l }
}

export const getLaboratoryWorkById = async (id: LaboratoryWorkId) => {
  const { id: laboratoryWorkId } = laboratoryWorkIdSchema.parse({ id })
  const [row] = await db
    .select({ laboratoryWork: laboratoryWorks, course: courses })
    .from(laboratoryWorks)
    .where(eq(laboratoryWorks.id, laboratoryWorkId))
    .leftJoin(courses, eq(laboratoryWorks.courseId, courses.id))
  if (row === undefined) return {}
  const l = { ...row.laboratoryWork, course: row.course }
  return { laboratoryWork: l }
}

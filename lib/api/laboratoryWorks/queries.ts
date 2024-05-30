import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import {
  type LaboratoryWorkId,
  laboratoryWorkIdSchema,
  laboratoryWorks,
} from '@/lib/db/schema'

export const getLaboratoryWorks = async () => {
  const rows = await db
    .select({
      laboratoryWork: laboratoryWorks,
    })
    .from(laboratoryWorks)
  return { laboratoryWorks: rows }
}

export const getLaboratoryWorkById = async (id: LaboratoryWorkId) => {
  const { id: laboratoryWorkId } = laboratoryWorkIdSchema.parse({ id })
  const [row] = await db
    .select({
      laboratoryWork: laboratoryWorks
    })
    .from(laboratoryWorks)
    .where(eq(laboratoryWorks.id, laboratoryWorkId))
  return { laboratoryWork: row.laboratoryWork }
}

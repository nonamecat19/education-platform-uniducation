import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { courses, type UnitId, unitIdSchema, units } from '@/lib/db/schema'

export const getUnits = async () => {
  const rows = await db
    .select({ unit: units, course: courses })
    .from(units)
    .leftJoin(courses, eq(units.courseId, courses.id))
  const u = rows.map((r) => ({ ...r.unit, course: r.course }))
  return { units: u }
}

export const getUnitById = async (id: UnitId) => {
  const { id: unitId } = unitIdSchema.parse({ id })
  const [row] = await db
    .select({ unit: units, course: courses })
    .from(units)
    .where(eq(units.id, unitId))
    .leftJoin(courses, eq(units.courseId, courses.id))
  if (row === undefined) return {}
  const u = { ...row.unit, course: row.course }
  return { unit: u }
}

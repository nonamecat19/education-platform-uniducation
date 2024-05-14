import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import {
  type TextSectionId,
  textSectionIdSchema,
  textSection,
} from '@/lib/db/schema'
import { units } from '@/lib/db/schema'

export const getTextSections = async () => {
  const rows = await db
    .select({ textSection: textSection, unit: units })
    .from(textSection)
    .leftJoin(units, eq(textSection.unitId, units.id))
  const t = rows.map((r) => ({ ...r.textSection, unit: r.unit }))
  return { textSection: t }
}

export const getTextSectionById = async (id: TextSectionId) => {
  const { id: textSectionId } = textSectionIdSchema.parse({ id })
  const [row] = await db
    .select({ textSection: textSection, unit: units })
    .from(textSection)
    .where(eq(textSection.id, textSectionId))
    .leftJoin(units, eq(textSection.unitId, units.id))
  if (row === undefined) return {}
  const t = { ...row.textSection, unit: row.unit }
  return { textSection: t }
}

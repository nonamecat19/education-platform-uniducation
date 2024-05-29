import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { type GroupId, groupIdSchema, groups, students } from '@/lib/db/schema'
import { teachers } from '@/lib/db/schema'

export const getGroups = async () => {
  const rows = await db
    .select({ group: groups, teacher: teachers })
    .from(groups)
    .leftJoin(teachers, eq(groups.teacherId, teachers.id))
  const g = rows.map((r) => ({ ...r.group, teacher: r.teacher }))
  return { groups: g }
}

export const getGroupById = async (id: GroupId) => {
  const { id: groupId } = groupIdSchema.parse({ id })
  const [row] = await db
    .select({ group: groups, teacher: teachers })
    .from(groups)
    .where(eq(groups.id, groupId))
    .leftJoin(teachers, eq(groups.teacherId, teachers.id))
  return { group: row?.group, teacher: row?.teacher }
}

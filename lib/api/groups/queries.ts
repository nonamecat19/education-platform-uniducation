import { db } from '@/lib/db/index'
import { eq } from 'drizzle-orm'
import { type GroupId, groupIdSchema, groups } from '@/lib/db/schema/groups'
import { teachers } from '@/lib/db/schema/teachers'

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
  if (row === undefined) return {}
  const g = { ...row.group, teacher: row.teacher }
  return { group: g }
}

import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import {
  type GroupSubjectId,
  groupSubjectIdSchema,
  groupSubjects,
} from '@/lib/db/schema/groupSubjects'
import { subjects } from '@/lib/db/schema/subjects'
import { groups } from '@/lib/db/schema/groups'

export const getGroupSubjects = async () => {
  const rows = await db
    .select({ groupSubject: groupSubjects, subject: subjects, group: groups })
    .from(groupSubjects)
    .leftJoin(subjects, eq(groupSubjects.subjectId, subjects.id))
    .leftJoin(groups, eq(groupSubjects.groupId, groups.id))
  const g = rows.map((r) => ({
    ...r.groupSubject,
    subject: r.subject,
    group: r.group,
  }))
  return { groupSubjects: g }
}

export const getGroupSubjectById = async (id: GroupSubjectId) => {
  const { id: groupSubjectId } = groupSubjectIdSchema.parse({ id })
  const [row] = await db
    .select({ groupSubject: groupSubjects, subject: subjects, group: groups })
    .from(groupSubjects)
    .where(eq(groupSubjects.id, groupSubjectId))
    .leftJoin(subjects, eq(groupSubjects.subjectId, subjects.id))
    .leftJoin(groups, eq(groupSubjects.groupId, groups.id))
  if (row === undefined) return {}
  const g = { ...row.groupSubject, subject: row.subject, group: row.group }
  return { groupSubject: g }
}

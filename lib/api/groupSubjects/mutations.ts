import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import {
  GroupSubjectId,
  NewGroupSubjectParams,
  UpdateGroupSubjectParams,
  updateGroupSubjectSchema,
  insertGroupSubjectSchema,
  groupSubjects,
  groupSubjectIdSchema,
} from '@/lib/db/schema'

export const createGroupSubject = async (
  groupSubject: NewGroupSubjectParams,
) => {
  const newGroupSubject = insertGroupSubjectSchema.parse(groupSubject)
  try {
    const [g] = await db
      .insert(groupSubjects)
      .values(newGroupSubject)
      .returning()
    return { groupSubject: g }
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again'
    console.error(message)
    throw { error: message }
  }
}

export const updateGroupSubject = async (
  id: GroupSubjectId,
  groupSubject: UpdateGroupSubjectParams,
) => {
  const { id: groupSubjectId } = groupSubjectIdSchema.parse({ id })
  const newGroupSubject = updateGroupSubjectSchema.parse(groupSubject)
  try {
    const [g] = await db
      .update(groupSubjects)
      .set({ ...newGroupSubject, updatedAt: new Date() })
      .where(eq(groupSubjects.id, groupSubjectId!))
      .returning()
    return { groupSubject: g }
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again'
    console.error(message)
    throw { error: message }
  }
}

export const deleteGroupSubject = async (id: GroupSubjectId) => {
  const { id: groupSubjectId } = groupSubjectIdSchema.parse({ id })
  try {
    const [g] = await db
      .delete(groupSubjects)
      .where(eq(groupSubjects.id, groupSubjectId!))
      .returning()
    return { groupSubject: g }
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again'
    console.error(message)
    throw { error: message }
  }
}

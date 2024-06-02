import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import {
  TextSectionId,
  NewTextSectionParams,
  UpdateTextSectionParams,
  updateTextSectionSchema,
  insertTextSectionSchema,
  textSection,
  textSectionIdSchema,
} from '@/lib/db/schema'

export const createTextSection = async (value: NewTextSectionParams) => {
  const newTextSection = insertTextSectionSchema.parse(value)
  try {
    const [t] = await db
    // @ts-ignore
      .insert(textSection)
      .values(newTextSection)
      .returning()
    return { textSection: t }
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again'
    console.error(message)
    throw { error: message }
  }
}

export const updateTextSection = async (
  id: TextSectionId,
  value: UpdateTextSectionParams,
) => {
  const { id: textSectionId } = textSectionIdSchema.parse({ id })
  const newTextSection = updateTextSectionSchema.parse(value)
  try {
    const [t] = await db
      // @ts-ignore
      .update(textSection)
      .set({ ...newTextSection, updatedAt: new Date() })
      // @ts-ignore
      .where(eq(textSection.id, textSectionId!))
      .returning()
    return { textSection: t }
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again'
    console.error(message)
    throw { error: message }
  }
}

export const deleteTextSection = async (id: TextSectionId) => {
  const { id: textSectionId } = textSectionIdSchema.parse({ id })
  try {
    const [t] = await db
      .delete(textSection)
      .where(eq(textSection.id, textSectionId!))
      .returning()
    return { textSection: t }
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again'
    console.error(message)
    throw { error: message }
  }
}

import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { UserId, userIdSchema, users } from '@/lib/db/schema'
import { getUserAuth } from '@/lib/auth/utils'

export const getUsers = async () => {
  const rows = await db
    .select()
    .from(users)
  return { users: rows }
}

export const getUserById = async (id: UserId) => {
  const { id: userId } = userIdSchema.parse({ id })
  const [row] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
  return { user: row }
}

export const getUserByEmail = async (email: string) => {
  const [row] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
  return { user: row }
}

export const getCurrentUser = async () => {
  const { session } = await getUserAuth()
  const [row] = await db
    .select()
    .from(users)
    .where(eq(users.id, session?.user.id!))
  return { user: row }
}

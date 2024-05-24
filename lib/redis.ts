import { kv } from '@vercel/kv'
import { getUserByEmail } from '@/lib/api/users/queries'

const ROLE_PREFIX = 'role_'

export const getRoleByEmail = async (email: string) => {
  let role = await kv.get<string>(`role_${email}`)
  if (role) {
    return role
  }

  const currentUser = await getUserByEmail(email)
  role = currentUser?.user?.role

  if (role) {
    await kv.set<string>(`${ROLE_PREFIX}${email}`, role)
  }

  return role
}

export const setRoleByEmail = async (email: string, role: string) => {
  await kv.set<string>(`${ROLE_PREFIX}${email}`, role)
}

export const deleteRoleByEmail = async (email: string) => {
  await kv.del(`${ROLE_PREFIX}${email}`)
}

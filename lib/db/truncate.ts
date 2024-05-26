import { db } from '@/lib/db'
import {
  accounts,
  courses,
  groups,
  groupSubjects,
  laboratoryWorks,
  sessions,
  students,
  subjects,
  teachers,
  textSection,
  units,
  users,
  verificationTokens,
} from '@/lib/db/schema'
import { env } from '@/lib/env.mjs'

export const truncateDb = async () => {
  if (env.NODE_ENV !== 'development') {
    return
  }
  await db.delete(verificationTokens)
  await db.delete(students)
  await db.delete(textSection)
  await db.delete(units)
  await db.delete(laboratoryWorks)
  await db.delete(courses)
  await db.delete(groupSubjects)
  await db.delete(groups)
  await db.delete(teachers)
  await db.delete(subjects)
  await db.delete(sessions)
  await db.delete(users)
  await db.delete(accounts)

  console.log('truncate finished')
}

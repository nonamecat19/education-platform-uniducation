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
  submittedLaboratoryWork,
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
  await db.delete(submittedLaboratoryWork)
  await db.delete(students)
  await db.delete(laboratoryWorks)
  await db.delete(textSection)
  await db.delete(units)
  await db.delete(courses)
  await db.delete(groupSubjects)
  await db.delete(groups)
  await db.delete(teachers)
  await db.delete(users)
  await db.delete(subjects)
  await db.delete(accounts)
  await db.delete(verificationTokens)
  await db.delete(sessions)

  console.log('truncate finished')
}

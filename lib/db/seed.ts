import { db } from './index'
import {
  courses,
  groups,
  groupSubjects,
  laboratoryWorks,
  students,
  subjects,
  teachers,
  textSection,
  units,
  users,
} from '@/lib/db/schema'
import {
  generateCoursesRows,
  generateGroupRows,
  generateGroupSubjectsRows,
  generateLaboratoryWorksRows,
  generateStudentRows,
  generateSubjectsRows,
  generateTeacherRows,
  generateTextSectionRows,
  generateUnitsRows,
  generateUsersRows,
} from '@/lib/db/seeds'
import { truncateDb } from '@/lib/db/truncate'
import { env } from '@/lib/env.mjs'

export async function seed() {
  if (env.NODE_ENV !== 'development') {
    return
  }
  console.log('Seeding...')

  await truncateDb()

  await db
    .insert(subjects)
    .values(await generateSubjectsRows(10))
    .returning()

  await db
    .insert(users)
    .values(await generateUsersRows(100))
    .returning()

  await db // users
    .insert(teachers)
    .values(await generateTeacherRows(50))
    .returning()

  await db // teachers
    .insert(groups)
    .values(await generateGroupRows(10))
    .returning()

  await db // subjects, groups
    .insert(groupSubjects)
    .values(await generateGroupSubjectsRows(20))
    .returning()

  await db // groupSubjects, teachers
    .insert(courses)
    .values(await generateCoursesRows(100))
    .returning()

  await db // courses
    .insert(units)
    .values(await generateUnitsRows(100))
    .returning()

  await db // units
    .insert(textSection)
    .values(await generateTextSectionRows(500))
    .returning()

  await db // units
    .insert(laboratoryWorks)
    .values(await generateLaboratoryWorksRows(10))
    .returning()

  await db
    .insert(students)
    .values(await generateStudentRows(100))
    .returning()
}

seed()
  .then(() => {
    console.log('Success')
  })
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    console.log('Seeding done!')
  })

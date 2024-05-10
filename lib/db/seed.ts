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

export async function seed() {
  console.log('Seeding...')

  await db
    .insert(subjects)
    .values(await generateSubjectsRows(100))
    .returning()

  await db
    .insert(teachers)
    .values(await generateTeacherRows(100))
    .returning()

  await db // teachers
    .insert(groups)
    .values(await generateGroupRows(100))
    .returning()

  await db // subjects, groups
    .insert(groupSubjects)
    .values(await generateGroupSubjectsRows(100))
    .returning()

  await db // groupSubjects, teachers
    .insert(courses)
    .values(await generateCoursesRows(100))
    .returning()

  await db // courses
    .insert(laboratoryWorks)
    .values(await generateLaboratoryWorksRows(100))
    .returning()

  await db // courses
    .insert(units)
    .values(await generateUnitsRows(100))
    .returning()

  await db // units
    .insert(textSection)
    .values(await generateTextSectionRows(100))
    .returning()

  await db
    .insert(users)
    .values(await generateUsersRows(100))
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

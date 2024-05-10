import { db } from './index'
import { groups, teachers } from '@/lib/db/schema'
import { generateTeacherRows } from '@/lib/db/seeds/teachers'

export async function seed() {
  console.log('Seeding...')
  console.time('DB has been seeded!')

  await db.insert(teachers).values(generateTeacherRows(100)).returning()
  await db.insert(groups).values(generateTeacherRows(100)).returning()
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    console.log('Seeding done!')
    process.exit(0)
  })

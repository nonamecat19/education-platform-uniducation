import { faker } from '@faker-js/faker'
import { z } from 'zod'
import { insertGroupSchema } from '@/lib/db/schema/groups'
import { db } from '@/lib/db'
import { teachers, users } from '@/lib/db/schema'

type GroupsToBeInserted = z.infer<typeof insertGroupSchema>

export const generateGroupRows = (count: number): GroupsToBeInserted[] => {
  const teachersData = db.select().from(users)

  const rows: GroupsToBeInserted[] = []

  for (let i = 0; i < count; i++) {
    rows.push({
      name: faker.string.nanoid(),
      course: faker.string.numeric(),
      teacherId: 'test',
    })
  }

  return rows
}

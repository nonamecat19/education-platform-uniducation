import { faker } from '@faker-js/faker'
import { NewSubject } from '@/lib/db/schema'
import { getSeed } from '@/lib/db/seed-utils'

export const generateSubjectsRows = async (
  count: number,
): Promise<NewSubject[]> => {
  return getSeed(count, () => ({
    name: faker.string.nanoid(),
  }))
}

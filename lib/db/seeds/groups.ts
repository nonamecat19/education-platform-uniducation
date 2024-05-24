import { faker } from '@faker-js/faker'
import { NewGroup, teachers } from '@/lib/db/schema'
import { getEntityIds, getRandomElementId, getSeed } from '@/lib/db/seed-utils'

export const generateGroupRows = async (count: number): Promise<NewGroup[]> => {
  const teacherIds = await getEntityIds(teachers)

  return getSeed(count, () => ({
    name: faker.string.nanoid(),
    course: faker.string.numeric(),
    teacherId: getRandomElementId(teacherIds),
  }))
}

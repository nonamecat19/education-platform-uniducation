import { courses, NewUnit } from '@/lib/db/schema'
import { getEntityIds, getRandomElementId, getSeed } from '@/lib/db/seed-utils'
import { faker } from '@faker-js/faker'

export const generateUnitsRows = async (count: number): Promise<NewUnit[]> => {
  const coursesIds = await getEntityIds(courses)

  return getSeed(count, () => ({
    courseId: getRandomElementId(coursesIds),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
  }))
}

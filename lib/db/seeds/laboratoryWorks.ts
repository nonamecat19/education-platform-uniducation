import { courses, NewLaboratoryWork } from '@/lib/db/schema'
import { getEntityIds, getRandomElementId, getSeed } from '@/lib/db/seed-utils'
import { faker } from '@faker-js/faker'

export const generateLaboratoryWorksRows = async (
  count: number,
): Promise<NewLaboratoryWork[]> => {
  const coursesIds = await getEntityIds(courses)

  return getSeed(count, () => ({
    courseId: getRandomElementId(coursesIds),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    order: faker.number.int(100),
    maxMark: faker.number.int(100),
    maxBonus: faker.number.int(20),
    penalty: 0,
  }))
}

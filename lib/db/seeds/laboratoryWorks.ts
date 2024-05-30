import { NewLaboratoryWork, units } from '@/lib/db/schema'
import { getEntityIds, getRandomElementId, getSeed } from '@/lib/db/seed-utils'
import { faker } from '@faker-js/faker'

export const generateLaboratoryWorksRows = async (
  count: number,
): Promise<NewLaboratoryWork[]> => {
  const unitsIds = await getEntityIds(units)

  return getSeed(count, () => ({
    unitId: getRandomElementId(unitsIds),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    order: faker.number.int(100),
    maxMark: faker.number.int(100),
    maxBonus: faker.number.int(20),
    penalty: 0,
  }))
}

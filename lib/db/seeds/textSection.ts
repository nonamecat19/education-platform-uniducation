import { faker } from '@faker-js/faker'
import { getEntityIds, getRandomElementId, getSeed } from '@/lib/db/seed-utils'
import { NewTextSection, units } from '@/lib/db/schema'

export const generateTextSectionRows = async (
  count: number,
): Promise<NewTextSection[]> => {
  const unitsIds = await getEntityIds(units)

  return getSeed(count, () => ({
    unitId: getRandomElementId(unitsIds),
    name: faker.commerce.productDescription(),
  }))
}

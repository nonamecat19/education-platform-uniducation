import { faker } from '@faker-js/faker'
import { groups, NewStudent, users } from '@/lib/db/schema'
import { getEntityIds, getRandomElementId, getSeed } from '@/lib/db/seed-utils'

export const generateStudentRows = async (
  count: number,
): Promise<NewStudent[]> => {
  const groupIds = await getEntityIds(groups)
  const usersIds = await getEntityIds(users)

  return getSeed(count, () => ({
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    patronomic: faker.person.middleName(),
    groupId: getRandomElementId(groupIds),
    email: faker.internet.email(),
    stuentId: faker.number.int().toString(),
    password: faker.internet.password(),
    userId: getRandomElementId(usersIds),
  }))
}

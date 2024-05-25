import { faker } from '@faker-js/faker'
import { NewTeacher, users } from '@/lib/db/schema'
import { getEntityIds, getRandomElementId, getSeed } from '@/lib/db/seed-utils'

export const generateTeacherRows = async (
  count: number,
): Promise<NewTeacher[]> => {
  const usersIds = await getEntityIds(users)
  return getSeed(count, () => ({
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    patronymic: faker.person.middleName(),
    profession: faker.person.jobTitle(),
    userId: getRandomElementId(usersIds),
  }))
}

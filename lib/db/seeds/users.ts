import { getSeed } from '@/lib/db/seed-utils'
import { faker } from '@faker-js/faker'

export const generateUsersRows = async (count: number): Promise<any[]> => {
  return getSeed(count, () => ({
    id: faker.string.uuid(),
    name: faker.person.firstName,
    email: faker.internet.email,
    emailVerified: new Date(),
    image: faker.image.avatar(),
  }))
}

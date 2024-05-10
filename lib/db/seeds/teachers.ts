import { faker } from '@faker-js/faker'
import { NewTeacher } from '@/lib/db/schema/teachers'
import { getSeed } from '@/lib/db/seed-utils'

export const generateTeacherRows = async (count: number): Promise<NewTeacher[]> => {
  return getSeed(count, () => ({
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    patronomyc: faker.person.middleName(),
    email: faker.internet.email(),
    profession: faker.person.jobTitle(),
    password: faker.internet.password(),
  }))
}

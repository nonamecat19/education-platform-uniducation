import { faker } from '@faker-js/faker';
import {z} from "zod";
import {insertStudentSchema} from "@/lib/db/schema/students";

type UserToBeInserted = z.infer<typeof insertStudentSchema>;

export const generateUserRows = (count: number): UserToBeInserted[] => {
  const rows: UserToBeInserted[] = [];

  for (let i = 0; i < count; i++) {
    rows.push({
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      patronomic: faker.person.middleName(),
      groupId: 'test',
      email: faker.internet.email(),
      stuentId: faker.number.int().toString(),
      password: faker.internet.password(),
      userId: faker.number.int().toString(),
    });
  }

  return rows;
};

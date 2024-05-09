import {faker} from '@faker-js/faker';
import {z} from "zod";
import {insertTeacherSchema} from "@/lib/db/schema/teachers";

type TeachersToBeInserted = z.infer<typeof insertTeacherSchema>;

export const generateTeacherRows = (count: number): TeachersToBeInserted[] => {
  const rows: TeachersToBeInserted[] = [];

  for (let i = 0; i < count; i++) {
    rows.push({
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      patronomyc: faker.person.middleName(),
      email: faker.internet.email(),
      profession: faker.person.jobTitle(),
      password: faker.internet.password(),
    });
  }

  return rows;
};

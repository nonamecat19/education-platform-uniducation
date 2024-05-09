import { faker } from '@faker-js/faker';
import {z} from "zod";
import {insertStudentSchema} from "@/lib/db/schema/students";
import {insertGroupSchema} from "@/lib/db/schema/groups";

type GroupsToBeInserted = z.infer<typeof insertGroupSchema>;

export const generateUserRows = (count: number): GroupsToBeInserted[] => {
  const rows: GroupsToBeInserted[] = [];

  for (let i = 0; i < count; i++) {
    rows.push({
      name: faker.string.nanoid(),
      course: faker.string.numeric(),
      teacherId: 'test',
    });
  }

  return rows;
};

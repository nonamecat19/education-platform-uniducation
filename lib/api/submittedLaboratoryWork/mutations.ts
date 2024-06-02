import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import {
  SubmittedLaboratoryWorkId,
  NewSubmittedLaboratoryWorkParams,
  UpdateSubmittedLaboratoryWorkParams,
  updateSubmittedLaboratoryWorkSchema,
  insertSubmittedLaboratoryWorkSchema,
  submittedLaboratoryWork,
  submittedLaboratoryWorkIdSchema
} from "@/lib/db/schema";
import { SubmittedLaboratoryWorkStatus } from '@/lib/eunms'
import { getCurrentStudent } from '@/lib/api/students/queries'

export const submitLaboratoryWork = async (value: any) => {
  console.log({value})
  const {student} = await getCurrentStudent()
  const newSubmittedLaboratoryWork: NewSubmittedLaboratoryWorkParams = {
    laboratoryWorkId: value.laboratoryWorkId,
    mark: 0,
    status: SubmittedLaboratoryWorkStatus.Submitted,
    studentComment: value.studentComment,
    teacherComment: '',
    studentId: student.id
  }
  try {
    // @ts-ignore
    const [s] =  await db
      .insert(submittedLaboratoryWork)
      .values(newSubmittedLaboratoryWork)
      .returning();
    return { submittedLaboratoryWork: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const createSubmittedLaboratoryWork = async (value: NewSubmittedLaboratoryWorkParams) => {
  const newSubmittedLaboratoryWork = insertSubmittedLaboratoryWorkSchema.parse(value);
  try {
    const [s] =  await db
    // @ts-ignore
      .insert(submittedLaboratoryWork)
      .values(newSubmittedLaboratoryWork)
      .returning();
    return { submittedLaboratoryWork: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSubmittedLaboratoryWork = async (id: SubmittedLaboratoryWorkId, submittedLaboratoryWork: UpdateSubmittedLaboratoryWorkParams) => {
  const { id: submittedLaboratoryWorkId } = submittedLaboratoryWorkIdSchema.parse({ id });
  const newSubmittedLaboratoryWork = updateSubmittedLaboratoryWorkSchema.parse(submittedLaboratoryWork);
  try {
    const [s] =  await db
    // @ts-ignore
     .update(submittedLaboratoryWork)
     .set({...newSubmittedLaboratoryWork, updatedAt: new Date() })
    // @ts-ignore
     .where(eq(submittedLaboratoryWork.id, submittedLaboratoryWorkId!))
     .returning();
    return { submittedLaboratoryWork: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSubmittedLaboratoryWork = async (id: SubmittedLaboratoryWorkId) => {
  const { id: submittedLaboratoryWorkId } = submittedLaboratoryWorkIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(submittedLaboratoryWork).where(eq(submittedLaboratoryWork.id, submittedLaboratoryWorkId!))
    .returning();
    return { submittedLaboratoryWork: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


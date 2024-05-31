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

export const createSubmittedLaboratoryWork = async (submittedLaboratoryWork: NewSubmittedLaboratoryWorkParams) => {
  const newSubmittedLaboratoryWork = insertSubmittedLaboratoryWorkSchema.parse(submittedLaboratoryWork);
  try {
    // @ts-ignore
    const [s] =  await db.insert(submittedLaboratoryWork).values(newSubmittedLaboratoryWork).returning();
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

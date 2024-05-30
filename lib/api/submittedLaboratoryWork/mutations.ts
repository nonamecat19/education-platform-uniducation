import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  SubmittedLaboratoryWorkId, 
  NewSubmittedLaboratoryWorkParams,
  UpdateSubmittedLaboratoryWorkParams, 
  updateSubmittedLaboratoryWorkSchema,
  insertSubmittedLaboratoryWorkSchema, 
  submittedLaboratoryWork,
  submittedLaboratoryWorkIdSchema 
} from "@/lib/db/schema/submittedLaboratoryWork";

export const createSubmittedLaboratoryWork = async (submittedLaboratoryWork: NewSubmittedLaboratoryWorkParams) => {
  const newSubmittedLaboratoryWork = insertSubmittedLaboratoryWorkSchema.parse(submittedLaboratoryWork);
  try {
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
     .update(submittedLaboratoryWork)
     .set({...newSubmittedLaboratoryWork, updatedAt: new Date() })
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


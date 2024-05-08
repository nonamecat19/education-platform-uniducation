import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  LaboratoryWorkId, 
  NewLaboratoryWorkParams,
  UpdateLaboratoryWorkParams, 
  updateLaboratoryWorkSchema,
  insertLaboratoryWorkSchema, 
  laboratoryWorks,
  laboratoryWorkIdSchema 
} from "@/lib/db/schema/laboratoryWorks";

export const createLaboratoryWork = async (laboratoryWork: NewLaboratoryWorkParams) => {
  const newLaboratoryWork = insertLaboratoryWorkSchema.parse(laboratoryWork);
  try {
    const [l] =  await db.insert(laboratoryWorks).values(newLaboratoryWork).returning();
    return { laboratoryWork: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLaboratoryWork = async (id: LaboratoryWorkId, laboratoryWork: UpdateLaboratoryWorkParams) => {
  const { id: laboratoryWorkId } = laboratoryWorkIdSchema.parse({ id });
  const newLaboratoryWork = updateLaboratoryWorkSchema.parse(laboratoryWork);
  try {
    const [l] =  await db
     .update(laboratoryWorks)
     .set({...newLaboratoryWork, updatedAt: new Date() })
     .where(eq(laboratoryWorks.id, laboratoryWorkId!))
     .returning();
    return { laboratoryWork: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLaboratoryWork = async (id: LaboratoryWorkId) => {
  const { id: laboratoryWorkId } = laboratoryWorkIdSchema.parse({ id });
  try {
    const [l] =  await db.delete(laboratoryWorks).where(eq(laboratoryWorks.id, laboratoryWorkId!))
    .returning();
    return { laboratoryWork: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


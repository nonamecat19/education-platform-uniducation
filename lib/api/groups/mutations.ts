import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  GroupId, 
  NewGroupParams,
  UpdateGroupParams, 
  updateGroupSchema,
  insertGroupSchema, 
  groups,
  groupIdSchema 
} from "@/lib/db/schema/groups";

export const createGroup = async (group: NewGroupParams) => {
  const newGroup = insertGroupSchema.parse(group);
  try {
    const [g] =  await db.insert(groups).values(newGroup).returning();
    return { group: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGroup = async (id: GroupId, group: UpdateGroupParams) => {
  const { id: groupId } = groupIdSchema.parse({ id });
  const newGroup = updateGroupSchema.parse(group);
  try {
    const [g] =  await db
     .update(groups)
     .set({...newGroup, updatedAt: new Date() })
     .where(eq(groups.id, groupId!))
     .returning();
    return { group: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGroup = async (id: GroupId) => {
  const { id: groupId } = groupIdSchema.parse({ id });
  try {
    const [g] =  await db.delete(groups).where(eq(groups.id, groupId!))
    .returning();
    return { group: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


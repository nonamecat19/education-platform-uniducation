import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createGroup,
  deleteGroup,
  updateGroup,
} from "@/lib/api/groups/mutations";
import { 
  groupIdSchema,
  insertGroupParams,
  updateGroupParams 
} from "@/lib/db/schema/groups";

export async function POST(req: Request) {
  try {
    const validatedData = insertGroupParams.parse(await req.json());
    const { group } = await createGroup(validatedData);

    revalidatePath("/groups"); // optional - assumes you will have named route same as entity

    return NextResponse.json(group, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateGroupParams.parse(await req.json());
    const validatedParams = groupIdSchema.parse({ id });

    const { group } = await updateGroup(validatedParams.id, validatedData);

    return NextResponse.json(group, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = groupIdSchema.parse({ id });
    const { group } = await deleteGroup(validatedParams.id);

    return NextResponse.json(group, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

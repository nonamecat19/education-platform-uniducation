import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createUnit,
  deleteUnit,
  updateUnit,
} from "@/lib/api/units/mutations";
import { 
  unitIdSchema,
  insertUnitParams,
  updateUnitParams 
} from "@/lib/db/schema/units";

export async function POST(req: Request) {
  try {
    const validatedData = insertUnitParams.parse(await req.json());
    const { unit } = await createUnit(validatedData);

    revalidatePath("/units"); // optional - assumes you will have named route same as entity

    return NextResponse.json(unit, { status: 201 });
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

    const validatedData = updateUnitParams.parse(await req.json());
    const validatedParams = unitIdSchema.parse({ id });

    const { unit } = await updateUnit(validatedParams.id, validatedData);

    return NextResponse.json(unit, { status: 200 });
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

    const validatedParams = unitIdSchema.parse({ id });
    const { unit } = await deleteUnit(validatedParams.id);

    return NextResponse.json(unit, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

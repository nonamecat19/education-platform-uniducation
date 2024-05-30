import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createSubmittedLaboratoryWork,
  deleteSubmittedLaboratoryWork,
  updateSubmittedLaboratoryWork,
} from "@/lib/api/submittedLaboratoryWork/mutations";
import { 
  submittedLaboratoryWorkIdSchema,
  insertSubmittedLaboratoryWorkParams,
  updateSubmittedLaboratoryWorkParams 
} from "@/lib/db/schema/submittedLaboratoryWork";

export async function POST(req: Request) {
  try {
    const validatedData = insertSubmittedLaboratoryWorkParams.parse(await req.json());
    const { submittedLaboratoryWork } = await createSubmittedLaboratoryWork(validatedData);

    revalidatePath("/submittedLaboratoryWork"); // optional - assumes you will have named route same as entity

    return NextResponse.json(submittedLaboratoryWork, { status: 201 });
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

    const validatedData = updateSubmittedLaboratoryWorkParams.parse(await req.json());
    const validatedParams = submittedLaboratoryWorkIdSchema.parse({ id });

    const { submittedLaboratoryWork } = await updateSubmittedLaboratoryWork(validatedParams.id, validatedData);

    return NextResponse.json(submittedLaboratoryWork, { status: 200 });
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

    const validatedParams = submittedLaboratoryWorkIdSchema.parse({ id });
    const { submittedLaboratoryWork } = await deleteSubmittedLaboratoryWork(validatedParams.id);

    return NextResponse.json(submittedLaboratoryWork, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

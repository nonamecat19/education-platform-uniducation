import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createSubject,
  deleteSubject,
  updateSubject,
} from "@/lib/api/subjects/mutations";
import { 
  subjectIdSchema,
  insertSubjectParams,
  updateSubjectParams 
} from "@/lib/db/schema/subjects";

export async function POST(req: Request) {
  try {
    const validatedData = insertSubjectParams.parse(await req.json());
    const { subject } = await createSubject(validatedData);

    revalidatePath("/subjects"); // optional - assumes you will have named route same as entity

    return NextResponse.json(subject, { status: 201 });
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

    const validatedData = updateSubjectParams.parse(await req.json());
    const validatedParams = subjectIdSchema.parse({ id });

    const { subject } = await updateSubject(validatedParams.id, validatedData);

    return NextResponse.json(subject, { status: 200 });
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

    const validatedParams = subjectIdSchema.parse({ id });
    const { subject } = await deleteSubject(validatedParams.id);

    return NextResponse.json(subject, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

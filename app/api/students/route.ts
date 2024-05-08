import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createStudent,
  deleteStudent,
  updateStudent,
} from "@/lib/api/students/mutations";
import { 
  studentIdSchema,
  insertStudentParams,
  updateStudentParams 
} from "@/lib/db/schema/students";

export async function POST(req: Request) {
  try {
    const validatedData = insertStudentParams.parse(await req.json());
    const { student } = await createStudent(validatedData);

    revalidatePath("/students"); // optional - assumes you will have named route same as entity

    return NextResponse.json(student, { status: 201 });
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

    const validatedData = updateStudentParams.parse(await req.json());
    const validatedParams = studentIdSchema.parse({ id });

    const { student } = await updateStudent(validatedParams.id, validatedData);

    return NextResponse.json(student, { status: 200 });
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

    const validatedParams = studentIdSchema.parse({ id });
    const { student } = await deleteStudent(validatedParams.id);

    return NextResponse.json(student, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

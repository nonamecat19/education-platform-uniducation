import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCourse,
  deleteCourse,
  updateCourse,
} from "@/lib/api/courses/mutations";
import { 
  courseIdSchema,
  insertCourseParams,
  updateCourseParams 
} from "@/lib/db/schema/courses";

export async function POST(req: Request) {
  try {
    const validatedData = insertCourseParams.parse(await req.json());
    const { course } = await createCourse(validatedData);

    revalidatePath("/courses"); // optional - assumes you will have named route same as entity

    return NextResponse.json(course, { status: 201 });
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

    const validatedData = updateCourseParams.parse(await req.json());
    const validatedParams = courseIdSchema.parse({ id });

    const { course } = await updateCourse(validatedParams.id, validatedData);

    return NextResponse.json(course, { status: 200 });
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

    const validatedParams = courseIdSchema.parse({ id });
    const { course } = await deleteCourse(validatedParams.id);

    return NextResponse.json(course, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

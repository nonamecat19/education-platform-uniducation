import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createLaboratoryWork,
  deleteLaboratoryWork,
  updateLaboratoryWork,
} from "@/lib/api/laboratoryWorks/mutations";
import { 
  laboratoryWorkIdSchema,
  insertLaboratoryWorkParams,
  updateLaboratoryWorkParams 
} from "@/lib/db/schema/laboratoryWorks";

export async function POST(req: Request) {
  try {
    const validatedData = insertLaboratoryWorkParams.parse(await req.json());
    const { laboratoryWork } = await createLaboratoryWork(validatedData);

    revalidatePath("/laboratoryWorks"); // optional - assumes you will have named route same as entity

    return NextResponse.json(laboratoryWork, { status: 201 });
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

    const validatedData = updateLaboratoryWorkParams.parse(await req.json());
    const validatedParams = laboratoryWorkIdSchema.parse({ id });

    const { laboratoryWork } = await updateLaboratoryWork(validatedParams.id, validatedData);

    return NextResponse.json(laboratoryWork, { status: 200 });
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

    const validatedParams = laboratoryWorkIdSchema.parse({ id });
    const { laboratoryWork } = await deleteLaboratoryWork(validatedParams.id);

    return NextResponse.json(laboratoryWork, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
  createTeacher,
  deleteTeacher,
  updateTeacher,
} from '@/lib/api/teachers/mutations'
import {
  teacherIdSchema,
  insertTeacherParams,
  updateTeacherParams,
} from '@/lib/db/schema'

export async function POST(req: Request) {
  try {
    const validatedData = insertTeacherParams.parse(await req.json())
    const { teacher } = await createTeacher(validatedData)

    revalidatePath('/teachers') // optional - assumes you will have named route same as entity

    return NextResponse.json(teacher, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    } else {
      return NextResponse.json({ error: err }, { status: 500 })
    }
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    const validatedData = updateTeacherParams.parse(await req.json())
    const validatedParams = teacherIdSchema.parse({ id })

    const { teacher } = await updateTeacher(validatedParams.id, validatedData)

    return NextResponse.json(teacher, { status: 200 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    } else {
      return NextResponse.json(err, { status: 500 })
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    const validatedParams = teacherIdSchema.parse({ id })
    const { teacher } = await deleteTeacher(validatedParams.id)

    return NextResponse.json(teacher, { status: 200 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    } else {
      return NextResponse.json(err, { status: 500 })
    }
  }
}

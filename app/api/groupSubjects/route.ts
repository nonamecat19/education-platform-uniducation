import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
  createGroupSubject,
  deleteGroupSubject,
  updateGroupSubject,
} from '@/lib/api/groupSubjects/mutations'
import {
  groupSubjectIdSchema,
  insertGroupSubjectParams,
  updateGroupSubjectParams,
} from '@/lib/db/schema'

export async function POST(req: Request) {
  try {
    const validatedData = insertGroupSubjectParams.parse(await req.json())
    const { groupSubject } = await createGroupSubject(validatedData)

    revalidatePath('/groupSubjects') // optional - assumes you will have named route same as entity

    return NextResponse.json(groupSubject, { status: 201 })
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

    const validatedData = updateGroupSubjectParams.parse(await req.json())
    const validatedParams = groupSubjectIdSchema.parse({ id })

    const { groupSubject } = await updateGroupSubject(
      validatedParams.id,
      validatedData,
    )

    return NextResponse.json(groupSubject, { status: 200 })
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

    const validatedParams = groupSubjectIdSchema.parse({ id })
    const { groupSubject } = await deleteGroupSubject(validatedParams.id)

    return NextResponse.json(groupSubject, { status: 200 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    } else {
      return NextResponse.json(err, { status: 500 })
    }
  }
}

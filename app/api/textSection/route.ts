import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
  createTextSection,
  deleteTextSection,
  updateTextSection,
} from '@/lib/api/textSection/mutations'
import {
  textSectionIdSchema,
  insertTextSectionParams,
  updateTextSectionParams,
} from '@/lib/db/schema'

export async function POST(req: Request) {
  try {
    const validatedData = insertTextSectionParams.parse(await req.json())
    const { textSection } = await createTextSection(validatedData)

    revalidatePath('/textSection') // optional - assumes you will have named route same as entity

    return NextResponse.json(textSection, { status: 201 })
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

    const validatedData = updateTextSectionParams.parse(await req.json())
    const validatedParams = textSectionIdSchema.parse({ id })

    const { textSection } = await updateTextSection(
      validatedParams.id,
      validatedData,
    )

    return NextResponse.json(textSection, { status: 200 })
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

    const validatedParams = textSectionIdSchema.parse({ id })
    const { textSection } = await deleteTextSection(validatedParams.id)

    return NextResponse.json(textSection, { status: 200 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    } else {
      return NextResponse.json(err, { status: 500 })
    }
  }
}

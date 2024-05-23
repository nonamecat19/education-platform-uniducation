import { NextResponse } from 'next/server'

export async function POST(request: any) {
  console.log({ request })
  try {
    const clerkEvent = await request.json()
    console.log({ clerkEvent })

    if (clerkEvent.type === 'user.created') {
      const userData = clerkEvent.data
      console.log('New user created:', userData)
    }

    return NextResponse.json({ status: 'success' })
  } catch (error: any) {
    console.error('Error handling Clerk webhook:', error)
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 },
    )
  }
}

import { NextResponse } from 'next/server'
import { currentUser, auth } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // Get user's information
  const user = await currentUser()
  if (!user) {
    return new NextResponse('User not exist', { status: 404 })
  }

  let dbUser: any = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, user.id))
  console.log({ first: dbUser })

  if (!dbUser) {
    // @ts-ignore
    dbUser = await db.insert(users).values([
      {
        name: (user.firstName ?? '') + (user.lastName ?? ''),
        email: user.emailAddresses[0].emailAddress ?? '',
        clerkId: user.id,
      },
    ])
    console.log({ second: dbUser })
  }

  if (!dbUser) {
    return new NextResponse(null, {
      status: 302, // 302 Found - temporary redirect
      headers: {
        Location: 'https://go.bradi.tech/api/auth/new-user',
      },
    })
  }
  // Perform your Route Handler's logic with the returned user object

  return new NextResponse(null, {
    status: 302, // 302 Found - temporary redirect
    headers: {
      Location: 'https://go.bradi.tech/dashboard',
    },
  })
}

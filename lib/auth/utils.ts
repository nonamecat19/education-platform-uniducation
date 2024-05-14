import { db } from '@/lib/db'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { DefaultSession, getServerSession, NextAuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import { redirect } from 'next/navigation'
import { env } from '@/lib/env.mjs'
import GoogleProvider from 'next-auth/providers/google'
import {
  accounts,
  NewUser,
  sessions,
  users,
  verificationTokens,
} from '@/lib/db/schema'
import { faker } from '@faker-js/faker'
import { nanoid } from '@/lib/utils'

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string
    }
  }
}

export type AuthSession = {
  session: {
    user: {
      id: string
      name?: string
      email?: string
    }
  } | null
}

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id
      return session
    },
  },
  providers: [
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile: (profile) => {
        console.log({ profile })
        const user: NewUser = {
          id: nanoid(),
          email: profile.email,
          name: profile.name ?? 'User ' + faker.number.int(1000),
          emailVerified: new Date(),
          image: profile.picture ?? null,
          role: 'user',
        }
        return user
      },
    }),
  ],
}

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions)
  return { session } as AuthSession
}

export const checkAuth = async () => {
  const { session } = await getUserAuth()
  if (!session) redirect('/api/auth/signin')
}

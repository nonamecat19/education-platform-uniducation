import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { PropsWithChildren } from 'react'
import { cookies } from 'next/headers'
import NextAuthProvider from '@/lib/auth/Provider'
import TrpcProvider from '@/lib/trpc/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Uniducation',
  description: 'Education platform',
}

interface Props extends PropsWithChildren {
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextAuthProvider>
        <TrpcProvider cookies={cookies().toString()}>
          {children}
        </TrpcProvider>
      </NextAuthProvider>
    </ThemeProvider>
    </body>
    </html>
  )
}

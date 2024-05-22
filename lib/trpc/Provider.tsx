'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import React, { ReactNode, useState } from 'react'

import { trpcCSR } from './client'
import { getUrl } from './utils'

import SuperJSON from 'superjson'

export default function TrpcProvider({
  children,
  cookies,
}: {
  children: ReactNode
  cookies: string
}) {
  const [queryClient] = useState(() => new QueryClient({}))
  const [trpcClient] = useState(() =>
    trpcCSR.createClient({
      transformer: SuperJSON,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: getUrl(),
          headers() {
            return {
              cookie: cookies,
              'x-trpc-source': 'react',
            }
          },
        }),
      ],
    }),
  )
  return (
    <trpcCSR.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpcCSR.Provider>
  )
}

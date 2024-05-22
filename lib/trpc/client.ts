import { createTRPCReact } from '@trpc/react-query'

import { type AppRouter } from '@/lib/server/routers/_app'

export const trpcCSR = createTRPCReact<AppRouter>({})

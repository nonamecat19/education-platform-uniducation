import { appRouter } from '@/lib/server/routers/_app'
import { httpBatchLink } from '@trpc/client'
import { env } from '@/lib/env.mjs'

export const trpcSSR = appRouter.createCaller({
  // @ts-ignore
  links: [
    httpBatchLink({
      url: `${env.NEXT_PUBLIC_HOST}/api/trpc`,
    }),
  ],
})

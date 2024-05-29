'use client'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { HeaderLinks } from '@/lib/types'

interface Props {
  links: HeaderLinks
}

export const Header = ({ links }: Props) => {
  const pathname = usePathname()

  return (
    <div className="pb-3">
      <header className="flex gap-5 p-3">
        {links.map(({ url, name }) => {
          return (
            <Link
              key={url}
              href={url}
              className={classNames(
                'font-semibold',
                {
                  'text-indigo-400': pathname === url,
                })}
            >
              {name}
            </Link>
          )
        })}
      </header>
      <Separator />
    </div>
  )
}

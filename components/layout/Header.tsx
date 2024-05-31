'use client'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { HeaderLinks } from '@/lib/types'
import Image from 'next/image'
import logo from '@/public/svg/logo.svg'
import SignOutBtn from '@/components/auth/SignOutBtn'

interface Props {
  links: HeaderLinks
}

export const Header = ({ links }: Props) => {
  const pathname = usePathname()

  return (
    <div className="pb-3 text-xl">
      <header className="flex justify-between items-center pr-5">
        <div className="flex gap-5 p-3 items-center">
          <Link href="/">
            <div className="flex gap-2 mr-5 items-center border border-indigo-500 rounded-lg px-3 py-1">
              <Image
                src={logo}
                alt="logo"
                height={34}
              />
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600">
                Uniducation
              </h2>
            </div>
          </Link>

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
        </div>

        <SignOutBtn/>
      </header>
      <Separator />
    </div>
  )
}

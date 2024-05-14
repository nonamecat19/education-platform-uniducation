import { SidebarLink } from '@/components/SidebarItems'
import { Cog, Globe, HomeIcon } from 'lucide-react'

type AdditionalLinks = {
  title: string
  links: SidebarLink[]
}

export const defaultLinks: SidebarLink[] = [
  { href: '/admin/dashboard', title: 'Home', icon: HomeIcon },
  { href: '/account', title: 'Account', icon: Cog },
  { href: '/settings', title: 'Settings', icon: Cog },
]

export const additionalLinks: AdditionalLinks[] = [
  {
    title: 'Entities',
    links: [
      {
        href: '/admin/laboratory-works',
        title: 'Laboratory Works',
        icon: Globe,
      },
      {
        href: '/admin/text-section',
        title: 'Text Section',
        icon: Globe,
      },
      {
        href: '/admin/units',
        title: 'Units',
        icon: Globe,
      },
      {
        href: '/admin/courses',
        title: 'Courses',
        icon: Globe,
      },
      {
        href: '/admin/group-subjects',
        title: 'Group Subjects',
        icon: Globe,
      },
      {
        href: '/admin/subjects',
        title: 'Subjects',
        icon: Globe,
      },
      {
        href: '/admin/students',
        title: 'Students',
        icon: Globe,
      },
      {
        href: '/admin/groups',
        title: 'Groups',
        icon: Globe,
      },
      {
        href: '/admin/teachers',
        title: 'Teachers',
        icon: Globe,
      },
    ],
  },
]

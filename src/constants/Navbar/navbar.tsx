import React, { ReactNode } from 'react' // Ensure React is imported
import { MdDashboard, MdBook, MdCalendarMonth } from 'react-icons/md'

interface NavItem {
  name: string
  link: string
  icon: ReactNode
}

export const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    link: '/',
    icon: <MdDashboard style={{ fill: 'white' }} />,
  },
  {
    name: 'Journals',
    link: '/my-journals',
    icon: <MdBook style={{ fill: 'white' }} />,
  },
  {
    name: 'Calendar',
    link: '/calendar',
    icon: <MdCalendarMonth style={{ fill: 'white' }} />,
  },
]

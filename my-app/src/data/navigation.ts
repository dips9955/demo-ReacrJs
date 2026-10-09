import type { Page, Project } from '../types/dashboard'

export type NavigationItem = {
  label: Page
  icon: string
  group: string
}

export const navigationGroups = ['Workspace', 'Architecture']

export const navigationItems: NavigationItem[] = [
  { label: 'Home', icon: '⌂', group: 'Workspace' },
  { label: 'Counter', icon: '↗', group: 'Workspace' },
  { label: 'Todo List', icon: '✓', group: 'Workspace' },
  { label: 'LLD Projects', icon: '◇', group: 'Architecture' },
  { label: 'HLD Projects', icon: '▦', group: 'Architecture' },
]

export const pageDescriptions: Record<Page, string> = {
  Home: 'A calm space to plan, build, and keep track of your ideas.',
  Counter: 'A tiny tool to keep your React counter close at hand.',
  'Todo List': 'Capture the next small step and keep your momentum going.',
  'LLD Projects': 'Practice the details: objects, patterns, and clean interfaces.',
  'HLD Projects': 'Explore the bigger picture: systems, scale, and trade-offs.',
}

export const starterProjects: Project[] = [
  { id: 1, name: 'Food delivery platform', description: 'Order, menu, and delivery workflows' },
  { id: 2, name: 'Rate limiter', description: 'Token bucket and sliding window strategies' },
  { id: 3, name: 'URL shortener', description: 'Scalable link generation and redirects' },
]

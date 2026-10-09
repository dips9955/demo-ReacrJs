export type Page = 'Home' | 'Counter' | 'Todo List' | 'LLD Projects' | 'HLD Projects'

export type Todo = {
  id: number
  title: string
  done: boolean
}

export type Project = {
  id: number
  name: string
  description: string
}

export type ProjectKind = 'lld' | 'hld'

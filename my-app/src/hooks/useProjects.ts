import { starterProjects } from '../data/navigation'
import type { Project, ProjectKind } from '../types/dashboard'
import { useLocalStorageState } from './useLocalStorageState'

const storageKeys: Record<ProjectKind, string> = {
  lld: 'devspace-lld-projects',
  hld: 'devspace-hld-projects',
}

export function useProjects(kind: ProjectKind) {
  const [projects, setProjects] = useLocalStorageState<Project[]>(
    storageKeys[kind],
    starterProjects,
  )

  const addProject = (name: string) => {
    setProjects((currentProjects) => [...currentProjects, {
      id: Date.now(),
      name,
      description: 'Personal architecture project',
    }])
  }

  return { projects, addProject }
}

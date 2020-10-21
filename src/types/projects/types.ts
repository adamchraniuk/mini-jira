import { SortBy } from '@/types/issues/types'

export interface Project {
  id: string
  description: string
  created_at: Date
  modified_at: Date
  name: string
}

export interface ProjectState {
  list: Project[]
  allProjects: Project[]
  relatedProjects: Project[]
  loading: boolean
  activeProject: Project[]
  sortBy: SortBy
}

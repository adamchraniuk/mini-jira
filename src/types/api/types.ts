export interface Issue {
  id: string
  projectId: string
  description: string
  created_at: Date
  modified_at: Date
  status: string
  related_issues: string
}

export interface IssueData {
  data: Issue[]
}

export interface Project {
  id: string
  description: string
  created_at: Date
  modified_at: Date
}

export interface ProjectData {
  data: Project[]
}

export interface ResponseErrorOk {
  data: {
    ok?: string
    id?: string
    error?: string
  }
}

export interface IssueBody {
  projectId?: string
  summary?: string
  related_issues?: string
  description?: string
}

export interface ProjectBody {
  name: string
  description?: string
}

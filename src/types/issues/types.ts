export interface GetAddRemoveRelation {
  projectId: string
  issueId: string
  relatedIssueId?: string
  body?: Issue
}

export interface Issue {
  id: string
  summary?: string
  projectId: string
  description: string
  created_at: Date
  modified_at: Date
  status: string
  related_issues: string
}

export interface AddRemoveIssue {
  projectId: string
  summary: string
  body?: Issue
}

export interface SortBy {
  direction: string
  element: string
}

export interface IssueState {
  list: Issue[]
  allIssues: Issue[]
  relatedIssues: Issue[]
  loading: boolean
  activeIssue: Issue[]
  sortBy: SortBy
}

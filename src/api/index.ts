import axios from 'axios'
import { IssueData, ProjectData, ResponseErrorOk, ProjectBody, IssueBody } from '../types/api/types'

const getAllProjects = async () => (await axios.get(`/projects`)).data as ProjectData[]
const getProject = async (projectId: string) =>
  (await axios.get(`/projects/${projectId}/details`)).data as ProjectData[]
const addProject = async (body: ProjectBody) => (await axios.post(`/projects/add`, body)) as ResponseErrorOk
const editProject = async (body: ProjectBody) => (await axios.put(`/projects`, body)) as ResponseErrorOk
const removeProject = async (id: string) =>
  (await axios.post(`/projects/remove`, {
    id,
  })) as ResponseErrorOk
const getIssues = async () => (await axios.get('/issues')).data as IssueData[]
const getSingleIssue = async id => (await axios.get(`/issues/${id}`)).data as IssueData[]
const getAllIssuesInProject = async (projectId: string) =>
  (await axios.get(`/projects/${projectId}`)).data as IssueData[]
const addNewIssue = async (projectId: string, body: IssueBody) =>
  (await axios.post(`/projects/${projectId}/add`, body)) as ResponseErrorOk
const removeIssue = async (projectId: string, body: { id: string }) =>
  (await axios.post(`/projects/${projectId}/remove`, body)) as ResponseErrorOk
const editIssue = async (projectId: string, issueId: string, body: IssueBody) =>
  (await axios.put(`/projects/${projectId}/${issueId}`, body)) as ResponseErrorOk

const getRelatedIssues = async (projectId: string, issueId: string) =>
  (await axios.get(`/issues/${projectId}/${issueId}/related`)).data as IssueData[]
const removeRelation = async (projectId: string, issueId: string, relatedIssueId: string) =>
  (await axios.put(`/projects/${projectId}/${issueId}/related`, {
    id: relatedIssueId,
  })) as ResponseErrorOk
const addRelation = async (projectId: string, issueId: string, relatedIssueId: string) =>
  (await axios.post(`/projects/${projectId}/${issueId}/related`, {
    id: relatedIssueId,
  })) as ResponseErrorOk

export {
  getSingleIssue,
  getAllProjects,
  addProject,
  editProject,
  removeProject,
  getAllIssuesInProject,
  addNewIssue,
  removeIssue,
  editIssue,
  getRelatedIssues,
  getIssues,
  removeRelation,
  addRelation,
  getProject,
}

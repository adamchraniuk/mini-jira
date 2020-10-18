import axios from 'axios'

interface Body {
  id?: string
  projectId?: string
  name?: string
  summary?: string
}
const getAllProjects = async () => (await axios.get(`/projects`)).data
const getProject = async projectId => (await axios.get(`/projects/${projectId}/details`)).data
const addProject = async body => await axios.post(`/projects/add`, body)
const editProject = async body => await axios.put(`/projects`, body)
const removeProject = async body => await axios.post(`/projects/remove`, body)
const getIssues = async () => (await axios.get('/issues')).data
const getSingleIssue = async id => (await axios.get(`/issues/${id}`)).data
const getAllIssuesInProject = async projectId => (await axios.get(`/projects/${projectId}`)).data
const addNewIssue = async (projectId, body) => await axios.post(`/projects/${projectId}/add`, body)
const removeIssue = async (projectId, body) => await axios.post(`/projects/${projectId}/remove`, body)
const editIssue = async (projectId, issueId, body) => await axios.put(`/projects/${projectId}/${issueId}`, body)

const getRelatedIssues = async (projectId, issueId) => (await axios.get(`/issues/${projectId}/${issueId}/related`)).data
const removeRelation = async (projectId, issueId, relatedIssueId) =>
  await axios.put(`/projects/${projectId}/${issueId}/related`, {
    id: relatedIssueId,
  })
const addRelation = async (projectId, issueId, relatedIssueId) =>
  await axios.post(`/projects/${projectId}/${issueId}/related`, {
    id: relatedIssueId,
  })

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

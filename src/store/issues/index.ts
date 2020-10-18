import * as api from '@/api'
import { sortByFunction } from '@/helpers'

interface Issue {
  id: string
  projectId: string
  description: string
  created_at: Date
  modified_at: Date
  status: string
  related_issues: string
}

export default {
  namespaced: true,
  state: {
    list: [] as Issue[],
    allIssues: [] as Issue[],
    relatedIssues: [] as Issue[],
    loading: true as boolean,
    activeIssue: null as Issue,
    sortBy: {
      direction: 'asc',
      element: 'created_at',
    },
  },
  mutations: {
    setIssues(state, value) {
      state.list = value
    },
    setAllIssues(state, value) {
      state.allIssues = [...value]
    },
    toggleLoading(state, value) {
      state.loading = value
    },
    setSortBy(state, value) {
      state.sortBy = value
    },
    setActiveIssue(state, value) {
      state.activeIssue = value[0]
    },
    setRelatedIssues(state, value) {
      state.relatedIssues = value
    },
  },
  actions: {
    async removeRelation({ dispatch }, { projectId, issueId, relatedIssueId }) {
      await api.removeRelation(projectId, issueId, relatedIssueId)
      dispatch('getRelatedIssues', { projectId, issueId })
    },
    async addRelation({ dispatch }, { projectId, issueId, relatedIssueId }) {
      await api.addRelation(projectId, issueId, relatedIssueId)
      dispatch('getRelatedIssues', { projectId, issueId })
    },
    async getRelatedIssues({ commit }, { projectId, issueId }) {
      const related = await api.getRelatedIssues(projectId, issueId)
      commit('setRelatedIssues', related.results)
    },
    async getSingleIssue({ commit }, id) {
      const issue = await api.getSingleIssue(id)
      commit('setActiveIssue', issue.results)
    },
    async getProjectsIssues({ commit }, projectId) {
      const list = await api.getAllIssuesInProject(projectId)
      commit('setIssues', list.results)
      commit('toggleLoading', false)
    },
    toggleLoading({ commit }, value) {
      commit('toggleLoading', value)
    },
    async updateIssue({ dispatch }, { projectId, issueId, body }) {
      await api.editIssue(projectId, issueId, body)
      dispatch('getProjectsIssues', projectId)
    },
    async getIssuesList({ commit }) {
      const list = await api.getIssues()
      commit('setAllIssues', list.results)
      commit('toggleLoading', false)
    },
    async addNewIssue({ dispatch }, { projectId, summary }) {
      await api.addNewIssue(projectId, { summary })
      dispatch('getIssuesList')
    },
    async removeIssue({ dispatch }, { projectId, body }) {
      await api.removeIssue(projectId, { id: body.id })
      dispatch('getIssuesList')
    },
    sortBy({ commit, state }, value) {
      commit('setSortBy', value)
    },
  },
  getters: {
    activeIssue: state => state.activeIssue,
    issuesList: state => sortByFunction(state),
    allIssues: state => state.allIssues,
    relatedIssues: state => state.relatedIssues,
  },
}

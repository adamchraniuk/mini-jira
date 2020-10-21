import * as api from '@/api'
import { sortByFunction } from '@/helpers'
import { GetAddRemoveRelation, AddRemoveIssue, SortBy, Issue, IssueState } from '@/types/issues/types'
import { Commit, Dispatch } from 'vuex'

export default {
  namespaced: true,
  state: {
    list: [],
    allIssues: [],
    relatedIssues: [],
    loading: true,
    activeIssue: null,
    sortBy: {
      direction: 'asc',
      element: 'created_at',
    },
  },
  mutations: {
    setIssues(state: IssueState, value: Issue[]) {
      state.list = value
    },
    setAllIssues(state: IssueState, value: Issue[]) {
      state.allIssues = [...value]
    },
    toggleLoading(state: IssueState, value: boolean) {
      state.loading = value
    },
    setSortBy(state: IssueState, value: SortBy) {
      state.sortBy = value
    },
    setActiveIssue(state: IssueState, value: Issue) {
      state.activeIssue = value[0]
    },
    setRelatedIssues(state: IssueState, value: Issue[]) {
      state.relatedIssues = value
    },
  },
  actions: {
    async removeRelation(
      { dispatch }: { dispatch: Dispatch },
      { projectId, issueId, relatedIssueId }: GetAddRemoveRelation
    ) {
      await api.removeRelation(projectId, issueId, relatedIssueId)
      await dispatch('getRelatedIssues', { projectId, issueId })
    },

    async addRelation(
      { dispatch }: { dispatch: Dispatch },
      { projectId, issueId, relatedIssueId }: GetAddRemoveRelation
    ) {
      await api.addRelation(projectId, issueId, relatedIssueId)
      await dispatch('getRelatedIssues', { projectId, issueId })
    },

    async getRelatedIssues({ commit }: { commit: Commit }, { projectId, issueId }: GetAddRemoveRelation) {
      const related = await api.getRelatedIssues(projectId, issueId)
      commit('setRelatedIssues', related)
    },

    async getSingleIssue({ commit }: { commit: Commit }, id: string) {
      const issue = await api.getSingleIssue(id)
      commit('setActiveIssue', issue)
    },
    async getProjectsIssues({ commit }: { commit: Commit }, projectId: string) {
      const list = await api.getAllIssuesInProject(projectId)
      commit('setIssues', list)
      commit('toggleLoading', false)
    },
    toggleLoading({ commit }: { commit: Commit }, value: boolean) {
      commit('toggleLoading', value)
    },
    async updateIssue({ dispatch }: { dispatch: Dispatch }, { projectId, issueId, body }: GetAddRemoveRelation) {
      await api.editIssue(projectId, issueId, body)
      await dispatch('getProjectsIssues', projectId)
    },
    async getIssuesList({ commit }: { commit: Commit }) {
      const list = await api.getIssues()
      commit('setAllIssues', list)
      commit('toggleLoading', false)
    },
    async addNewIssue({ dispatch }: { dispatch: Dispatch }, { projectId, summary }: AddRemoveIssue) {
      await api.addNewIssue(projectId, { summary })
      await dispatch('getIssuesList')
    },
    async removeIssue({ dispatch }: { dispatch: Dispatch }, { projectId, body }: AddRemoveIssue) {
      await api.removeIssue(projectId, { id: body.id })
      await dispatch('getIssuesList')
    },
    sortBy({ commit }: { commit: Commit }, value: SortBy) {
      commit('setSortBy', value)
    },
  },
  getters: {
    activeIssue: (state: IssueState) => state.activeIssue,
    issuesList: (state: IssueState) => sortByFunction(state),
    allIssues: (state: IssueState) => state.allIssues,
    relatedIssues: (state: IssueState) => state.relatedIssues,
  },
}

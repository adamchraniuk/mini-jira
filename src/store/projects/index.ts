import * as api from '@/api'
import { sortByFunction } from '@/helpers'
import { ProjectState, Project } from '@/types/projects/types'
import { SortBy } from '@/types/issues/types'
import { Commit } from 'vuex'

export default {
  namespaced: true,
  state: {
    list: [],
    activeProject: null,
    sortBy: {
      direction: 'asc',
      element: 'created_at',
    },
  },
  mutations: {
    setProjects(state: ProjectState, value: Project[]) {
      state.list = [...value]
    },
    setSortBy(state: ProjectState, value: SortBy) {
      state.sortBy = value
    },
    setActiveProject(state: ProjectState, value: Project) {
      state.activeProject = value[0]
    },
  },
  actions: {
    async getProject({ commit }: { commit: Commit }, projectId: string) {
      const project = await api.getProject(projectId)
      commit('setActiveProject', project)
    },
    async getProjectsList({ commit }: { commit: Commit }) {
      const list = await api.getAllProjects()
      commit('setProjects', list)
    },
    async deleteProject({ dispatch }, { id }: { id: string }) {
      await api.removeProject(id)
      dispatch('getProjectsList')
    },
    sortBy({ commit }: { commit: Commit }, value: SortBy) {
      commit('setSortBy', value)
    },
  },
  getters: {
    projectList: (state: ProjectState) => sortByFunction(state),
    activeProject: (state: ProjectState) => state.activeProject,
  },
}

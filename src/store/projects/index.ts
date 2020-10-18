import * as api from '@/api'
import { sortByFunction } from '@/helpers'

interface Project {
  id: string
  description: string
  created_at: Date
  modified_at: Date
}

export default {
  namespaced: true,
  state: {
    list: [] as Project[],
    activeProject: null as Project,
    sortBy: {
      direction: 'asc',
      element: 'created_at',
    },
  },
  mutations: {
    setProjects(state, value) {
      state.list = [...value]
    },
    setSortBy(state, value) {
      state.sortBy = value
    },
    setActiveProject(state, value) {
      state.activeProject = value[0]
    },
  },
  actions: {
    async getProject({ commit }, projectId) {
      const project = await api.getProject(projectId)
      commit('setActiveProject', project.results)
    },
    async getProjectsList({ commit }) {
      const list = await api.getAllProjects()
      commit('setProjects', list.results)
    },
    async deleteProject({ dispatch }, { id }) {
      await api.removeProject({ id })
      dispatch('getProjectsList')
    },
    sortBy({ commit, state }, value) {
      commit('setSortBy', value)
    },
  },
  getters: {
    projectList: state => sortByFunction(state),
    activeProject: state => state.activeProject,
  },
}

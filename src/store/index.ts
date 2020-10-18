import Vue from 'vue'
import Vuex from 'vuex'
import projects from './projects'
import issues from './issues'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})

export default new Vuex.Store({
  modules: {
    projects,
    issues,
  },
  plugins: [vuexLocal.plugin],
})

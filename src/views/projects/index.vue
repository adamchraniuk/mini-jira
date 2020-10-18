<template>
  <v-row justify="start" align="start" class="relative">
    <v-col md="4" sm="8" class="mt-4">
      <autocomplete :list="list" :label="'Find project'" @onChange="redirectToProject"> </autocomplete>
    </v-col>
    <v-col md="4" sm="4" class="ml-auto mr-auto mt-2">
      <sort-by :sort-by="sortByState" @onSort="sortBy" />
    </v-col>
    <v-btn class="mt-2 v-btn--absolute" fab color="primary" style="right: 0" @click="newProject">
      <v-icon>
        add
      </v-icon>
    </v-btn>
    <h1 class="w-100 col-sm-12">
      Projects
    </h1>
    <v-col v-for="item of list" :key="item.id" cols="12" sm="6" md="4" @click="navigateToProject(item.id)">
      <project-card
        :id="item.id"
        :description="item.description"
        :title="item.name"
        link
        class="pointer relative card_min_height"
        @onRemove="onRemove"
        @onEdit="onEdit"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ProjectCard from '@/components/project-card.vue'
import SortBy from '@/components/sortby.vue'
import Autocomplete from '@/components/autocomplete.vue'
import { namespace } from 'vuex-class'

const projects = namespace('projects')

@Component({
  components: {
    ProjectCard,
    SortBy,
    Autocomplete,
  },
})
export default class Projects extends Vue {
  @projects.Action('getProjectsList') getProjectsList
  @projects.Getter('projectList') list
  @projects.Action('addNewProject') addNewProject
  @projects.Action('deleteProject') deleteProject
  @projects.Action('sortBy') sortBy
  @projects.State('sortBy') sortByState
  item = null

  async created() {
    this.getProjectsList()
  }

  navigateToProject(url: string) {
    this.$router.push(`projects/${url}`)
  }
  onRemove(id: string) {
    this.deleteProject({ id })
  }
  onEdit(id: string) {
    this.$router.push(`/projects/${id}/edit`)
  }
  newProject() {
    this.$router.push('/add-new-project')
  }
  redirectToProject(item) {
    this.$router.push(`projects/${item.id}`)
  }
}
</script>

<template>
  <v-row v-if="!loading" justify="start" align="start">
    <v-col md="4" sm="8" class="d-flex">
      <v-btn class="mt-4 mr-6" small fab color="success" @click="newIssue">
        <v-icon>
          add
        </v-icon>
      </v-btn>
      <autocomplete class="mt-4" :list="list" :label="'Find issue'" @onChange="redirectToIssue"></autocomplete>
    </v-col>
    <v-col md="4" sm="4" class="ml-auto">
      <sort-by :sort-by="sortByState" @onSort="sortBy" />
    </v-col>
    <h1 class="w-100 col-sm-12">
      {{ projectTitle }}
    </h1>
    <v-col v-for="status of statuses" :key="status" cols="12" sm="6" md="4">
      <h2>{{ status }} {{ status === 'DONE' ? '' : `(${countByStatus[status] || 0})` }}</h2>
      <v-list>
        <issues-list
          v-for="item of filteredList(status)"
          :id="item.id"
          :key="item.id"
          :title="item.summary"
          :link="`/issues/${item.id}`"
          :status="status"
          :project-id="item.projectId"
          @changeStatus="changeStatus"
        />
      </v-list>
    </v-col>
  </v-row>
  <v-row v-else justify="center" align="center">
    <loader />
  </v-row>
</template>

<script lang="ts">
import _ from 'lodash'
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import IssuesList from '@/components/issues-list.vue'
import Loader from '@/components/loader.vue'
import SortBy from '@/components/sortby.vue'
import Autocomplete from '@/components/autocomplete.vue'

const issues = namespace('issues')
const projects = namespace('projects')

@Component({
  components: {
    Autocomplete,
    Loader,
    IssuesList,
    SortBy,
  },
})
export default class SingleProject extends Vue {
  @projects.State('list') project
  @projects.Action('getProjectsList') getProjectsList
  @issues.Action('getProjectsIssues') getProjectsIssues
  @issues.Action('updateIssue') updateIssue
  @issues.Action('toggleLoading') toggleLoading
  @issues.Action('removeIssue') removeIssue
  @issues.Getter('issuesList') list
  @issues.State('loading') loading
  @issues.Action('sortBy') sortBy
  @issues.Action('addNewIssue') addNewIssue
  @issues.State('sortBy') sortByState
  statuses = ['TODO', 'IN PROGRESS', 'DONE']

  async created() {
    this.toggleLoading(true)
    await this.getProjectsIssues(this.$route.params.projectId)
  }

  get projectTitle() {
    const details = _.find(this.project, project => project.id === this.$route.params.projectId)
    return `${details.id} - ${details.name}`
  }

  get countByStatus() {
    return _.countBy(this.list, item => item.status)
  }

  newIssue() {
    this.$router.push(`/add-new-issue/${this.$route.params.projectId}`)
  }

  changeStatus(data: { id: string; status: string; title: string }) {
    const { id, status, title } = data
    this.updateIssue({
      projectId: this.$route.params.projectId,
      issueId: id,
      body: { summary: title, status },
    })
  }

  filteredList(status: string) {
    return _.filter(this.list, issue => issue.status === status)
  }

  redirectToIssue(item) {
    this.$router.push(`/issues/${item.id}`)
  }
}
</script>

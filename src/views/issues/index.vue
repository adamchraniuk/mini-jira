<template>
  <v-row v-if="!loading" justify="start" align="start" class="relative flex-column">
    <v-col md="4" sm="8">
      <autocomplete :list="allIssues" :label="'Find issue'" @redirect="redirectToIssue"> </autocomplete>
    </v-col>
    <v-col cols="12" sm="12" md="8">
      <v-list>
        <issues-list
          v-for="item of allIssues"
          :id="item.id"
          :key="item.id"
          :title="item.summary"
          :link="`issues/${item.id}`"
          :project-id="item.projectId"
          no-icon
        />
      </v-list>
    </v-col>
  </v-row>
  <v-row v-else justify="center" align="center">
    <loader />
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import Loader from '@/components/loader.vue'
import IssuesList from '@/components/issues-list.vue'
import Autocomplete from '@/components/autocomplete.vue'
import { Issue } from '@/types/issues/types'

const issues = namespace('issues')
@Component({
  components: {
    IssuesList,
    Loader,
    Autocomplete,
  },
})
export default class Issues extends Vue {
  @issues.Action('getIssuesList') getIssuesList: () => void
  @issues.Action('toggleLoading') toggleLoading: (boolean) => void
  @issues.Getter('allIssues') allIssues: Issue[]
  @issues.State('loading') loading: boolean

  created() {
    this.toggleLoading(true)
    this.getIssuesList()
  }

  redirectToIssue(item) {
    this.$router.push(`issues/${item.id}`)
  }
}
</script>

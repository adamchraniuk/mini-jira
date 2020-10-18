<template>
  <router-link :to="link" class="no_decoration">
    <v-list-item>
      <v-list-item-action
        v-if="status === 'IN PROGRESS' && noIcon"
        class="m-0 py-1"
        @click.prevent="$emit('changeStatus', { id, status: 'TODO', title })"
      >
        <v-icon color="primary">arrow_back</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          {{ id }}
          <span class="ml-6"> {{ title }}</span>
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn v-if="!unlink" class="mt-2" small fab color="warning" @click.prevent="deleteIssue">
          <v-icon>
            delete
          </v-icon>
        </v-btn>
        <v-btn v-else class="mt-2" small fab color="warning" @click.prevent="unlinkIssue">
          <v-icon>
            link_off
          </v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-action
        v-if="status !== 'DONE' && noIcon"
        class="px-3 m-0 py-1"
        @click.prevent="$emit('changeStatus', { id, status: status === 'TODO' ? 'IN PROGRESS' : 'DONE', title })"
      >
        <v-icon color="primary">arrow_forward</v-icon>
      </v-list-item-action>
    </v-list-item>
  </router-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const issues = namespace('issues')
@Component
export default class IssuesList extends Vue {
  @Prop({ required: true }) readonly title: string
  @Prop({ required: true }) readonly id: string
  @Prop({ required: true }) readonly projectId: string
  @Prop({ required: true }) readonly link: string
  @Prop({ required: false }) readonly status: string
  @Prop({ default: true, required: false }) readonly noIcon: boolean
  @Prop({ default: false, required: false }) readonly unlink: boolean
  @issues.Action('removeIssue') removeIssue
  @issues.Action('removeRelation') removeRelation
  @issues.Action('getProjectsIssues') getProjectsIssues

  deleteIssue() {
    const { projectId, id } = this
    this.removeIssue({
      projectId: projectId,
      body: { id },
    })
    this.getProjectsIssues(this.$route.params.projectId)
  }
  unlinkIssue() {
    this.removeRelation({
      issueId: this.$route.params.issueId,
      projectId: this.projectId,
      relatedIssueId: this.id,
    })
  }
}
</script>

<template>
  <div>
    <form @submit="submit" @keydown.enter="submit">
      <v-text-field v-model="summary" label="Summary" required></v-text-field>
      <v-text-field v-model="description" label="Description"></v-text-field>
      <p v-if="isEditMode && activeIssue.status === 'DONE'">
        Cannot edit issue when is done.
      </p>
      <div v-else>
        <v-btn class="mr-4" color="success" @click="submit">
          {{ isEditMode ? 'edit' : 'add' }}
        </v-btn>
        <v-btn color="warning" @click="clear">
          clear
        </v-btn>
      </div>
    </form>
    <p v-if="error" class="red--text mt-6">
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import * as api from '@/api'

const issues = namespace('issues')

@Component
export default class AddIssue extends Vue {
  @issues.Getter('activeIssue') activeIssue
  @issues.Action('getSingleIssue') getSingleIssue
  @issues.Action('updateIssue') updateIssue
  summary = ''
  description = ''
  id = ''
  error = null

  mounted() {
    if (this.isEditMode) {
      this.getSingleIssue(this.$route.params.issueId)
      this.summary = this.activeIssue.summary
      this.description = this.activeIssue.description
    }
  }
  get isEditMode() {
    return this.$route.path.includes('edit')
  }
  async submit() {
    if (this.isEditMode) {
      this.updateIssue({
        projectId: this.activeIssue.projectId,
        issueId: this.activeIssue.id,
        body: {
          ...this.activeIssue,
          summary: this.summary,
          description: this.description,
        },
      })
      await this.$router.push(`/issues/${this.activeIssue.id}`)
    } else {
      try {
        const results = await api.addNewIssue(this.$route.params.projectId, {
          summary: this.summary,
          description: this.description,
        })
        const id = results.data.id
        await this.$router.push(`/issues/${id}`)
      } catch (e) {
        this.error = e
      }
    }
  }

  clear() {
    this.summary = ''
    this.description = ''
  }
}
</script>

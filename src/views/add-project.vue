<template>
  <div>
    <form @submit="submit" @keydown.enter="submit">
      <v-text-field v-model="name" label="Name" required></v-text-field>
      <v-text-field v-model="description" label="Description"></v-text-field>
      <v-btn class="mr-4" color="success" @click="submit">
        {{ isEditMode ? 'edit' : 'add' }}
      </v-btn>
      <v-btn color="warning" @click="clear">
        clear
      </v-btn>
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

const projects = namespace('projects')

@Component
export default class AddProject extends Vue {
  @projects.Action('getProjectsList') getProjectsList
  @projects.Action('getProject') getProject
  @projects.Getter('activeProject') activeProject

  name = ''
  description = ''
  id = ''
  error = null

  async mounted() {
    if (this.isEditMode) {
      await this.getProject(this.$route.params.projectId)
      this.name = this.activeProject.name
      this.description = this.activeProject.description
    }
  }

  get isEditMode() {
    return this.$route.path.includes('edit')
  }

  async submit() {
    if (this.isEditMode) {
      try {
        await api.editProject({
          ...this.activeProject,
          name: this.name,
          description: this.description,
        })
        await this.getProjectsList()
        await this.$router.push(`/projects/${this.activeProject.id}`)
      } catch (e) {
        this.error = e
      }
    } else {
      try {
        const result = await api.addProject({
          name: this.name,
          description: this.description,
        })
        await this.getProjectsList()
        await this.$router.push(`/projects/${result.data.id}`)
      } catch (e) {
        this.error = e
      }
    }
  }

  clear() {
    this.name = ''
    this.description = ''
  }
}
</script>

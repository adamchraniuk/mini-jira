<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app clipped>
        <v-list>
          <router-link to="/projects" class="no_decoration">
            <v-list-item link>
              <v-list-item-action>
                <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Projects</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link to="/issues" class="no_decoration">
            <v-list-item link>
              <v-list-item-action>
                <v-icon>mdi-cog</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Issues</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app clipped-left class="relative">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>MiniJira</v-toolbar-title>
      </v-app-bar>

      <v-main>
        <v-container class="">
          <router-view />
        </v-container>
      </v-main>

      <v-footer app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Dashboard extends Vue {
  drawer: boolean = true

  created() {
    this.$vuetify.theme.dark = true
  }
}
</script>

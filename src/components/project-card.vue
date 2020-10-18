<template>
  <v-card>
    <v-card-title>
      <h3>{{ id }} - {{ title }}</h3>
    </v-card-title>
    <v-card-text>
      <p style="min-height: 22px">
        {{ description }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success" class="mt-2 mr-auto" fab dark @click.stop="$emit('onEdit', id)">
        <v-icon>
          edit
        </v-icon>
      </v-btn>
      <v-btn color="warning" class="mt-2 ml-auto" fab dark @click.stop="$emit('onRemove', id)">
        <v-icon>
          delete
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class ProjectCard extends Vue {
  @Prop({ default: false, required: true }) readonly title: string
  @Prop({ default: false, required: true }) readonly id: string
  @Prop({ default: false, required: true }) readonly description: string
}
</script>

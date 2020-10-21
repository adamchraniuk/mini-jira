<template>
  <div class="d-flex">
    <v-select
      v-model="sortBy.element"
      class="w-50"
      label="Sort by"
      :items="elements"
      @change="$emit('onSort', sortBy)"
    ></v-select>
    <v-select
      v-model="sortBy.direction"
      class="w-50 ml-6"
      label="Sort by"
      :items="directions"
      @change="$emit('onSort', sortBy)"
    ></v-select>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { SortBy } from '@/types/issues/types'

@Component
export default class SortByComponent extends Vue {
  @Prop() readonly sortBy: SortBy
  directions: string[] = ['asc', 'desc']
  elements: string[] = ['modified_at', 'created_at']
  mounted() {
    this.$emit('onSort', this.sortBy)
  }
}
</script>

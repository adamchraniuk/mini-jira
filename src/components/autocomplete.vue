<template>
  <v-autocomplete
    v-model="item"
    :items="list"
    dense
    dark
    :label="label"
    :filter="customFilter"
    @change="$emit('onChange', item)"
  >
    <template v-slot:selection="{ item }">{{ item.id }} - {{ item.summary ? item.summary : item.name }}</template>
    <template v-slot:item="{ item }">{{ item.id }} - {{ item.summary ? item.summary : item.name }}</template>
  </v-autocomplete>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Issue } from '@/types/issues/types'
import { Project } from '@/types/projects/types'

interface Item {
  name?: string
  summary?: string
  id: string
}

@Component
export default class Autocomplete extends Vue {
  @Prop({ required: false, default: 'Label' }) readonly label: string
  @Prop({ required: true }) readonly list: Issue[] | Project[]

  item: Item = null

  customFilter(item: Item, queryText: string) {
    const textOne = item.name ? item.name.toLowerCase() : item.summary.toLowerCase()
    const textTwo = item.id.toLowerCase()
    const searchText = queryText.toLowerCase()
    return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
  }
}
</script>

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

@Component
export default class Autocomplete extends Vue {
  @Prop({ required: false, default: 'Label' }) readonly label: string
  @Prop({ required: true }) readonly list: []
  item = null
  customFilter(item, queryText) {
    const textOne = item.name ? item.name.toLowerCase() : item.summary.toLowerCase()
    const textTwo = item.id.toLowerCase()
    const searchText = queryText.toLowerCase()
    return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
  }
}
</script>

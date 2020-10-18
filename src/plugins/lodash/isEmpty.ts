import Vue from 'vue'
import _ from 'lodash'

const LodashIsEmptyPlugin = function(Vue) {
  Vue.mixin({
    methods: {
      isEmpty(array) {
        return _.isEmpty(array)
      },
    },
  })
}

Vue.use(LodashIsEmptyPlugin)

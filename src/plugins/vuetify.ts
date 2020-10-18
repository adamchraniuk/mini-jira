import Vuetify from 'vuetify'
import Vue from 'vue'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  icons: { iconfont: 'md' },
  theme: {
    themes: {
      light: {
        primary: '#001531',
        secondary: '#5d5d5d',
        tertiary: '#c9c9c9',
        quaternary: '#4058a7',
        quinary: '#e5e5e5',
        accent: '#243dae',
        error: '#e85f54',
        warning: '#ffa014',
        success: '#2bc685',
        background: '#ffffff',
        color: '#161616',
        anchor: '#243dae',
      },
      dark: {},
    },
  },
})

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueChart from '@seregpie/vue-chart'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import '@/assets/scss/app.scss'

import plugins from './plugins'

import moment from 'moment'
moment.locale('ru')

Vue.use(Buefy)
Vue.component(VueChart.name, VueChart)
Vue.config.productionTip = false

const app = {
  router,
  store,
  render: h => h(App)
}

plugins(app)
new Vue(app).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'
import Summary from '@/views/Summary.vue'
// import Country from '@/views/Country.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Summary',
    component: Summary,
    props: {
      code: 'ru'
    }
  },
  {
    path: '/:code',
    props: true,
    component: Summary
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

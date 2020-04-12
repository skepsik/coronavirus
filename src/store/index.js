import Vue from 'vue'
import Vuex from 'vuex'
import models from '@/models'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'

VuexORM.use(VuexORMAxios)
const database = new VuexORM.Database()

for (const entity in models) {
  database.register(models[entity])
}

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [VuexORM.install(database)],
  state: {
    countries: {}
  },
  mutations: {

  },
  actions: {

  },
  getters: {

  },
  modules: {
  }
})

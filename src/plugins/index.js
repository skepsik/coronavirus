import Vue from 'vue'

import axios from './axios'
import vuexORMAxios from './vuex-orm-axios'

export default app => {
  const inject = (name, plugin) => {
    const key = `$${name}`
    app[key] = plugin
    app.store[key] = plugin

    Vue.use(() => {
      if (Object.prototype.hasOwnProperty.call(Vue, key)) {
        return
      }
      Object.defineProperty(Vue.prototype, key, {
        get () {
          return plugin
        }
      })
    })
  }
  axios(app, inject)
  vuexORMAxios(app, inject)
}

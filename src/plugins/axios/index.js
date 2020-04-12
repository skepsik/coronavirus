import axios from './axios'

export default (app, inject) => {
  inject('axios', axios)
}

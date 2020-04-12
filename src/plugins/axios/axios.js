import { camelizeObject } from '@/utils'

import axios from 'axios'

import requestInterceptors from './requestInterceptors'
import responseInterceptors from './responseInterceptors'

const instance = axios.create({
  baseURL: 'https://coronavirus-monitor.info/ajax/get_stats.php',
  transformResponse: [
    data => camelizeObject(JSON.parse(data))
  ]
})

for (const request of requestInterceptors) {
  instance.interceptors.request.use(request)
}

for (const { success, error } of responseInterceptors) {
  instance.interceptors.response.use(success, error)
}

export default instance

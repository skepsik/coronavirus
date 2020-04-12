import { camelCase } from 'lodash-es'

const camelize = (str) => str.indexOf('/') > -1 ? str : camelCase(str)

export default function camelizeObject (object) {
  if (Array.isArray(object)) {
    const newObject = []
    for (const k in object) {
      if (Object.prototype.hasOwnProperty.call(object, k)) {
        if (typeof object[k] === 'object' && object[k]) {
          newObject.push(camelizeObject(object[k]))
        } else {
          newObject.push(object[k])
        }
      }
    }
    return newObject
  } else {
    const newObject = {}
    for (const k in object) {
      if (Object.prototype.hasOwnProperty.call(object, k)) {
        const newK = camelize(k)
        newObject[newK] = object[k]
        if (typeof newObject[newK] === 'object' && newObject[newK]) {
          newObject[newK] = camelizeObject(newObject[newK])
        }
      }
    }
    return newObject
  }
}

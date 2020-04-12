import { Model } from '@vuex-orm/core'
import Days from './Days'

function historyTransform (data, region) {
  return data.map((day) => {
    return {
      ...day,
      region
    }
  })
}

class Regions extends Model {
  static entity = 'regions'
  static primaryKey = 'code'
  static fields () {
    return {
      code: this.string(),
      title: this.string(),
      rid: this.number(),
      cid: this.number(),
      history: this.hasMany(Days, 'region'),
      order: this.number(100)
    }
  }

  $fetchHistory () {
    const { cid, rid, code } = this
    return this.$self().api().get('', {
      params: { cid, rid },
      dataTransformer: ({ data }) => {
        const { regionHistory, history } = data
        if (rid === 0) {
          const parent = this.$query().where(region => region.cid === cid && region.rid === 0).first()
          return { code: parent.code, history: historyTransform(history, parent.code) }
        } else {
          return { code, history: historyTransform(regionHistory, code) }
        }
      }
    })
  }
}

export default Regions

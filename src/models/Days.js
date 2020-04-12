import { Model } from '@vuex-orm/core'
import moment from 'moment'

class Days extends Model {
  static entity = 'days'
  static primaryKey = ['region', 'date']
  static fields () {
    return {
      region: this.string(),
      date: this.string(),
      confirmed: this.number(),
      deaths: this.number(),
      deathsChange: this.number(),
      confirmedChange: this.number(),
      cured: this.number(),
      critical: this.number()
    }
  }

  get activeCases () {
    return this.confirmed - this.cured - this.deaths
  }

  get timestamp () {
    const [day, month] = this.date.split('.')
    return new Date(2020, month - 1, day).getTime()
  }

  get dateFormatted () {
    return moment(this.timestamp).format('DD MMMM')
  }

  get curedChange () {
    const prevDay = this.$prevDay()
    return prevDay ? this.cured - prevDay.cured : 0
  }

  $prevDay () {
    const date = moment(this.timestamp - 24 * 60 * 60 * 1000).format('DD.MM')
    const { region } = this
    return this.$find([region, date])
  }
}

export default Days

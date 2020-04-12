<template lang="pug">
  .country
    h1 {{ info.title }}
    .country__source
      a( :href="info.source" target="blank" ) {{ info.source }}
    .row.mt-4
      .col-3
        ul.list
          li.list-item
            .row
              .col-6 Всего
              .col-6
                strong {{ data.totalCases }}
          li.list-item
            .row
              .col-6 Активных кейсов
              .col-6
                strong {{ data.totalActiveCases }}
          li.list-item
            .row
              .col-6 totalDangerRank
              .col-6
                strong {{ data.totalDangerRank }}
          li.list-item
            .row
              .col-6 Смертей
              .col-6
                strong {{ data.totalDeaths }}
          li.list-item
            .row
              .col-6 Заражено сегодня
              .col-6
                strong {{ data.totalNewCasesToday }}
          li.list-item
            .row
              .col-6 Смертей сегодня
              .col-6
                strong {{ data.totalNewDeathsToday }}
          li.list-item
            .row
              .col-6 Выздоровлений
              .col-6
                strong {{ data.totalRecovered }}
          li.list-item
            .row
              .col-6 totalSeriousCases
              .col-6
                strong {{ data.totalSeriousCases }}
          li.list-item
            .row
              .col-6 totalUnresolved
              .col-6
                strong {{ data.totalUnresolved }}
      .col-9
        TableTimeline( :code="code" )

</template>

<script>
import TableTimeline from '@/components/TableTimeline'
export default {
  name: 'ViewCountry',
  components: {
    TableTimeline
  },
  props: {
    code: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      data: {},
      info: {},
      timeline: {}
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      async handler () {
        const { data } = await this.$axios.get('/', {
          params: {
            countryTotal: this.code
          }
        })
        this.info = data.countrydata[0].info
        delete data.countrydata[0].info
        this.data = data.countrydata[0]
      }
    }
  }
}
</script>

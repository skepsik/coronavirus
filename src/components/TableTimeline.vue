<template lang="pug">
  b-table(
    :data="list"
    default-sort="date"
    default-sort-direction="desc"
  )
    template( v-slot="props" )
      b-table-column( field="date" label="Дата"  sortable )
        span.tag.is-success {{ moment(props.row.date) }}
      b-table-column( field="totalCases" label="Всего" sortable ) {{ props.row.totalCases }}
      b-table-column( field="newDailyCases" label="Новые сегодня" sortable ) {{ props.row.newDailyCases }}
      b-table-column( field="totalRecoveries" label="Всего выздоровлений" sortable ) {{ props.row.totalRecoveries }}
      b-table-column( field="newDailyDeaths" label="Смерти сегодня" sortable ) {{ props.row.newDailyDeaths }}

</template>

<script>
import moment from 'moment'

export default {
  name: 'TableTimeline',
  props: {
    code: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      data: []
    }
  },
  computed: {
    list: ({ data }) => Object.entries(data).map(([date, info]) => ({ date: new Date(date).getTime(), ...info }))
  },
  methods: {
    moment (str) {
      const date = new Date(str)
      return moment(date).format('DD MMMM')
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      async handler () {
        const timeline = await this.$axios('/', {
          params: {
            countryTimeline: this.code
          }
        })
        this.data = timeline.data.timelineitems[0]
        delete this.data.stat
      }
    }
  }
}
</script>

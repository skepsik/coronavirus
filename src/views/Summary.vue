<template lang="pug">
  .page
    h1.title {{ title }}
    .row( v-if="lastDay" )
      .col-3
        .notification.c-red
          .subtitle Заражено
          .title {{ lastDay.confirmed }}
      .col-3
        .notification.c-green
          .subtitle Выздоровело
          .title {{ lastDay.cured }}
      .col-3
        .notification
          .subtitle Погибло
          .title {{ lastDay.deaths }}
      .col-3
        .notification
          .subtitle Летальность
          .title {{ deathsRelative }}
    TableTotal( :data="data" )
    .row.mb-4
      .col-6
        vue-chart(
          style="width: 100%; height: 385px;"
          :data="chartDinamic"
          :options="{scales: {yAxes: [{ticks: {beginAtZero: true}}]}}"
          :update-config="{duration: 1000, easing: 'easeOutBounce'}"
          type="line"
        )
      .col-6
        vue-chart(
          style="width: 100%; height: 385px;"
          :data="chartActive"
          :options="{scales: {yAxes: [{ticks: {beginAtZero: true}}]}}"
          :update-config="{duration: 1000, easing: 'easeOutBounce'}"
          type="line"
        )
    .row.mb-4
      .col-6
        vue-chart(
          style="width: 100%; height: 385px;"
          :data="chartDelta"
          :update-config="{duration: 1000, easing: 'easeOutBounce'}"
          type="bar"
        )
      .col-6
        vue-chart(
          style="width: 100%; height: 385px;"
          :data="chartDeaths"
          :update-config="{duration: 1000, easing: 'easeOutBounce'}"
          type="bar"
        )
</template>

<script>
import TableTotal from '@/components/TableTotal'
import ChartTimeline from '@/components/ChartTimeline'

export default {
  name: 'Summary',
  components: {
    TableTotal,
    ChartTimeline
  },
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  computed: {
    region: ({ $store, code }) => $store.getters['entities/regions/query']().where('code', code).withAll().first(),
    lastDay: ({ data }) => data[data.length - 1],
    title: ({ region }) => region ? region.title : 'Вся страна',
    dates: ({ data }) => data.map(({ dateFormatted }) => dateFormatted),
    data: ({ region }) => region.history,
    deathsRelative: ({ lastDay }) => (lastDay.deaths / lastDay.confirmed * 100).toFixed(2) + '%',
    chartDinamic: ({ data, dates }) => ({
      labels: dates,
      datasets: [
        {
          label: 'Заражения',
          borderColor: '#b77fbd',
          backgroundColor: 'transparent',
          data: data.map(({ confirmed }) => confirmed)
        }, {
          label: 'Выздоровления',
          borderColor: '#0dc10b',
          backgroundColor: 'transparent',
          data: data.map(({ cured }) => cured)
        }, {
          label: 'Смерти',
          borderColor: '#5f5b5b',
          backgroundColor: 'transparent',
          data: data.map(({ deaths }) => deaths)
        }
      ]
    }),
    chartActive: ({ data, dates }) => ({
      labels: dates,
      datasets: [
        {
          label: 'Количество зараженных на данный момент времени',
          borderColor: 'orange',
          backgroundColor: 'transparent',
          data: data.map(({ activeCases }) => activeCases)
        }
      ]
    }),
    chartDelta: ({ data, dates }) => ({
      labels: dates,
      datasets: [
        {
          label: 'Количество подтвержденных заражений за сутки',
          backgroundColor: '#e80001',
          data: data.map(({ confirmedChange }) => confirmedChange)
        }
      ]
    }),
    chartDeaths: ({ data, dates }) => ({
      labels: dates,
      datasets: [
        {
          label: 'Количество погибших за сутки',
          backgroundColor: '#6f0000',
          data: data.map(({ deathsChange }) => deathsChange)
        }
      ]
    })
  },
  watch: {
    code: {
      immediate: true,
      handler () {
        !this.data.length && this.region.$fetchHistory()
      }
    }
  }
}
</script>
